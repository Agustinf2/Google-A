import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDocFromServer,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Initialize Firestore with configured databaseId
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection as required by Firestore integration skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline warning:', error.message);
    }
    return false;
  }
}

export interface AuditValidationRecord {
  id: string;
  documentCode: string;
  documentTitle: string;
  lotId?: string;
  auditorUid: string;
  auditorName: string;
  auditorEmail?: string;
  verdict: 'Aprobado' | 'Con Observaciones' | 'Rechazado';
  score?: number;
  remarks?: string;
  signatureHash: string;
  signerPublicKey?: string;
  inspectionId?: string;
  createdAt: any;
}

const AUDIT_COLLECTION = 'audit_validations';

/**
 * Register a new digital audit signature in Firestore
 */
export async function registerAuditValidation(
  record: Omit<AuditValidationRecord, 'id' | 'createdAt'>
): Promise<string> {
  const validationId = `val_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const docRef = doc(db, AUDIT_COLLECTION, validationId);

  try {
    await setDoc(docRef, {
      ...record,
      createdAt: serverTimestamp(),
    });
    return validationId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${AUDIT_COLLECTION}/${validationId}`);
  }
}

/**
 * Subscribe to real-time audit validations recorded in Firestore
 */
export function subscribeAuditValidations(
  onData: (records: AuditValidationRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, AUDIT_COLLECTION);
  const q = query(colRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const records: AuditValidationRecord[] = [];
      snapshot.forEach((d) => {
        records.push({
          id: d.id,
          ...(d.data() as Omit<AuditValidationRecord, 'id'>),
        });
      });
      onData(records);
    },
    (error) => {
      onError?.(error);
      handleFirestoreError(error, OperationType.LIST, AUDIT_COLLECTION);
    }
  );
}

/**
 * One-time fetch of audit validations
 */
export async function getAuditValidations(): Promise<AuditValidationRecord[]> {
  try {
    const colRef = collection(db, AUDIT_COLLECTION);
    const snapshot = await getDocs(colRef);
    const records: AuditValidationRecord[] = [];
    snapshot.forEach((d) => {
      records.push({
        id: d.id,
        ...(d.data() as Omit<AuditValidationRecord, 'id'>),
      });
    });
    return records;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, AUDIT_COLLECTION);
  }
}
