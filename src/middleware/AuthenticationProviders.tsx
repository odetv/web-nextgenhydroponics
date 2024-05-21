import { useState, useEffect } from "react";
import { app, database } from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";
import { ref, set, onDisconnect, update, get } from "firebase/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);

    const handleUserStatus = async (userData: User | null) => {
      if (userData) {
        setUser(userData);
        const userStatusRef = ref(database, `users/${userData.uid}`);
        const snapshot = await get(userStatusRef);
        const userExists = snapshot.exists();

        if (!userExists) {
          set(userStatusRef, {
            uid: userData.uid,
            displayName: userData.displayName,
            email: userData.email,
            isActive: true,
            lastLogin: Date.now(),
            loginTime: Date.now(), // Tambahkan ini untuk mencatat waktu login
          });
        } else {
          update(userStatusRef, {
            isActive: true,
            lastLogin: snapshot.val().lastLogin || Date.now(),
            loginTime: Date.now(), // Update waktu login setiap kali pengguna login
          });
        }

        onDisconnect(userStatusRef).update({
          isActive: false,
          loginTime: null, // Reset waktu login saat pengguna terputus
        });
      } else {
        setUser(null);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleUserStatus);

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
}

// import { useState, useEffect } from "react";
// import { app } from "../../firebaseConfig";
// import { getAuth, User } from "firebase/auth";

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = auth.onAuthStateChanged((userData) => {
//       if (userData) {
//         setUser(userData);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return user;
// }

// import { useState, useEffect } from "react";
// import { app } from "../../firebaseConfig";
// import { getAuth, User } from "firebase/auth";

// const allowedEmails = ["testing@gmail.com"];

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = auth.onAuthStateChanged((userData) => {
//       if (userData) {
//         const userEmail = userData.email;
//         if (userEmail && allowedEmails.includes(userEmail)) {
//           setUser(userData);
//         } else {
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return user;
// }
