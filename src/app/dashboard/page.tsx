"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import app from "../../../firebaseConfig";
import { getAuth, User, signOut } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Dashboard() {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      {user ? (
        <Typography>Selamat datang di Dashboard.</Typography>
      ) : (
        <Typography>Masuk dulu cuy!</Typography>
      )}
    </main>
  );
}
