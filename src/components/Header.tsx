import React from "react";
import { Trophy, RotateCcw, Save } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export default function Header({ onReset, onSave, isSaving = false }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-amber-500/30 sticky top-0 z-50 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 transform hover:scale-105 transition-transform shrink-0">
            <Trophy className="w-5.5 h-5.5 text-slate-950 fill-slate-950/20" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight uppercase text-slate-100">
              Mundial 2026 <span className="text-amber-500 font-black">•</span>{" "}
              <span className="font-light text-slate-400">Control de Resultados</span>
            </h1>
            <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mt-0.5">
              Fase Final & Sistema de Grupos Oficial
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          
          {/* Button: Guardar (Save to Cloud) */}
          <button
            id="save-btn"
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 sm:flex-initial px-4.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 disabled:opacity-50"
            title="Guardar todos los resultados actuales en la base de datos de Firebase"
          >
            {isSaving ? (
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isSaving ? "Guardando..." : "Guardar"}</span>
          </button>

          {/* Button: Reiniciar */}
          <button
            id="reset-btn"
            onClick={onReset}
            className="flex-1 sm:flex-initial px-4.5 py-2 rounded-xl bg-rose-500/10 text-rose-450 border border-rose-500/30 hover:bg-rose-500/20 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            title="Borrar todos los resultados y reiniciar el torneo"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-450" />
            <span>Reiniciar</span>
          </button>

        </div>
        
      </div>
    </header>
  );
}
