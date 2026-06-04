import { Match } from "./types";

/**
 * Checks if Firebase has been configured.
 * Hardcoded to false to enforce local-only, browser-compatible execution mode with zero database connection.
 */
export function isFirebaseConfigured(): boolean {
  return false;
}

/**
 * Mock connection validation.
 */
export async function testConnection(): Promise<void> {
  console.log("Conexión de base de datos omitida (Modo local de alto rendimiento).");
}

/**
 * Stub documentation-defined load function.
 * Since the database connection is removed, this returns null so the browser local storage is always used.
 */
export async function loadTournamentFromCloud(): Promise<Match[] | null> {
  return null;
}

/**
 * Stub documentation-defined save function.
 */
export async function saveTournamentToCloud(matches: Match[]): Promise<void> {
  throw new Error("El almacenamiento en la nube está inactivo. La aplicación está operando en formato web-local.");
}
