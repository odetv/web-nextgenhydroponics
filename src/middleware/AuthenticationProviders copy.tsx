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
            loginTime: Date.now(),
          });
        } else {
          update(userStatusRef, {
            uid: userData.uid,
            displayName: userData.displayName,
            email: userData.email,
            isActive: true,
            lastLogin: snapshot.val().lastLogin || Date.now(),
            loginTime: Date.now(),
          });
        }

        onDisconnect(userStatusRef).update({
          isActive: false,
          loginTime: null,
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
// import { app, database } from "../../firebaseConfig";
// import { getAuth, User } from "firebase/auth";
// import { ref, set, onDisconnect, update, get } from "firebase/database";

// interface ExtendedUser extends User {
//   role?: string;
//   lastLogin?: number;
//   loginTime?: number;
// }

// const ADMIN_EMAILS =
//   process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAILS?.split(",") ?? [];

// export function useAuth() {
//   const [user, setUser] = useState<ExtendedUser | null>(null);

//   useEffect(() => {
//     const auth = getAuth(app);

//     const handleUserStatus = async (userData: User | null) => {
//       if (userData) {
//         const userRef = ref(database, `users/${userData.uid}`);
//         const snapshot = await get(userRef);
//         const userExists = snapshot.exists();
//         let userRole = snapshot.val().role || "registered";
//         if (ADMIN_EMAILS.includes(userData.email ?? "")) {
//           userRole = "admin";
//         }
//         if (!userExists) {
//           set(userRef, {
//             uid: userData.uid,
//             displayName: userData.displayName,
//             email: userData.email,
//             role: userRole,
//             isActive: true,
//             lastLogin: Date.now(),
//             loginTime: Date.now(),
//           });
//         } else {
//           console.log("Updating existing user entry");
//           update(userRef, {
//             uid: userData.uid,
//             displayName: userData.displayName,
//             email: userData.email,
//             role: userRole,
//             isActive: true,
//             lastLogin: snapshot.val().lastLogin || Date.now(),
//             loginTime: Date.now(),
//           });
//         }

//         const extendedUser = {
//           ...userData,
//           role: userRole,
//         };
//         setUser(extendedUser);

//         onDisconnect(userRef).update({
//           isActive: false,
//           loginTime: null,
//         });
//       } else {
//         setUser(null);
//       }
//     };

//     const unsubscribe = auth.onAuthStateChanged(handleUserStatus);

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return user;
// }
