import { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

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

  return user;
}

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
