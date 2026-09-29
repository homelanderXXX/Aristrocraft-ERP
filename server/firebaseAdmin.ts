import fs from 'fs';
import path from 'path';
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth, Auth, UserRecord } from 'firebase-admin/auth';

let firebaseApp: App | null = null;
let firebaseAuth: Auth | null = null;

export function initFirebaseAdmin(): { app: App | null; auth: Auth | null; error?: string } {
  if (firebaseAuth && firebaseApp) {
    return { app: firebaseApp, auth: firebaseAuth };
  }

  try {
    const defaultSaPath = path.join(process.cwd(), 'aristrocrafts-firebase-adminsdk-fbsvc-43426cc041.json');
    let serviceAccount: any = null;

    if (fs.existsSync(defaultSaPath)) {
      const fileContent = fs.readFileSync(defaultSaPath, 'utf-8');
      serviceAccount = JSON.parse(fileContent);
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }

    if (!serviceAccount) {
      return { app: null, auth: null, error: 'Firebase service account credentials not found.' };
    }

    if (getApps().length === 0) {
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || 'aristrocrafts',
      });
    } else {
      firebaseApp = getApps()[0];
    }

    firebaseAuth = getAuth(firebaseApp);
    console.log(`[Firebase Admin] Initialized successfully for project: ${serviceAccount.project_id}`);
    return { app: firebaseApp, auth: firebaseAuth };
  } catch (err: any) {
    console.error('[Firebase Admin] Initialization failed:', err.message);
    return { app: null, auth: null, error: err.message };
  }
}

export async function syncGoogleUserToFirebase(profile: {
  email: string;
  name?: string;
  picture?: string;
  sub?: string;
}): Promise<{
  success: boolean;
  user?: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    provider: string;
  };
  customToken?: string;
  error?: string;
}> {
  const { auth, error } = initFirebaseAdmin();
  if (!auth) {
    return { success: false, error: error || 'Firebase Auth is not initialized.' };
  }

  try {
    let userRecord: UserRecord;

    try {
      userRecord = await auth.getUserByEmail(profile.email);
      // Update details if changed
      if (profile.name || profile.picture) {
        userRecord = await auth.updateUser(userRecord.uid, {
          displayName: profile.name || userRecord.displayName,
          photoURL: profile.picture || userRecord.photoURL,
        });
      }
    } catch (notFoundErr: any) {
      if (notFoundErr.code === 'auth/user-not-found') {
        userRecord = await auth.createUser({
          email: profile.email,
          displayName: profile.name || 'Google Customer',
          photoURL: profile.picture || '',
          emailVerified: true,
        });
      } else {
        throw notFoundErr;
      }
    }

    // Create Firebase Custom Auth Token
    const customToken = await auth.createCustomToken(userRecord.uid, {
      provider: 'google',
      email: userRecord.email,
    });

    return {
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email || profile.email,
        displayName: userRecord.displayName || profile.name || 'Google Customer',
        photoURL: userRecord.photoURL || profile.picture || '',
        provider: 'google',
      },
      customToken,
    };
  } catch (err: any) {
    console.error('[Firebase Admin] syncGoogleUserToFirebase error:', err.message);
    return { success: false, error: err.message };
  }
}
