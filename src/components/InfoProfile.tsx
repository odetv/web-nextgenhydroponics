"use client";
import { app, database } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useUserAuthentication } from "../services/usersService";
import { useEffect, useState } from "react";
import Image from "next/image";
import { onValue, ref } from "firebase/database";
import React from "react";

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

  const [users, setUsers] = useState<
    {
      uid: string;
      displayName: string;
      email: string;
      role: string;
      lastLogin: number;
      loginTime: number;
    }[]
  >([]);
  const [activeUsers, setActiveUsers] = useState<
    {
      uid: string;
      displayName: string;
      email: string;
      role: string;
      lastLogin: number;
      loginTime: number;
    }[]
  >([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val() || {};
      const usersList = Object.values(usersData).map((user) => {
        const typedUser = user as {
          uid: string;
          displayName: string;
          email: string;
          role: string;
          lastLogin: number;
          loginTime: number;
        };
        return {
          ...typedUser,
          role:
            typedUser.role ||
            process.env.NEXT_PUBLIC_VERCEL_DEFAULT_USER_ROLE ||
            "",
        };
      });
      setUsers(usersList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val() || {};
      const activeUsersList = Object.values(usersData)
        .filter((user: any) => user.isActive)
        .map((user) => {
          const typedUser = user as {
            uid: string;
            displayName: string;
            email: string;
            role: string;
            lastLogin: number;
            loginTime: number;
          };
          return {
            ...typedUser,
            role: typedUser.role || "registered",
          };
        });
      setActiveUsers(activeUsersList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [pageListUserActive, setPageListUserActive] = useState(1);
  const rowsPerPageListUserActive = 5;
  const pagesListUserActive = Math.ceil(
    activeUsers.length / rowsPerPageListUserActive
  );
  const paginatedListUserActive = React.useMemo(() => {
    const start = (pageListUserActive - 1) * rowsPerPageListUserActive;
    const end = start + rowsPerPageListUserActive;
    return activeUsers.slice(start, end);
  }, [pageListUserActive, activeUsers]);

  return (
    <div className="sm:min-h-screen flex flex-col gap-6 items-center justify-center text-center p-4">
      <div className="pt-10 sm:-mt-60 sm:pt-0">
        {user && (
          <Image
            className="object-cover w-full h-full rounded-full bg-gray-100"
            alt={user.displayName || ""}
            src={user.photoURL || ""}
            width={164}
            height={164}
            priority={true}
          />
        )}
      </div>
      <div className="p-4 bg-gray-100 rounded-md">
        <p className="font-semibold text-base">{user?.displayName || ""}</p>
        <p className="text-sm">{user?.email || ""}</p>
        {paginatedListUserActive.map((activeUser, index) => (
          <p key={activeUser.uid} className="capitalize text-sm">
            Role {activeUser.role}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoProfile;
