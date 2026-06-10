import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdminConfig() {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Firebase Admin não configurado.");
    }

    return {
        projectId,
        clientEmail,
        privateKey,
    };
}

const adminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(getFirebaseAdminConfig()),
    });

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
