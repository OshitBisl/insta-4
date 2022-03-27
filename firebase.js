import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1OsnApf6uJqEJpCwAKqe2eRBoZpMowGA",
  authDomain: "insta-5c658.firebaseapp.com",
  projectId: "insta-5c658",
  storageBucket: "insta-5c658.appspot.com",
  messagingSenderId: "711990264959",
  appId: "1:711990264959:web:bb319d2d4046c5f87c6b4a"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };