import { Team, Match, Standing, ThirdPlaceStanding } from "../types";

/**
 * Computes group standings based on the matches played.
 */
export function calculateGroupStandings(group: string, groupTeams: Team[], groupMatches: Match[]): Standing[] {
  // Initialize standings for all teams in the group
  const standingsMap: Record<string, Standing> = {};
  groupTeams.forEach(team => {
    standingsMap[team.id] = {
      teamId: team.id,
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      gc: 0,
      gd: 0,
      pts: 0
    };
  });

  // Calculate stats from games
  groupMatches.forEach(match => {
    if (match.homeScore !== null && match.awayScore !== null) {
      const hStanding = standingsMap[match.homeTeamId || ""];
      const aStanding = standingsMap[match.awayTeamId || ""];

      if (hStanding && aStanding) {
        hStanding.played += 1;
        aStanding.played += 1;

        hStanding.gf += match.homeScore;
        hStanding.gc += match.awayScore;
        aStanding.gf += match.awayScore;
        aStanding.gc += match.homeScore;

        if (match.homeScore > match.awayScore) {
          hStanding.won += 1;
          hStanding.pts += 3;
          aStanding.lost += 1;
        } else if (match.awayScore > match.homeScore) {
          aStanding.won += 1;
          aStanding.pts += 3;
          hStanding.lost += 1;
        } else {
          hStanding.drawn += 1;
          hStanding.pts += 1;
          aStanding.drawn += 1;
          aStanding.pts += 1;
        }
      }
    }
  });

  // Convert to array and sort according to FIFA World Cup criteria:
  // 1. Points
  // 2. Goal Difference (GD)
  // 3. Goals For (GF)
  // 4. Stable sort by team name if still tied
  return Object.values(standingsMap).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    
    const aGD = a.gf - a.gc;
    const bGD = b.gf - b.gc;
    if (bGD !== aGD) return bGD - aGD;
    
    if (b.gf !== a.gf) return b.gf - a.gf;
    
    return a.team.name.localeCompare(b.team.name);
  });
}

/**
 * Calculates standings for all groups and returns them in a map.
 */
export function calculateAllGroupStandings(groups: string[], teams: Record<string, Team>, matches: Match[]): Record<string, Standing[]> {
  const standings: Record<string, Standing[]> = {};
  
  groups.forEach(groupChar => {
    const groupTeams = Object.values(teams).filter(t => t.group === groupChar);
    const groupMatches = matches.filter(m => m.stage === "group" && m.group === groupChar);
    standings[groupChar] = calculateGroupStandings(groupChar, groupTeams, groupMatches);
  });
  
  return standings;
}

/**
 * Computes the unranked and ranked third-place teams across all groups.
 */
export function calculateThirdPlaceStandings(
  groups: string[],
  allStandings: Record<string, Standing[]>
): ThirdPlaceStanding[] {
  const thirds: ThirdPlaceStanding[] = [];

  groups.forEach(groupChar => {
    const standings = allStandings[groupChar];
    const isFinished = standings && standings.length > 0 && standings.every(s => s.played === 3);

    if (isFinished && standings.length >= 3) {
      const thirdPlaceStanding = standings[2]; // Index 2 is third place
      thirds.push({
        group: groupChar,
        teamId: thirdPlaceStanding.teamId,
        team: thirdPlaceStanding.team,
        pts: thirdPlaceStanding.pts,
        gd: thirdPlaceStanding.gf - thirdPlaceStanding.gc,
        gf: thirdPlaceStanding.gf,
        passed: false
      });
    } else {
      thirds.push({
        group: groupChar,
        teamId: null,
        team: null,
        pts: 0,
        gd: 0,
        gf: 0,
        passed: false
      });
    }
  });

  // Sort them:
  // 1. Points
  // 2. Goal Difference
  // 3. Goals For
  // 4. Alphabetical by name
  thirds.sort((a, b) => {
    const aValid = a.teamId !== null;
    const bValid = b.teamId !== null;
    if (aValid !== bValid) {
      return aValid ? -1 : 1;
    }
    if (!aValid && !bValid) {
      return 0;
    }

    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return (a.team?.name || "").localeCompare(b.team?.name || "");
  });

  // Mark top 8 as passed (only if they are actually finished group thirds)
  thirds.forEach((third, idx) => {
    third.passed = idx < 8 && third.teamId !== null;
  });

  return thirds;
}

/**
 * Determines the winner of a knockout match.
 * If scores are unequal, the higher score wins.
 * If scores are equal, penalties decide.
 */
export function getKnockoutWinnerId(match: Match): string | null {
  if (match.homeScore === null || match.awayScore === null) return null;
  if (match.homeScore > match.awayScore) return match.homeTeamId;
  if (match.awayScore > match.homeScore) return match.awayTeamId;
  
  // Tie-breaker by penalties
  if (match.homePenalties !== null && match.awayPenalties !== null) {
    if (match.homePenalties > match.awayPenalties) return match.homeTeamId;
    if (match.awayPenalties > match.homePenalties) return match.awayTeamId;
  }
  
  // No winner decided yet on penalties
  return null;
}

/**
 * Propagates scores and team placements through the entire Knockout stage cascade.
 * This runs after group standings other calculations are updated.
 */
export function propagateKnockoutMatches(
  allMatches: Match[],
  groupStandings: Record<string, Standing[]>,
  thirdPlaceStandings: ThirdPlaceStanding[]
): Match[] {
  // 1. Create a copy of the matches array to avoid mutation
  const updatedMatches = allMatches.map(m => ({ ...m }));
  
  // 2. Build mapping for Group Winners and Runners-up
  const mapping: Record<string, string | null> = {};
  
  Object.keys(groupStandings).forEach(groupChar => {
    const standings = groupStandings[groupChar];
    const isFinished = standings && standings.length > 0 && standings.every(s => s.played === 3);
    if (isFinished && standings.length >= 2) {
      mapping[`1${groupChar}`] = standings[0].teamId;
      mapping[`2${groupChar}`] = standings[1].teamId;
    } else {
      mapping[`1${groupChar}`] = null;
      mapping[`2${groupChar}`] = null;
    }
  });

  // 3. Build mapping for Best Third Places (only top 8)
  const activeThirds = thirdPlaceStandings.filter(t => t.passed);
  for (let i = 0; i < 8; i++) {
    if (activeThirds[i]) {
      mapping[`Mejor 3° #${i + 1}`] = activeThirds[i].teamId;
    } else {
      mapping[`Mejor 3° #${i + 1}`] = null;
    }
  }

  // Helper dictionary to easily fetch matches in the loop by ID
  const findMatch = (id: number) => updatedMatches.find(m => m.id === id);

  // 4. Populate each knockout match in sequence by ID (73 to 104)
  for (let id = 73; id <= 104; id++) {
    const m = findMatch(id);
    if (!m) continue;

    // A. Assign teams for Round of 32 (P73 to P88)
    if (m.stage === "r32") {
      if (m.homePlaceholder && m.homePlaceholder in mapping) {
        m.homeTeamId = mapping[m.homePlaceholder];
      }
      if (m.awayPlaceholder && m.awayPlaceholder in mapping) {
        m.awayTeamId = mapping[m.awayPlaceholder];
      }
    }

    // B. Recompute the winner of this match based on scores
    m.winnerId = getKnockoutWinnerId(m);

    // C. Propagate this winner to succeeding rounds
    // Let's model where the winner of match ID goes:
    const propagateToNext = (winnerTeamId: string | null, targetMatchId: number, isHomeSlot: boolean) => {
      const targetMatch = findMatch(targetMatchId);
      if (targetMatch) {
        if (isHomeSlot) {
          targetMatch.homeTeamId = winnerTeamId;
        } else {
          targetMatch.awayTeamId = winnerTeamId;
        }
      }
    };

    // Propagate loser (only used for third-place match)
    const propagateLoserToNext = (loserTeamId: string | null, targetMatchId: number, isHomeSlot: boolean) => {
      const targetMatch = findMatch(targetMatchId);
      if (targetMatch) {
        if (isHomeSlot) {
          targetMatch.homeTeamId = loserTeamId;
        } else {
          targetMatch.awayTeamId = loserTeamId;
        }
      }
    };

    const wId = m.winnerId;

    // Map out propagation routes:
    // P89 through P96 (Round of 16)
    if (id === 74) propagateToNext(wId, 89, true);   // P89 Home (Ganador P74)
    if (id === 77) propagateToNext(wId, 89, false);  // P89 Away (Ganador P77)
    if (id === 73) propagateToNext(wId, 90, true);   // P90 Home (Ganador P73)
    if (id === 75) propagateToNext(wId, 90, false);  // P90 Away (Ganador P75)
    if (id === 76) propagateToNext(wId, 91, true);   // P91 Home (Ganador P76)
    if (id === 78) propagateToNext(wId, 91, false);  // P91 Away (Ganador P78)
    if (id === 79) propagateToNext(wId, 92, true);   // P92 Home (Ganador P79)
    if (id === 80) propagateToNext(wId, 92, false);  // P92 Away (Ganador P80)
    if (id === 81) propagateToNext(wId, 93, true);   // P93 Home (Ganador P81)
    if (id === 82) propagateToNext(wId, 93, false);  // P93 Away (Ganador P82)
    if (id === 83) propagateToNext(wId, 94, true);   // P94 Home (Ganador P83)
    if (id === 84) propagateToNext(wId, 94, false);  // P94 Away (Ganador P84)
    if (id === 85) propagateToNext(wId, 95, true);   // P95 Home (Ganador P85)
    if (id === 86) propagateToNext(wId, 95, false);  // P95 Away (Ganador P86)
    if (id === 87) propagateToNext(wId, 96, true);   // P96 Home (Ganador P87)
    if (id === 88) propagateToNext(wId, 96, false);  // P96 Away (Ganador P88)

    // P97 through P100 (Quarter-finals)
    if (id === 89) propagateToNext(wId, 97, true);   // P97 Home
    if (id === 90) propagateToNext(wId, 97, false);  // P97 Away
    if (id === 91) propagateToNext(wId, 98, true);   // P98 Home
    if (id === 92) propagateToNext(wId, 98, false);  // P98 Away
    if (id === 93) propagateToNext(wId, 99, true);   // P99 Home
    if (id === 94) propagateToNext(wId, 99, false);  // P99 Away
    if (id === 95) propagateToNext(wId, 100, true);  // P100 Home
    if (id === 96) propagateToNext(wId, 100, false); // P100 Away

    // P101 and P102 (Semi-finals)
    if (id === 97) propagateToNext(wId, 101, true);  // P101 Home
    if (id === 98) propagateToNext(wId, 101, false); // P101 Away
    if (id === 99) propagateToNext(wId, 102, true);  // P102 Home
    if (id === 100) propagateToNext(wId, 102, false); // P102 Away

    // P103 (Third Place Play-off) and P104 (Gran Final)
    if (id === 101) {
      propagateToNext(wId, 104, true);  // Winner to Final Home
      
      // Calculate loser of P101 for Third Place match
      let loserId: string | null = null;
      if (m.homeTeamId !== null && m.awayTeamId !== null && m.homeScore !== null && m.awayScore !== null) {
        loserId = wId === m.homeTeamId ? m.awayTeamId : m.homeTeamId;
      }
      propagateLoserToNext(loserId, 103, true); // Loser to 3rd Place Home
    }
    
    if (id === 102) {
      propagateToNext(wId, 104, false); // Winner to Final Away
      
      // Calculate loser of P102 for Third Place match
      let loserId: string | null = null;
      if (m.homeTeamId !== null && m.awayTeamId !== null && m.homeScore !== null && m.awayScore !== null) {
        loserId = wId === m.homeTeamId ? m.awayTeamId : m.homeTeamId;
      }
      propagateLoserToNext(loserId, 103, false); // Loser to 3rd Place Away
    }
  }

  return updatedMatches;
}

