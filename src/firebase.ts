import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import { Match } from "./types";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

// Error handling types and function
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection Validation on startup
export async function testConnection() {
  const pathForTest = "test/connection";
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Connection Verified Successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration or network status.");
    } else {
      // It's normal that we might get permission-denied or document-not-found for "test/connection" 
      // since our security rules block everything except /tournaments/{id}
      console.log("Firebase connection test performed (blocked by rules is expected but indicates online status):", (error as Error).message);
    }
  }
}

// 2026 Tournament ID
const TOURNAMENT_DOC_ID = "v2026";
const PATH_TOURNAMENT = `tournaments/${TOURNAMENT_DOC_ID}`;

/**
 * Loads tournament results from Firestore.
 */
export async function loadTournamentFromCloud(): Promise<Match[] | null> {
  try {
    const docRef = doc(db, "tournaments", TOURNAMENT_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && Array.isArray(data.matches)) {
        return data.matches as Match[];
      }
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, PATH_TOURNAMENT);
    return null;
  }
}

/**
 * Saves tournament results to Firestore.
 */
export async function saveTournamentToCloud(matches: Match[]): Promise<void> {
  try {
    const docRef = doc(db, "tournaments", TOURNAMENT_DOC_ID);
    await setDoc(docRef, {
      matches: matches,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PATH_TOURNAMENT);
  }
}
