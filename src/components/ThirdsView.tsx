import React from "react";
import { ThirdPlaceStanding } from "../types";
import { Award, CheckCircle, XCircle, Info, Trophy } from "lucide-react";
import CountryFlag from "./CountryFlag";

interface ThirdsViewProps {
  thirds: ThirdPlaceStanding[];
}

export default function ThirdsView({ thirds }: ThirdsViewProps) {
  return (
    <div className="space-y-6">
      
      {/* Intro info box */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="bg-amber-400/10 p-2.5 rounded-xl border border-amber-400/20 shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Clasificación de Mejores Terceros
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-0.5 sm:mt-1 leading-relaxed">
              En el formato de 48 equipos de la Copa Mundial 2026, los 12 terceros de grupo se comparan en una tabla global. Los <strong className="text-amber-400 font-extrabold">8 mejores terceros</strong> clasifican a Dieciseisavos de Final.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-950/65 px-4 py-2.5 rounded-xl border border-slate-800/80 text-center shrink-0 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
            Cupos Completados
          </span>
          <span className="text-xl font-black font-mono text-amber-400">
            {thirds.filter(t => t.teamId !== null).length} / 12
          </span>
        </div>
      </div>

      {/* Main Unified Standings Table */}
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Tabla de Terceros Lugares (Regla de los 12 Grupos)</span>
          </h3>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono">
            8/12 Clasifican
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 text-slate-400 font-mono text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-4 font-semibold text-center">Rango</th>
                <th className="py-4 px-3 font-semibold text-center">Grupo</th>
                <th className="py-4 px-4 font-semibold">Selección</th>
                <th className="py-4 px-3 font-semibold text-center">Pts</th>
                <th className="py-4 px-3 font-semibold text-center">DG</th>
                <th className="py-4 px-3 font-semibold text-center">GF</th>
                <th className="py-4 px-6 font-semibold text-center">Estado de Entrada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {thirds.map((row, index) => {
                const ranksPassed = index < 8; // Top 8
                
                return (
                  <tr 
                    key={row.group} 
                    className={`hover:bg-slate-800/40 transition-colors ${
                      ranksPassed 
                        ? "bg-emerald-500/[0.02]" 
                        : "bg-rose-500/[0.01]"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-base">
                      <span className={`inline-block w-7 h-7 rounded-full text-center leading-7 text-xs ${
                        ranksPassed 
                          ? "bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20" 
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {index + 1}
                      </span>
                    </td>

                    {/* Group Column */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2 py-0.5 bg-slate-850 border border-slate-800 text-slate-300 rounded font-mono font-bold text-xs">
                        {row.group}
                      </span>
                    </td>

                    {/* Team with Flag */}
                    <td className="py-3.5 px-4 font-medium text-slate-200 font-sans">
                      {row.team && row.teamId ? (
                        <>
                          <CountryFlag 
                            teamId={row.teamId} 
                            fallbackFlag={row.team.flag} 
                            className="w-6.5 h-4.5 rounded-sm shadow-sm mr-2.5 inline-block align-middle transform hover:scale-125 transition-transform" 
                            title={row.team.name}
                          />
                          <span className="align-middle text-sm sm:text-base">{row.team.name}</span>
                          <span className="ml-1.5 text-xs text-slate-500 font-mono">({row.teamId})</span>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500 italic select-none">
                          <span className="w-5.5 h-3.5 rounded-2xs bg-slate-800 border border-slate-700/60 inline-flex items-center justify-center text-[10px] font-mono font-bold not-italic text-slate-400 shadow-inner">
                            ?
                          </span>
                          <span className="text-sm">Por definir</span>
                        </div>
                      )}
                    </td>

                    {/* Pts */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-base text-slate-200">
                      {row.pts}
                    </td>

                    {/* DG */}
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className={`px-1.5 py-0.5 rounded font-bold text-xs ${
                        row.gd > 0 
                          ? "bg-emerald-550/15 text-emerald-400" 
                          : row.gd < 0 
                          ? "bg-rose-550/15 text-rose-450" 
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </span>
                    </td>

                    {/* GF */}
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400">
                      {row.gf}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-6 text-center">
                      {ranksPassed ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-xl text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/5" />
                          <span>PASA (Posible {index + 1}°)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-450 border border-rose-550/15 px-3 py-1 rounded-xl text-xs font-semibold">
                          <XCircle className="w-3.5 h-3.5 text-rose-400 fill-rose-400/5" />
                          <span>ELIMINADO</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer rule specification */}
        <div className="bg-slate-900/60 p-4 border-t border-slate-800 text-xs text-slate-450 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed regular">
            <strong>Criterios de desempate en la tabla de terceros:</strong> 1) Mayor cantidad de puntos, 2) Mayor diferencia de goles (DG), 3) Mayor cantidad de goles a favor (GF). Los 8 equipos que queden en la zona verde (posiciones 1 a 8) poblarán automáticamente las llaves correspondientes del cuadro final.
          </p>
        </div>
      </div>

    </div>
  );
}
