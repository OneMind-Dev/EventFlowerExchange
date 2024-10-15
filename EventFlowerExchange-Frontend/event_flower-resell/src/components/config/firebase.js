import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDAMXqu-m_gfkbwXzJQTI5lUvx1RXxgIk",
  authDomain: "eventflowerexchange-95a05.firebaseapp.com",
  projectId: "eventflowerexchange-95a05",
  storageBucket: "eventflowerexchange-95a05.appspot.com",
  messagingSenderId: "216686031452",
  appId: "1:216686031452:web:9f389dd6bed9da90a36c99",
  measurementId: "G-51Z65KH311"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };