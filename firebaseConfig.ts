import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA3-qjg56v0EprW_G8ONIA4Q6MQk1uyvI",
  authDomain: "auth-nextgenhydroponics.firebaseapp.com",
  projectId: "auth-nextgenhydroponics",
  storageBucket: "auth-nextgenhydroponics.appspot.com",
  messagingSenderId: "83010494154",
  appId: "1:83010494154:web:4d91dde021c71ba836de33",
  measurementId: "G-Y1JZV11JYX",
};

const app = initializeApp(firebaseConfig);

export default app;
