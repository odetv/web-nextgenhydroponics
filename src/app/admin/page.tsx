"use client";
import * as React from "react";
import { Select, MenuItem } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";
import { database } from "../../../firebaseConfig";
import { ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import AlertLoginGuest from "@/components/AlertLoginGuest";
import AlertCheckAuth from "@/components/AlertCheckAuth";
import AlertAuthorizedAdmin from "@/components/AlertAuthorizedAdmin";

export default function Admin() {
  const user = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setIsAuthorized(true);
      }
      setIsCheckingAuth(false);
    } else {
      setIsCheckingAuth(false);
    }
  }, [user]);

  const handleChangeRole = (userId: any, newRole: unknown) => {
    const userRef = ref(database, `users/${userId}/role`);
    set(userRef, newRole);
  };

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

  const [pageListUser, setPageListUser] = useState(1);
  const rowsPerPageListUser = 5;
  const pagesListUser = Math.ceil(users.length / rowsPerPageListUser);
  const paginatedListUser = React.useMemo(() => {
    const start = (pageListUser - 1) * rowsPerPageListUser;
    const end = start + rowsPerPageListUser;
    return users.slice(start, end);
  }, [pageListUser, users]);

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

  const calculateActiveDuration = (loginTime: number) => {
    if (!loginTime) return "N/A";

    const duration = currentTime - loginTime;

    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours}j ${minutes}m ${seconds}d`;
  };

  if (isCheckingAuth) {
    return <AlertCheckAuth />;
  }

  if (!user) {
    return <AlertLoginGuest />;
  }

  if (!isAuthorized) {
    return <AlertAuthorizedAdmin />;
  }

  return (
    <main className="flex flex-col justify-center w-full min-h-screen gap-3 p-4">
      <>
        <p className="text-center text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
          Selamat datang di Admin Panel, {user.displayName}👋
        </p>
        <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-10/12 mx-auto text-sm outline outline-2 outline-emerald-200 rounded-lg mt-2">
          <Table
            aria-label="Daftar Pengguna Next-Gen Hydroponics"
            radius="none"
            topContent="Daftar Pengguna Next-Gen Hydroponics:"
            color="default"
            className="overflow-auto rounded-lg"
          >
            <TableHeader>
              <TableColumn>NO</TableColumn>
              <TableColumn>NAMA</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ROLE</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Tidak ada pengguna."}>
              {paginatedListUser.map((user, index) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    {(pageListUser - 1) * rowsPerPageListUser + index + 1}
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole(user.uid, e.target.value as string)
                      }
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="member">Member</MenuItem>
                      <MenuItem value="registered">Registered</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center mb-4">
            <Pagination
              isCompact
              size="sm"
              showControls
              color="success"
              variant="flat"
              page={pageListUser}
              total={pagesListUser}
              onChange={(pageListUser) => setPageListUser(pageListUser)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-10/12 mx-auto text-sm outline outline-2 outline-emerald-200 rounded-lg mt-2">
          <Table
            aria-label="Daftar Pengguna Aktif"
            radius="none"
            topContent="Daftar Pengguna Aktif:"
            color="default"
            className="overflow-auto rounded-lg"
          >
            <TableHeader>
              <TableColumn>NO</TableColumn>
              <TableColumn>NAMA</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>DURASI AKTIF</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Tidak ada pengguna aktif."}>
              {paginatedListUserActive.map((activeUser, index) => (
                <TableRow key={activeUser.uid}>
                  <TableCell>
                    {(pageListUserActive - 1) * rowsPerPageListUserActive +
                      index +
                      1}
                  </TableCell>
                  <TableCell>
                    {activeUser.displayName}
                    {user?.uid === activeUser.uid ? " (Saya)" : null}
                  </TableCell>
                  <TableCell>{activeUser.email}</TableCell>
                  <TableCell>
                    <p className="capitalize">{activeUser.role}</p>
                  </TableCell>
                  <TableCell>
                    {calculateActiveDuration(activeUser.loginTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center mb-4">
            <Pagination
              isCompact
              showControls
              color="success"
              variant="flat"
              size="sm"
              page={pageListUserActive}
              total={pagesListUserActive}
              onChange={(pageListUserActive) =>
                setPageListUserActive(pageListUserActive)
              }
            />
          </div>
        </div>
      </>
    </main>
  );
}
