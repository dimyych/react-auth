import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBAS_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAS_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBAS_PROGECT_ID,
  storageBucket: process.env.REACT_APP_FIREBAS_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBAS_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBAS_APP_ID,
};

const app = initializeApp(firebaseConfig);
