import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2BJp3D5un37p3rpdi4Vfiispu3h4fyXk",
  authDomain: "todo-app-99094.firebaseapp.com",
  projectId: "todo-app-99094",
  storageBucket: "todo-app-99094.appspot.com",
  messagingSenderId: "308885712892",
  appId: "1:308885712892:web:6745630d4ff963ca610c79",
  measurementId: "G-KLYY10F1M9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🟢 Properly set persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});

export { auth, db };
