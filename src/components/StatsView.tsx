import React from "react";
import { Team, Match } from "../types";
import { Search, Hash, Star, Goal, Flame, Trophy } from "lucide-react";
import CountryFlag from "./CountryFlag";

interface StatsViewProps {
  teams: Record<string, Team>;
  matches: Match[];
}

export default function StatsView({ teams, matches }: StatsViewProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Calculate General Metrics
  let totalMatchesPlayed = 0;
  let totalGoalsScored = 0;

  matches.forEach(m => {
    if (m.homeScore !== null && m.awayScore !== null) {
      totalMatchesPlayed += 1;
      totalGoalsScored += (m.homeScore + m.awayScore);
    }
  });

  const averageGoals = totalMatchesPlayed > 0 
    ? (totalGoalsScored / totalMatchesPlayed).toFixed(2)
    : "0.00";

  // Calculate stats for EVERY team by scanning matches
  const teamRecords: Record<string, {
    won: number, drawn: number, lost: number, gf: number, gc: number, pts: number, played: number
  }> = {};

  Object.keys(teams).forEach(id => {
    teamRecords[id] = { won: 0, drawn: 0, lost: 0, gf: 0, gc: 0, pts: 0, played: 0 };
  });

  matches.forEach(m => {
    // Only compile stats if a score is entered
    if (m.homeScore !== null && m.awayScore !== null && m.homeTeamId && m.awayTeamId) {
      const hRec = teamRecords[m.homeTeamId];
      const aRec = teamRecords[m.awayTeamId];

      if (hRec && aRec) {
        hRec.played += 1;
        aRec.played += 1;

        hRec.gf += m.homeScore;
        hRec.gc += m.awayScore;
        aRec.gf += m.awayScore;
        aRec.gc += m.homeScore;

        if (m.homeScore > m.awayScore) {
          hRec.won += 1;
          hRec.pts += 3;
          aRec.lost += 1;
        } else if (m.awayScore > m.homeScore) {
          aRec.won += 1;
          aRec.pts += 3;
          hRec.lost += 1;
        } else {
          hRec.drawn += 1;
          hRec.pts += 1;
          aRec.drawn += 1;
          aRec.pts += 1;
        }
      }
    }
  });

  // Convert to array and merge team details
  const teamLeaderboard = Object.entries(teamRecords).map(([id, rec]) => {
    const team = teams[id];
    const gd = rec.gf - rec.gc;
    return {
      id,
      team,
      ...rec,
      gd
    };
  });

  // Sort primarily by total points, then GD, then GF
  teamLeaderboard.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.team.name.localeCompare(b.team.name);
  });

  // Filter based on search query
  const filteredLeaderboard = teamLeaderboard.filter(row => 
    row.team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-28 h-28 bg-amber-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="bg-amber-400/10 p-3.5 rounded-xl border border-amber-400/20 text-amber-400">
            <Flame className="w-6 h-6 fill-amber-400/5" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
              Partidos Simulados
            </p>
            <p className="text-3xl font-extrabold text-slate-100 font-mono mt-1">
              {totalMatchesPlayed} <span className="text-slate-600 text-lg">/ 104</span>
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-28 h-28 bg-emerald-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="bg-emerald-400/10 p-3.5 rounded-xl border border-emerald-400/20 text-emerald-400">
            <Goal className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
              Goles Marcados
            </p>
            <p className="text-3xl font-extrabold text-slate-100 font-mono mt-1">
              {totalGoalsScored}
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-28 h-28 bg-sky-500/5 rounded-full group-hover:scale-125 transition-transform" />
          <div className="bg-sky-400/10 p-3.5 rounded-xl border border-sky-400/20 text-sky-400">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
              Promedio de Goles
            </p>
            <p className="text-3xl font-extrabold text-slate-100 font-mono mt-1">
              {averageGoals} <span className="text-slate-600 text-xs">por partido</span>
            </p>
          </div>
        </div>

      </div>

      {/* Main Comparative Leaderboard */}
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/85 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500/5" />
            <span>Rendimiento y Clasificación General de Países</span>
          </h3>

          {/* Search box */}
          <div className="relative w-full sm:w-[280px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-955 text-sm text-slate-200 placeholder-slate-500 border border-slate-800 hover:border-slate-700 focus:border-amber-400/50 rounded-xl focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 text-slate-400 font-mono text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-4 font-semibold text-center w-16">Pos</th>
                <th className="py-4 px-4 font-semibold">País</th>
                <th className="py-4 px-3 font-semibold text-center">PJ</th>
                <th className="py-4 px-3 font-semibold text-center">PG</th>
                <th className="py-4 px-3 font-semibold text-center">PE</th>
                <th className="py-4 px-3 font-semibold text-center">PP</th>
                <th className="py-4 px-3 font-semibold text-center">GF</th>
                <th className="py-4 px-3 font-semibold text-center">GC</th>
                <th className="py-4 px-3 font-semibold text-center">DG</th>
                <th className="py-4 px-5 font-semibold text-center text-amber-400">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard.map((row, index) => {
                  const hasRecord = row.played > 0;
                  return (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-slate-800/40 transition-colors ${
                        hasRecord ? "bg-slate-905/10" : "bg-slate-950/10 text-slate-500"
                      }`}
                    >
                      {/* Rank Position */}
                      <td className="py-3 px-4 text-center font-mono font-semibold text-slate-400">
                        {index + 1}
                      </td>

                      {/* Team flag and name */}
                      <td className="py-3 px-4 font-medium text-slate-200 font-sans">
                        <CountryFlag 
                          teamId={row.id} 
                          fallbackFlag={row.team.flag} 
                          className="w-6.5 h-4.5 rounded-sm shadow-sm mr-2.5 inline-block align-middle transform hover:scale-125 transition-transform" 
                          title={row.team.name}
                        />
                        <span className="align-middle text-sm sm:text-base">{row.team.name}</span>
                        <span className="ml-1.5 text-xs text-slate-500 font-mono">({row.id})</span>
                      </td>

                      {/* PJ PG PE PP */}
                      <td className="py-3 px-3 text-center font-mono text-slate-300">
                        {row.played}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {row.won}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {row.drawn}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {row.lost}
                      </td>

                      {/* GF GC DG */}
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {row.gf}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {row.gc}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {hasRecord ? (
                          <span className={`px-1.5 py-0.5 rounded font-bold text-xs ${
                            row.gd > 0 
                              ? "bg-emerald-500/10 text-emerald-400" 
                              : row.gd < 0 
                              ? "bg-rose-500/10 text-rose-450" 
                              : "bg-slate-800 text-slate-450"
                          }`}>
                            {row.gd > 0 ? `+${row.gd}` : row.gd}
                          </span>
                        ) : (
                          <span className="text-slate-605">-</span>
                        )}
                      </td>

                      {/* Total accumulated points */}
                      <td className="py-3 px-5 text-center font-mono font-black text-amber-400 text-base">
                        {row.pts}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-500 font-mono">
                    Ningún país coincide con tu búsqueda...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
