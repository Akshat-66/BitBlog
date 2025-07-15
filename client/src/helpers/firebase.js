import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";

// Firebase configuration using ByteBlog project
const firebaseConfig = {
  apiKey: getEvn('VITE_FIREBASE_API'),
  authDomain: "byteblog-56ba4.firebaseapp.com",
  projectId: "byteblog-56ba4",
  storageBucket: "byteblog-56ba4.appspot.com",  // ✅ fixed this
  messagingSenderId: "290093671866",
  appId: "1:290093671866:web:8c052bb28851b786b5a983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
