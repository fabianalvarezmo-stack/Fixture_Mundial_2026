import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  RotateCcw, 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  AlertOctagon 
} from "lucide-react";

export interface ModalState {
  isOpen: boolean;
  type: "confirm_save" | "confirm_reset" | "success_save" | "success_reset" | "error";
  title: string;
  message: string;
  errorMessage?: string;
  onConfirm?: () => void;
}

interface ModalProps {
  state: ModalState;
  onClose: () => void;
}

export default function Modal({ state, onClose }: ModalProps) {
  const { isOpen, type, title, message, errorMessage, onConfirm } = state;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop with fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={type.startsWith("success") ? onClose : undefined} // Close success modals by clicking outside
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container Card with spring scale-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl flex flex-col items-center text-center overflow-hidden"
          >
            {/* Decors: subtle glowing highlight in the background */}
            <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-10 ${
              type.includes("save") ? "bg-amber-500" : type.includes("reset") ? "bg-rose-500" : "bg-red-500"
            }`} />
            
            {/* Close icon for notification-only messages */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-350 active:scale-90 transition-all p-1.5 rounded-lg hover:bg-slate-800/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon representation */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
              type === "confirm_save" 
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                : type === "confirm_reset"
                ? "bg-rose-500/10 text-rose-450 border border-rose-500/20 shadow-lg shadow-rose-950/10"
                : type === "success_save"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : type === "success_reset"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "bg-red-500/10 text-red-450 border border-red-500/20"
            }`}>
              {type === "confirm_save" && <Save className="w-8 h-8" />}
              {type === "confirm_reset" && <RotateCcw className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />}
              {type === "success_save" && <CheckCircle className="w-8 h-8 text-emerald-400" />}
              {type === "success_reset" && <Trophy className="w-8 h-8 text-cyan-400" />}
              {type === "error" && <AlertOctagon className="w-8 h-8 text-red-500" />}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-black tracking-tight text-white mb-2 uppercase">
              {title}
            </h3>
            <p className="text-sm text-slate-400 font-normal leading-relaxed mb-6">
              {message}
            </p>

            {/* In case of deep errors, show detailed message */}
            {errorMessage && (
              <div className="w-full bg-red-950/20 hover:bg-red-950/30 border border-red-900/30 rounded-xl p-3 text-left mb-6 transition-all">
                <span className="font-mono text-[10px] uppercase text-red-450 font-bold block mb-1">
                  Detalles del error (Firestore):
                </span>
                <p className="font-mono text-[11px] text-red-400 break-all select-all leading-normal">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Actions: Yes/No vs OK */}
            <div className="w-full flex items-center gap-3">
              {type.startsWith("confirm") ? (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (onConfirm) onConfirm();
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-150 cursor-pointer text-slate-950 shadow-md ${
                      type === "confirm_save" 
                        ? "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-450 hover:to-amber-350 shadow-amber-500/10" 
                        : "bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-550 hover:to-rose-350 shadow-rose-500/10"
                    }`}
                  >
                    Confirmar
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700/80 hover:text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  Entendido
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
