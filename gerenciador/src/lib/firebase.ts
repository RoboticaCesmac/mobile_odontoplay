import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2KpWxHjFuxLfjttvKwhqy90jzlwugfPs",
  authDomain: "odontoplay-bb7fc.firebaseapp.com",
  projectId: "odontoplay-bb7fc",
  storageBucket: "odontoplay-bb7fc.firebasestorage.app",
  messagingSenderId: "131213387213",
  appId: "1:131213387213:web:1dfe348b0ac2737a41d084",
  measurementId: "G-1RXNDBBVGZ",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
