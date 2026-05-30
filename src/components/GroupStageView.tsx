import React from "react";
import { Team, Match, Standing } from "../types";
import { ListCollapse, MapPin, Calendar, HelpCircle } from "lucide-react";
import CountryFlag from "./CountryFlag";

interface GroupStageViewProps {
  groups: string[];
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
  matches: Match[];
  onScoreChange: (matchId: number, isHome: boolean, score: string) => void;
  groupStandings: Record<string, Standing[]>;
  teams: Record<string, Team>;
}

export default function GroupStageView({
  groups,
  selectedGroup,
  onSelectGroup,
  matches,
  onScoreChange,
  groupStandings,
  teams
}: GroupStageViewProps) {
  // Filter matches of selected group
  const currentGroupMatches = matches.filter(
    m => m.stage === "group" && m.group === selectedGroup
  );

  const standings = groupStandings[selectedGroup] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Sidebar: Group Tabs Selector */}
      <div className="lg:col-span-3">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
          <ListCollapse className="w-4 h-4 text-amber-500" />
          <span>Grupos A al L</span>
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-2 gap-2">
          {groups.map(groupChar => {
            const isSelected = selectedGroup === groupChar;
            const groupTeams = Object.values(teams).filter(t => t.group === groupChar);
            
            return (
              <button
                key={groupChar}
                onClick={() => onSelectGroup(groupChar)}
                className={`py-3 px-4 rounded-xl flex flex-col items-center justify-center border transition-all duration-250 cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-550 shadow-md shadow-amber-500/5 text-amber-400 font-extrabold"
                    : "bg-slate-900/80 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-sm font-bold tracking-wider">Grupo {groupChar}</span>
                <div className="grid grid-cols-2 lg:flex gap-1 py-0.5 lg:py-0 lg:gap-1.5 mt-2 items-center justify-items-center justify-center">
                  {groupTeams.map(t => (
                    <CountryFlag 
                      key={t.id} 
                      teamId={t.id} 
                      fallbackFlag={t.flag} 
                      className="w-5 h-3.5 rounded-sm shadow-sm hover:scale-125 transition-transform cursor-help" 
                      title={t.name}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Areas: Grid of 9 cols */}
      <div className="lg:col-span-9 space-y-8">
        
        {/* Section A: Live Group Table */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2.5">
              <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-xs font-mono font-black uppercase">PRO</span>
              <span>Tabla de Posiciones - Grupo {selectedGroup}</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Criterio de desempate FIFA activo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/40 text-slate-400 font-mono text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 px-4 font-semibold">Pos</th>
                  <th className="py-4 px-4 font-semibold">Equipo</th>
                  <th className="py-4 px-2 font-semibold text-center">PJ</th>
                  <th className="py-4 px-2 font-semibold text-center hidden sm:table-cell">PG</th>
                  <th className="py-4 px-2 font-semibold text-center hidden sm:table-cell">PE</th>
                  <th className="py-4 px-2 font-semibold text-center hidden sm:table-cell">PP</th>
                  <th className="py-4 px-2 font-semibold text-center">GF</th>
                  <th className="py-4 px-2 font-semibold text-center">GC</th>
                  <th className="py-4 px-2 font-semibold text-center">DG</th>
                  <th className="py-4 px-4 font-semibold text-center text-amber-400">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {standings.map((row, index) => {
                  const isQualifyingDirect = index < 2;
                  const isThirdChance = index === 2;
                  
                  return (
                    <tr 
                      key={row.teamId} 
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isQualifyingDirect 
                          ? "bg-emerald-500/[0.03] text-emerald-300 font-semibold border-l border-emerald-500/30" 
                          : isThirdChance 
                          ? "bg-amber-500/[0.02] text-amber-200" 
                          : "bg-slate-900/10 text-slate-400"
                      }`}
                    >
                      {/* Position with status dot */}
                      <td className="py-3 px-4 font-mono font-bold flex items-center gap-2">
                        {index === 0 && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block" />}
                        {index === 1 && <span className="w-1.5 h-1.5 bg-slate-300 rounded-full inline-block" />}
                        {index === 2 && <span className="w-1.5 h-1.5 bg-sky-400 rounded-full inline-block" />}
                        {index === 3 && <span className="w-1.5 h-1.5 bg-slate-600 rounded-full inline-block" />}
                        <span>{index + 1}</span>
                      </td>

                      {/* Team with flag */}
                      <td className="py-3 px-4 font-medium text-slate-200">
                        <CountryFlag 
                          teamId={row.teamId} 
                          fallbackFlag={row.team.flag} 
                          className="w-6.5 h-4.5 rounded-sm shadow-sm mr-2.5 inline-block align-middle transform hover:scale-125 transition-transform" 
                          title={row.team.name}
                        />
                        <span className="align-middle text-base">{row.team.name}</span>
                        <span className="ml-1.5 text-xs text-slate-500 font-mono">({row.teamId})</span>
                      </td>

                      {/* PJ (Played) */}
                      <td className="py-3 px-2 text-center font-mono font-medium text-slate-300">
                        {row.played}
                      </td>

                      {/* PG PE PP (Won/Drawn/Lost) - Hidden on tiny screens */}
                      <td className="py-3 px-2 text-center font-mono text-slate-400 hidden sm:table-cell">
                        {row.won}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400 hidden sm:table-cell">
                        {row.drawn}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400 hidden sm:table-cell">
                        {row.lost}
                      </td>

                      {/* GF GC DG */}
                      <td className="py-3 px-2 text-center font-mono text-slate-400">
                        {row.gf}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">
                        {row.gc}
                      </td>
                      <td className="py-3 px-2 text-center font-mono">
                        <span className={`px-1.5 py-0.5 rounded font-bold text-xs ${
                          row.gd > 0 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : row.gd < 0 
                            ? "bg-rose-500/10 text-rose-400" 
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {row.gd > 0 ? `+${row.gd}` : row.gd}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3 px-4 text-center font-mono font-extrabold text-base text-amber-400">
                        {row.pts}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900/60 px-6 py-3 border-t border-slate-800 text-xs text-slate-400 space-y-1 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block" /> 1° Clasificado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-slate-300 rounded-full inline-block" /> 2° Clasificado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-sky-450 rounded-full inline-block" /> Candidato a Mejor Tercero
              </span>
            </div>
            <p className="italic">Clasifican directo los 2 mejores de cada grupo.</p>
          </div>
        </div>

        {/* Section B: Dynamic Fixture Matches */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Calendario de Partidos - Grupo {selectedGroup} (6 Partidos)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGroupMatches.map((match, idx) => {
              const homeTeam = teams[match.homeTeamId || ""];
              const awayTeam = teams[match.awayTeamId || ""];

              if (!homeTeam || !awayTeam) return null;

              // Journey/Jornada
              const matchdayNo = Math.floor(idx / 2) + 1;

              return (
                <div 
                  key={match.id} 
                  className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-amber-500/20 rounded-2xl p-4.5 flex flex-col justify-between shadow-xl transition-all duration-350 transform hover:-translate-y-0.5 group"
                >
                  {/* Top Metadata row */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80 mb-4 font-mono">
                    <span className="bg-slate-800/80 group-hover:bg-amber-400/10 px-2 py-0.5 rounded text-amber-400 font-bold uppercase tracking-wide transition-colors">
                      Match {match.id} • Jornada {matchdayNo}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {match.date} • {match.time}
                    </span>
                  </div>

                  {/* Core Match Row - Teams & Score inputs */}
                  <div className="flex items-center justify-between gap-2.5 my-1.5">
                    
                    {/* Home Team */}
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <CountryFlag 
                        teamId={homeTeam.id} 
                        fallbackFlag={homeTeam.flag} 
                        className="w-8 h-5.5 rounded-sm shadow-md hover:scale-115 transition-transform shrink-0" 
                        title={homeTeam.name}
                      />
                      <div className="truncate">
                        <p className="font-extrabold text-slate-100 truncate text-sm leading-tight uppercase tracking-tight">
                          {homeTeam.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {homeTeam.id}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Score Inputs */}
                    <div className="flex items-center gap-1 px-1">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        placeholder="0"
                        value={match.homeScore !== null ? match.homeScore : ""}
                        onChange={(e) => onScoreChange(match.id, true, e.target.value)}
                        className="w-10 h-10 bg-slate-950 font-black font-mono text-center text-lg text-amber-400 rounded-xl border border-slate-800/80 hover:border-slate-700/85 focus:border-amber-450 focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-inner"
                      />
                      <span className="text-slate-700 font-extrabold text-sm px-1 select-none">:</span>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        placeholder="0"
                        value={match.awayScore !== null ? match.awayScore : ""}
                        onChange={(e) => onScoreChange(match.id, false, e.target.value)}
                        className="w-10 h-10 bg-slate-950 font-black font-mono text-center text-lg text-amber-400 rounded-xl border border-slate-800/80 hover:border-slate-700/85 focus:border-amber-450 focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-inner"
                      />
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center justify-end gap-3 min-w-0 text-right">
                      <div className="truncate">
                        <p className="font-extrabold text-slate-100 truncate text-sm leading-tight uppercase tracking-tight">
                          {awayTeam.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {awayTeam.id}
                        </p>
                      </div>
                      <CountryFlag 
                        teamId={awayTeam.id} 
                        fallbackFlag={awayTeam.flag} 
                        className="w-8 h-5.5 rounded-sm shadow-md hover:scale-115 transition-transform shrink-0" 
                        title={awayTeam.name}
                      />
                    </div>

                  </div>

                  {/* Bottom Venue row */}
                  <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="truncate">{match.stadium}, {match.city}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
