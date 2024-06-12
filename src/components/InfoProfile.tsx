"use client";
import { app } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useUserAuthentication } from "../services/usersService";
import { useEffect } from "react";
import Image from "next/image";

const InfoProfile = () => {
  const { user, setUser, handleLogout } = useUserAuthentication();
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
  }, [setUser]);

  return (
    <div className="sm:min-h-screen flex flex-col gap-6 items-center justify-center text-center p-4">
      <div className="pt-10 sm:-mt-60 sm:pt-0">
        <Image
          className="object-cover w-full h-full rounded-full bg-gray-100"
          alt={user?.displayName || ""}
          src={user?.photoURL || ""}
          width={164}
          height={164}
          priority={true}
        />
      </div>
      <div>
        <p>{user?.displayName || ""}</p>
        <p>{user?.email || ""}</p>
      </div>
    </div>
  );
};

export default InfoProfile;
