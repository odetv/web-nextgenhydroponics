import { useState, useEffect } from "react";
import { app, database } from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";
import { ref, onDisconnect, set, update } from "firebase/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);

    const handleUserStatus = (userData: User | null) => {
      if (userData) {
        setUser(userData);
        const userStatusRef = ref(database, `users/${userData.uid}`);
        set(userStatusRef, {
          uid: userData.uid,
          displayName: userData.displayName,
          email: userData.email,
          isActive: true,
        });
        onDisconnect(userStatusRef).update({
          isActive: false,
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
