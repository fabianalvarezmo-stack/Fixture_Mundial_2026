import React from "react";
import { Match, Team } from "../types";
import { MapPin, Calendar, CircleHelp, ShieldEllipsis, Trophy } from "lucide-react";
import CountryFlag from "./CountryFlag";

interface KnockoutViewProps {
  matches: Match[];
  onScoreChange: (matchId: number, isHome: boolean, score: string) => void;
  onPenaltiesChange: (matchId: number, isHome: boolean, penalties: string) => void;
  teams: Record<string, Team>;
}

type KnockoutRoundFilter = "r32" | "r16" | "qf" | "sf" | "finals" | "tree";

export default function KnockoutView({
  matches,
  onScoreChange,
  onPenaltiesChange,
  teams
}: KnockoutViewProps) {
  const [activeRound, setActiveRound] = React.useState<KnockoutRoundFilter>("r32");

  // Helper to render team inline inside the bracket view with a clean miniature flag.
  const renderBracketTeam = (teamId: string | null, placeholder: string | undefined, isWinner = false) => {
    if (!teamId) {
      return (
        <span className="text-slate-500 font-medium italic truncate select-none text-[11px] sm:text-xs">
          {placeholder || "TBD"}
        </span>
      );
    }
    const team = teams[teamId];
    if (!team) {
      return <span className="text-slate-400 font-semibold truncate text-[11px] sm:text-xs">TBD ({teamId})</span>;
    }
    return (
      <div className="flex items-center gap-1.5 min-w-0 truncate align-middle">
        <CountryFlag 
          teamId={teamId} 
          fallbackFlag={team.flag} 
          className="w-4.5 h-3 rounded-2xs shadow-2xs shrink-0 inline-block align-middle" 
          title={team.name}
        />
        <span className={`truncate text-[11px] sm:text-xs leading-none inline-block align-middle ${isWinner ? "text-emerald-400 font-bold" : "text-slate-200 font-medium"}`}>
          {team.name}
        </span>
      </div>
    );
  };

  // Safe helper to render team in regular list view
  const renderTeamNameAndFlag = (teamId: string | null, placeholder: string | undefined) => {
    if (!teamId) {
      return (
        <div className="flex items-center gap-2 text-slate-500 italic font-medium">
          <div className="w-8 h-8 rounded-lg bg-slate-805/40 border border-slate-800/50 flex items-center justify-center text-xs font-mono font-bold not-italic">
            ?
          </div>
          <span className="text-sm select-none truncate font-sans">Por definir ({placeholder || "TBD"})</span>
        </div>
      );
    }
    const team = teams[teamId];
    if (!team) {
      return <span className="text-slate-400 font-medium">TBD ({teamId})</span>;
    }
    return (
      <div className="flex items-center gap-3 min-w-0 font-sans">
        <CountryFlag 
          teamId={teamId} 
          fallbackFlag={team.flag} 
          className="w-8 h-5.5 rounded-sm shadow-md hover:scale-115 transition-transform shrink-0" 
          title={team.name}
        />
        <div className="truncate">
          <p className="font-bold text-slate-100 truncate text-sm sm:text-base leading-tight">
            {team.name}
          </p>
          <span className="text-xxs font-mono text-slate-500 uppercase block tracking-wider">
            {team.id}
          </span>
        </div>
      </div>
    );
  };
  const knockoutMatchesOfRound = matches.filter(m => {
    if (activeRound === "r32") return m.stage === "r32";
    if (activeRound === "r16") return m.stage === "r16";
    if (activeRound === "qf") return m.stage === "qf";
    if (activeRound === "sf") return m.stage === "sf";
    if (activeRound === "finals") return m.stage === "third" || m.stage === "final";
    return false; // For visual tree view, we'll handle separately
  });

  const getMatchTitle = (match: Match) => {
    switch (match.stage) {
      case "r32": return "Dieciseisavos de Final";
      case "r16": return "Octavos de Final";
      case "qf": return "Cuartos de Final";
      case "sf": return "Semifinal";
      case "third": return "Tercer Puesto";
      case "final": return "Gran Final";
      default: return `Partido ${match.id}`;
    }
  };

  // Helper inside match card to determine if scores are level (draw) which triggers penalty inputs
  const isMatchDrawn = (match: Match) => {
    return (
      match.homeScore !== null &&
      match.awayScore !== null &&
      match.homeScore === match.awayScore &&
      match.homeTeamId !== null &&
      match.awayTeamId !== null
    );
  };

  // Safe fetch match by ID
  const findMatchById = (id: number) => matches.find(m => m.id === id);

  return (
    <div className="space-y-6">
      
      {/* Knockout Round Filters */}
      <div className="flex flex-wrap items-center justify-center p-1.5 bg-slate-900 border border-slate-850 rounded-2xl gap-1">
        {[
          { key: "r32", label: "Dieciseisavos (R32)" },
          { key: "r16", label: "Octavos (R16)" },
          { key: "qf", label: "Cuartos de Final" },
          { key: "sf", label: "Semifinales" },
          { key: "finals", label: "Finales" },
          { key: "tree", label: "Bracket General (Árbol)" }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setActiveRound(btn.key as KnockoutRoundFilter)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeRound === btn.key
                ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10"
                : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {activeRound !== "tree" ? (
        /* Round List view */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knockoutMatchesOfRound.map((match) => {
            const hasTeams = match.homeTeamId && match.awayTeamId;
            const drawState = isMatchDrawn(match);
            
            // Highlight winners
            const isHomeWinner = match.winnerId !== null && match.winnerId === match.homeTeamId;
            const isAwayWinner = match.winnerId !== null && match.winnerId === match.awayTeamId;

            return (
              <div
                key={match.id}
                className={`border rounded-2xl p-5 flex flex-col justify-between shadow-lg transition-all duration-300 relative overflow-hidden ${
                  activeRound === "finals" && match.stage === "final"
                    ? "bg-slate-900/90 border-amber-500/50 shadow-amber-950/10 ring-1 ring-amber-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-amber-500/20"
                }`}
              >
                {/* Special crown icon for grand final champion */}
                {match.stage === "final" && match.winnerId && (
                  <div className="absolute right-3 top-3 text-amber-400 font-mono text-xs flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/25">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400/10" />
                    <span className="font-bold">Campeón del Mundo: {teams[match.winnerId]?.name}</span>
                  </div>
                )}

                {/* Card Title Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/60 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-slate-800 px-2.5 py-0.5 rounded text-amber-400 font-bold uppercase tracking-wider">
                      P{match.id}
                    </span>
                    <span className="font-bold text-slate-300">
                      {getMatchTitle(match)}
                    </span>
                  </div>
                  <span className="font-mono text-slate-500">
                    {match.date}
                  </span>
                </div>

                {/* Match Grid of teams and scores */}
                <div className="space-y-4 my-2">
                  
                  {/* Home Team Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {renderTeamNameAndFlag(match.homeTeamId, match.homePlaceholder)}
                    </div>
                    
                    {hasTeams ? (
                      <input
                        type="number"
                        min="0"
                        max="20"
                        placeholder="-"
                        value={match.homeScore !== null ? match.homeScore : ""}
                        onChange={(e) => onScoreChange(match.id, true, e.target.value)}
                        className={`w-11 h-11 bg-slate-950 font-bold font-mono text-center text-lg rounded-xl border focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                          isHomeWinner 
                            ? "text-emerald-400 border-emerald-550 shadow-md shadow-emerald-500/5 bg-emerald-500/[0.02]" 
                            : isAwayWinner 
                            ? "text-slate-500 border-slate-850 opacity-60"
                            : "text-amber-400 border-slate-800 focus:border-amber-400"
                        }`}
                      />
                    ) : (
                      <div className="w-11 h-11 border border-slate-850 bg-slate-950/40 rounded-xl flex items-center justify-center text-slate-600 font-bold">
                        -
                      </div>
                    )}
                  </div>

                  {/* Away Team Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {renderTeamNameAndFlag(match.awayTeamId, match.awayPlaceholder)}
                    </div>

                    {hasTeams ? (
                      <input
                        type="number"
                        min="0"
                        max="20"
                        placeholder="-"
                        value={match.awayScore !== null ? match.awayScore : ""}
                        onChange={(e) => onScoreChange(match.id, false, e.target.value)}
                        className={`w-11 h-11 bg-slate-950 font-bold font-mono text-center text-lg rounded-xl border focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                          isAwayWinner 
                            ? "text-emerald-400 border-emerald-550 shadow-md shadow-emerald-500/5 bg-emerald-500/[0.02]" 
                            : isHomeWinner 
                            ? "text-slate-500 border-slate-850 opacity-60"
                            : "text-amber-400 border-slate-800 focus:border-amber-400"
                        }`}
                      />
                    ) : (
                      <div className="w-11 h-11 border border-slate-850 bg-slate-950/40 rounded-xl flex items-center justify-center text-slate-600 font-bold">
                        -
                      </div>
                    )}
                  </div>

                </div>

                {/* PENALTY SHOOTOUT (Desempate por penales) - Triggers if match scores are level */}
                {drawState && (
                  <div className="mt-4 p-3 bg-amber-400/5 border border-amber-400/20 rounded-xl space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xxs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldEllipsis className="w-3.5 h-3.5 text-amber-400" />
                        Desempate por Penales (Requerido)
                      </span>
                      {match.homePenalties !== null && match.awayPenalties !== null && match.homePenalties === match.awayPenalties && (
                        <span className="text-xxs text-rose-400 font-medium">Marcadores de penal deben ser distintos</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                      
                      {/* Home Penalties Input */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono truncate max-w-[80px]">
                          {teams[match.homeTeamId || ""]?.name}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="Pen."
                          value={match.homePenalties !== null ? match.homePenalties : ""}
                          onChange={(e) => onPenaltiesChange(match.id, true, e.target.value)}
                          className="w-10 h-8 bg-slate-900 text-slate-200 font-bold font-mono text-center rounded-md border border-slate-800 focus:border-amber-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <span className="text-slate-600 font-bold text-xs">PEN</span>

                      {/* Away Penalties Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="Pen."
                          value={match.awayPenalties !== null ? match.awayPenalties : ""}
                          onChange={(e) => onPenaltiesChange(match.id, false, e.target.value)}
                          className="w-10 h-8 bg-slate-900 text-slate-200 font-bold font-mono text-center rounded-md border border-slate-800 focus:border-amber-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-xs text-slate-400 font-mono truncate max-w-[80px]">
                          {teams[match.awayTeamId || ""]?.name}
                        </span>
                      </div>

                    </div>
                  </div>
                )}

                {/* Bottom Venue metadata */}
                <div className="mt-4 pt-3.5 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>{match.stadium}, {match.city}</span>
                  </span>
                  <span className="text-slate-600 font-mono text-[10px]">
                    {match.time}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Visual Horizontal Bracket layout */
        <div className="bg-slate-900/40 ring-1 ring-slate-800 p-6 rounded-2xl overflow-x-auto shadow-inner">
          <div className="min-w-[1300px] flex items-center justify-between gap-6 py-6 font-sans">
            
            {/* COLUMN 1: Octavos & R32 connectors selection */}
            <div className="w-[240px] space-y-4 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Rango Dieciseisavos (P73-P80)
              </h4>
              {[73, 74, 75, 76, 77, 78, 79, 80].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COLUMN 2: Octavos Selection */}
            <div className="w-[240px] space-y-8 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Octavos (P89-P92)
              </h4>
              {[89, 90, 91, 92].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-4">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COLUMN 3: Cuartos Selection */}
            <div className="w-[240px] space-y-16 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Cuartos de Final (P97-P98)
              </h4>
              {[97, 98].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-6 relative z-10">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COLUMN 4: Semifinales vs Finals Center */}
            <div className="w-[260px] space-y-24 shrink-0 px-2 py-4 border-l border-r border-slate-800/40 bg-slate-950/20 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2 text-center mb-6">
                Final & Campeón de Copa
              </h4>
              
              {/* SF 101 */}
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-4">
                <span className="text-[10px] text-slate-500 font-mono">Semifinal P101</span>
                <div className="flex justify-between items-center gap-1">
                  {renderBracketTeam(findMatchById(101)?.homeTeamId ?? null, findMatchById(101)?.homePlaceholder, findMatchById(101)?.winnerId !== null && findMatchById(101)?.winnerId === findMatchById(101)?.homeTeamId)}
                  <span className="text-amber-400 font-bold font-mono">{findMatchById(101)?.homeScore ?? "-"}</span>
                </div>
                <div className="flex justify-between items-center gap-1">
                  {renderBracketTeam(findMatchById(101)?.awayTeamId ?? null, findMatchById(101)?.awayPlaceholder, findMatchById(101)?.winnerId !== null && findMatchById(101)?.winnerId === findMatchById(101)?.awayTeamId)}
                  <span className="text-amber-400 font-bold font-mono">{findMatchById(101)?.awayScore ?? "-"}</span>
                </div>
              </div>

              {/* GRAND FINAL 104 */}
              <div className="bg-slate-950 border-2 border-amber-500 p-4 rounded-2xl text-xs space-y-1.5 my-6 scale-105 shadow-lg shadow-amber-500/5 ring-1 ring-amber-400/25">
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wide block text-center">
                  🏆 Gran Final P104 🏆
                </span>
                <div className="flex justify-between items-center text-sm gap-1 py-0.5">
                  {renderBracketTeam(findMatchById(104)?.homeTeamId ?? null, findMatchById(104)?.homePlaceholder, findMatchById(104)?.winnerId !== null && findMatchById(104)?.winnerId === findMatchById(104)?.homeTeamId)}
                  <span className="text-amber-400 font-black font-mono">{findMatchById(104)?.homeScore ?? "-"}</span>
                </div>
                <div className="flex justify-between items-center text-sm gap-1 py-0.5">
                  {renderBracketTeam(findMatchById(104)?.awayTeamId ?? null, findMatchById(104)?.awayPlaceholder, findMatchById(104)?.winnerId !== null && findMatchById(104)?.winnerId === findMatchById(104)?.awayTeamId)}
                  <span className="text-amber-400 font-black font-mono">{findMatchById(104)?.awayScore ?? "-"}</span>
                </div>
                {findMatchById(104)?.winnerId && (
                  <div className="bg-amber-400 text-slate-950 text-center font-extrabold p-1.5 rounded-lg text-xs tracking-wide mt-2 flex items-center justify-center gap-1">
                    <CountryFlag teamId={findMatchById(104)!.winnerId!} fallbackFlag={teams[findMatchById(104)!.winnerId!]?.flag} className="w-5 h-3.5 rounded-2xs inline-block shadow-sm" />
                    <span>CAMPEÓN: {teams[findMatchById(104)!.winnerId!]?.name}</span>
                  </div>
                )}
              </div>

              {/* SF 102 */}
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-4">
                <span className="text-[10px] text-slate-500 font-mono">Semifinal P102</span>
                <div className="flex justify-between items-center gap-1">
                  {renderBracketTeam(findMatchById(102)?.homeTeamId ?? null, findMatchById(102)?.homePlaceholder, findMatchById(102)?.winnerId !== null && findMatchById(102)?.winnerId === findMatchById(102)?.homeTeamId)}
                  <span className="text-amber-400 font-bold font-mono">{findMatchById(102)?.homeScore ?? "-"}</span>
                </div>
                <div className="flex justify-between items-center gap-1">
                  {renderBracketTeam(findMatchById(102)?.awayTeamId ?? null, findMatchById(102)?.awayPlaceholder, findMatchById(102)?.winnerId !== null && findMatchById(102)?.winnerId === findMatchById(102)?.awayTeamId)}
                  <span className="text-amber-400 font-bold font-mono">{findMatchById(102)?.awayScore ?? "-"}</span>
                </div>
              </div>

            </div>

            {/* COLUMN 5: Semis right side range */}
            <div className="w-[240px] space-y-16 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Cuartos de Final (P99-P100)
              </h4>
              {[99, 100].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-6">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COLUMN 6: Octavos de final right side */}
            <div className="w-[240px] space-y-8 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Octavos (P93-P96)
              </h4>
              {[93, 94, 95, 96].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1 my-4">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COLUMN 7: Dieciseisavos right side */}
            <div className="w-[240px] space-y-4 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 text-center mb-6">
                Rango Dieciseisavos (P81-P88)
              </h4>
              {[81, 82, 83, 84, 85, 86, 87, 88].map((id) => {
                const m = findMatchById(id);
                if (!m) return null;
                const wt = m.winnerId ? teams[m.winnerId] : null;
                return (
                  <div key={id} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] mb-0.5">
                      <span>P{id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.homeTeamId, m.homePlaceholder, m.winnerId !== null && m.winnerId === m.homeTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.homeScore !== null ? m.homeScore : "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 py-0.5">
                      {renderBracketTeam(m.awayTeamId, m.awayPlaceholder, m.winnerId !== null && m.winnerId === m.awayTeamId)}
                      <span className="font-mono text-amber-400 font-bold shrink-0">{m.awayScore !== null ? m.awayScore : "-"}</span>
                    </div>
                    {wt && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1 text-center font-bold rounded mt-1 flex items-center justify-center gap-1">
                        <span>Pasa:</span>
                        <CountryFlag teamId={wt.id} fallbackFlag={wt.flag} className="w-4 h-2.5 rounded-2xs inline-block" />
                        <span>{wt.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
