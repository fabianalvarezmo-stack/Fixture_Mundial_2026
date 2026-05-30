/**
 * Types for the FIFA World Cup 2026 Simulator and Interactive Bracket
 * @license Apache-2.0
 */

export interface Team {
  id: string;      // FIFA 3-letter code e.g. "MEX"
  name: string;    // Human readable Spanish name
  flag: string;    // Emoji flag e.g. "🇲🇽"
  group: string;   // "A" through "L"
}

export type MatchStage = 
  | "group" 
  | "r32"      // Round of 32 (Dieciseisavos)
  | "r16"      // Round of 16 (Octavos)
  | "qf"       // Quarter-finals
  | "sf"       // Semi-finals
  | "third"    // Third place
  | "final";   // Grand Final

export interface Match {
  id: number;           // 1 to 104
  stage: MatchStage;
  group?: string;       // "A" through "L", only if stage is "group"
  homeTeamId: string | null;  // null if not decided yet in knockout, or contains a placeholder representation like "1A", "2C", "Best3rd_1"
  awayTeamId: string | null;  // null if not decided yet
  
  // Scoring
  homeScore: number | null; 
  awayScore: number | null;
  
  // Penalties (for knockout matches when scores are level)
  homePenalties: number | null;
  awayPenalties: number | null;
  winnerId: string | null;   // ID of winning team, computed or user-selected via tie-breaker
  
  // Metadata
  stadium: string;
  city: string;
  date: string;
  time: string;
  
  // Placeholders for knockout stages e.g. "1A", "2C", "Gandor P73", "Perdedor P101"
  homePlaceholder?: string;
  awayPlaceholder?: string;
}

export interface Standing {
  teamId: string;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;       // Goals for (goles a favor)
  gc: number;       // Goals against (goles en contra)
  gd: number;       // Goal difference (diferencia de goles)
  pts: number;      // Points (puntos)
}

export interface GroupStandingTable {
  group: string;
  standings: Standing[];
}

export interface ThirdPlaceStanding {
  group: string;
  teamId: string | null;
  team: Team | null;
  pts: number;
  gd: number;
  gf: number;
  passed: boolean; // true if in top 8
}
