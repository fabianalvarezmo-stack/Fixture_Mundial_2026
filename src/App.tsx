import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import GroupStageView from "./components/GroupStageView";
import ThirdsView from "./components/ThirdsView";
import KnockoutView from "./components/KnockoutView";
import StatsView from "./components/StatsView";
import Modal, { ModalState } from "./components/Modal";

import { 
  generateGroupMatches, 
  generateInitialKnockoutMatches, 
  TEAMS, 
  GROUPS 
} from "./data/initialData";

import { 
  calculateAllGroupStandings, 
  calculateThirdPlaceStandings, 
  propagateKnockoutMatches 
} from "./utils/calc";

import { Match, Standing, ThirdPlaceStanding } from "./types";
import { LayoutDashboard, Award, Trophy, Star, ChevronUp, CloudLightning } from "lucide-react";
import { 
  testConnection, 
  loadTournamentFromCloud, 
  saveTournamentToCloud 
} from "./firebase";

const LOCAL_STORAGE_KEY = "wc_2026_simulator_state_v2";

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("A");
  const [activeTab, setActiveTab] = useState<"groups" | "thirds" | "knockout" | "stats">("groups");

  // Firebase integration status and modal popups state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCloudLoading, setIsCloudLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: "success_save",
    title: "",
    message: ""
  });

  // 1. Hybrid Initial Loading: LocalStorage instantly, Firebase Cloud dynamically in background
  useEffect(() => {
    // Phase A: Offline instant load
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    let loadedMatches: Match[] = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 104) {
          loadedMatches = parsed;
          setMatches(loadedMatches);
        }
      } catch (err) {
        console.error("Error loading tournament progress from storage", err);
      }
    }

    if (loadedMatches.length === 0) {
      const initialGroupMatches = generateGroupMatches();
      const initialKnockoutMatches = generateInitialKnockoutMatches();
      const combinedMatches = [...initialGroupMatches, ...initialKnockoutMatches];
      
      const gs = calculateAllGroupStandings(GROUPS, TEAMS, combinedMatches);
      const ts = calculateThirdPlaceStandings(GROUPS, gs);
      const fullyCascaded = propagateKnockoutMatches(combinedMatches, gs, ts);
      
      loadedMatches = fullyCascaded;
      setMatches(fullyCascaded);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullyCascaded));
    }

    // Phase B: Firestore async sync
    const syncWithFirebase = async () => {
      setIsCloudLoading(true);
      await testConnection();
      try {
        const cloudMatches = await loadTournamentFromCloud();
        if (cloudMatches && Array.isArray(cloudMatches) && cloudMatches.length === 104) {
          setMatches(cloudMatches);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloudMatches));
          console.log("Firebase Cloud Synchronized successfully on start.");
        }
      } catch (error) {
        console.error("Startup Firebase download omitted/error (rules block or offline is fine):", error);
      } finally {
        setIsCloudLoading(false);
      }
    };

    syncWithFirebase();
  }, []);

  // 2. Local calculations derived dynamically from current match scores
  const derivedGroupStandings = calculateAllGroupStandings(GROUPS, TEAMS, matches);
  const derivedThirdsStandings = calculateThirdPlaceStandings(GROUPS, derivedGroupStandings);

  // 3. Score Change handler
  const handleScoreChange = (matchId: number, isHome: boolean, scoreString: string) => {
    const cleanScore = scoreString.trim() === "" ? null : Math.max(0, parseInt(scoreString, 10));

    // Update the single match score
    const updated = matches.map(m => {
      if (m.id === matchId) {
        const nextMatch = { ...m };
        if (isHome) {
          nextMatch.homeScore = cleanScore;
        } else {
          nextMatch.awayScore = cleanScore;
        }

        // Clean penalties if tie is resolved or changed
        if (nextMatch.homeScore !== nextMatch.awayScore || nextMatch.homeScore === null) {
          nextMatch.homePenalties = null;
          nextMatch.awayPenalties = null;
        }
        return nextMatch;
      }
      return m;
    });

    // Recalculate standings and propagate cascade
    const stepGS = calculateAllGroupStandings(GROUPS, TEAMS, updated);
    const stepTS = calculateThirdPlaceStandings(GROUPS, stepGS);
    const fullyCascaded = propagateKnockoutMatches(updated, stepGS, stepTS);

    setMatches(fullyCascaded);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullyCascaded));
  };

  // 4. Penalty Shootout handler
  const handlePenaltiesChange = (matchId: number, isHome: boolean, penaltiesString: string) => {
    const cleanPenalties = penaltiesString.trim() === "" ? null : Math.max(0, parseInt(penaltiesString, 10));

    const updated = matches.map(m => {
      if (m.id === matchId) {
        const nextMatch = { ...m };
        if (isHome) {
          nextMatch.homePenalties = cleanPenalties;
        } else {
          nextMatch.awayPenalties = cleanPenalties;
        }
        return nextMatch;
      }
      return m;
    });

    // Resolve ties and cascade down
    const stepGS = calculateAllGroupStandings(GROUPS, TEAMS, updated);
    const stepTS = calculateThirdPlaceStandings(GROUPS, stepGS);
    const fullyCascaded = propagateKnockoutMatches(updated, stepGS, stepTS);

    setMatches(fullyCascaded);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullyCascaded));
  };

  // 5. Firebase Cloud Save Handler (Saves scores input by user)
  const handleSaveTournament = () => {
    setModal({
      isOpen: true,
      type: "confirm_save",
      title: "Guardar Resultados",
      message: "¿Deseas guardar permanentemente todos los resultados ingresados en la base de datos de Firebase?",
      onConfirm: async () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        setIsSaving(true);
        try {
          await saveTournamentToCloud(matches);
          // Show beautiful success popup
          setModal({
            isOpen: true,
            type: "success_save",
            title: "¡Guardado Exitoso!",
            message: "Los resultados se sincronizaron perfectamente en la base de datos de Firebase Firestore en la nube."
          });
        } catch (err) {
          console.error("Error saving matches:", err);
          setModal({
            isOpen: true,
            type: "error",
            title: "Error de Guardado",
            message: "No se pudieron registrar las puntuaciones en Firebase. Comprueba las reglas de acceso o tu red.",
            errorMessage: err instanceof Error ? err.message : String(err)
          });
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  // 6. Reset Torneo Handler with custom popup validation
  const handleResetTournament = () => {
    setModal({
      isOpen: true,
      type: "confirm_reset",
      title: "Reiniciar Simulador",
      message: "¿Estás completamente seguro de que deseas borrar todos los marcadores? Esto reestablecerá los datos por defecto.",
      onConfirm: () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        
        const initialGroupMatches = generateGroupMatches();
        const initialKnockoutMatches = generateInitialKnockoutMatches();
        const combinedMatches = [...initialGroupMatches, ...initialKnockoutMatches];

        const gs = calculateAllGroupStandings(GROUPS, TEAMS, combinedMatches);
        const ts = calculateThirdPlaceStandings(GROUPS, gs);
        const fullyCascaded = propagateKnockoutMatches(combinedMatches, gs, ts);

        setMatches(fullyCascaded);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullyCascaded));

        // Show beautiful success popup
        setModal({
          isOpen: true,
          type: "success_reset",
          title: "Simulador Reiniciado",
          message: "Se restablecieron los marcadores iniciales y fixture de grupos con éxito."
        });
      }
    });
  };

  // 7. Render Loading Fallback if state is not populated
  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 font-sans p-6 text-center select-none">
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-3xl shadow-xl shadow-amber-500/10 mb-4 animate-bounce">
          <Trophy className="w-10 h-10 text-slate-955" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
          Copa Mundial FIFA • 2026
        </p>
        <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
          Cargando Fixture Oficial...
        </h2>
        <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden mt-4">
          <div className="w-1/2 h-full bg-amber-400 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header */}
      <Header 
        onReset={handleResetTournament} 
        onSave={handleSaveTournament}
        isSaving={isSaving}
      />

      {/* Cloud loading indicator bar */}
      {isCloudLoading && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-500 text-center py-2 text-xs font-mono tracking-widest flex items-center justify-center gap-2 animate-pulse">
          <CloudLightning className="w-3.5 h-3.5 animate-bounce" />
          <span>SINCRONIZANDO DATOS CON FIREBASE...</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg mb-2">
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth">
            
            {/* Tab: Fase de Grupos */}
            <button
              id="tab-groups"
              onClick={() => setActiveTab("groups")}
              className={`h-12 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-250 flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTab === "groups"
                  ? "border-amber-500 text-amber-500 bg-amber-500/[0.03] font-black"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 text-current" />
              <span>Fase de Grupos</span>
            </button>

            {/* Tab: Mejores Terceros */}
            <button
              id="tab-thirds"
              onClick={() => setActiveTab("thirds")}
              className={`h-12 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-250 flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTab === "thirds"
                  ? "border-amber-500 text-amber-500 bg-amber-500/[0.03] font-black"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              <Award className="w-4 h-4 shrink-0 text-current" />
              <span>Mejores Terceros</span>
            </button>

            {/* Tab: Fase Eliminatoria */}
            <button
              id="tab-knockout"
              onClick={() => setActiveTab("knockout")}
              className={`h-12 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-250 flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTab === "knockout"
                  ? "border-amber-500 text-amber-500 bg-amber-500/[0.03] font-black"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              <Trophy className="w-4 h-4 shrink-0 text-current" />
              <span>Fase Eliminatoria</span>
            </button>

            {/* Tab: Estadísticas */}
            <button
              id="tab-stats"
              onClick={() => setActiveTab("stats")}
              className={`h-12 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-250 flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTab === "stats"
                  ? "border-amber-500 text-amber-500 bg-amber-500/[0.03] font-black"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
              }`}
            >
              <Star className="w-4 h-4 shrink-0 text-current" />
              <span>Estadísticas</span>
            </button>

          </div>
        </div>

        {/* Dynamic Views based on active tab */}
        <div className="py-2">
          {activeTab === "groups" && (
            <GroupStageView
              groups={GROUPS}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
              matches={matches}
              onScoreChange={handleScoreChange}
              groupStandings={derivedGroupStandings}
              teams={TEAMS}
            />
          )}

          {activeTab === "thirds" && (
            <ThirdsView 
              thirds={derivedThirdsStandings} 
            />
          )}

          {activeTab === "knockout" && (
            <KnockoutView
              matches={matches}
              onScoreChange={handleScoreChange}
              onPenaltiesChange={handlePenaltiesChange}
              teams={TEAMS}
            />
          )}

          {activeTab === "stats" && (
            <StatsView
              teams={TEAMS}
              matches={matches}
            />
          )}
        </div>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-900 bg-slate-950/40 text-center py-6 text-xs text-slate-600 font-mono mt-16 pb-12">
        <p>© 2026 Copa Mundial de la FIFA - Control de resultados - Derechos reservados - Fabián Álvarez</p>
        <p className="mt-1 text-[10px] text-slate-700">Diseñado con tecnología React, Tailwind CSS v4 & Lucide Icons</p>
      </footer>

      {/* Custom Modal for confirmations and outcomes */}
      <Modal 
        state={modal} 
        onClose={() => setModal(prev => ({ ...prev, isOpen: false }))} 
      />

    </div>
  );
}
