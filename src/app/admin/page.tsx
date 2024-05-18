"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";
import { database } from "../../../firebaseConfig";
import { ref, onValue } from "firebase/database";
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

export default function Admin() {
  const user = useAuth();
  const [activeUsers, setActiveUsers] = useState<
    { uid: string; displayName: string; email: string }[]
  >([]);

  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val() || {};
      const activeUsersList = Object.values(usersData).filter(
        (user: any) => user.isActive
      ) as { uid: string; displayName: string; email: string }[];
      setActiveUsers(activeUsersList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(activeUsers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return activeUsers.slice(start, end);
  }, [page, activeUsers]);

  return (
    <main className="-mt-12 flex flex-col justify-center min-h-screen gap-3 p-4">
      {user ? (
        <>
          <p className="text-center text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
            Selamat datang di Admin Panel, {user.displayName}👋
          </p>
          <div className="flex flex-col justify-center items-center gap-2">
            <Table
              aria-label="Daftar Pengguna Aktif"
              radius="none"
              topContent="Daftar Pengguna Aktif:"
              color="default"
              className="w-full sm:w-10/12 overflow-auto text-sm outline outline-2 outline-emerald-200 rounded-lg"
            >
              <TableHeader>
                <TableColumn>NO</TableColumn>
                <TableColumn>NAMA</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Tidak ada pengguna aktif."}>
                {items.map((activeUser, index) => (
                  <TableRow key={activeUser.uid}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{activeUser.displayName}</TableCell>
                    <TableCell>{activeUser.email}</TableCell>
                    <TableCell>
                      {user?.uid === activeUser.uid ? "Saya" : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* <div className="flex w-full justify-center mt-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div> */}
          </div>
        </>
      ) : (
        <Typography className="text-center">
          Anda tidak memiliki akses!
        </Typography>
      )}
    </main>
  );
}
