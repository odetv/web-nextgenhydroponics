import { useEffect, useState } from "react";
import { Tanaman } from "../models/types";
import {
  getTanamanData,
  addNewTanaman,
  deleteTanaman,
  editTanaman,
  monitorDatabase,
} from "../services/tanamanService";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";

const formatDateForInput = (date: Date | null) => {
  if (!date) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatDateForDisplay = (dateString: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}-${pad(
    date.getMonth() + 1
  )}-${date.getFullYear()} ${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())} WITA`;
};

const ListTanaman = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [tanaman, setTanaman] = useState<Tanaman | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [namaBaru, setNamaBaru] = useState("");
  const [tanggalPanenBaru, setTanggalPanenBaru] = useState(""); // State untuk tanggal panen baru

  const [editedNama, setEditedNama] = useState("");
  const [editedStatus, setEditedStatus] = useState({
    panen: false,
    semai: false,
    tumbuh: false,
  });
  const [editedTanggalTanam, setEditedTanggalTanam] = useState("");
  const [editedTanggalPanen, setEditedTanggalPanen] = useState("");

  const [selectedTanaman, setSelectedTanaman] = useState<string | null>(null);

  const fetchTanaman = async () => {
    setLoading(true);
    try {
      const data = await getTanamanData();
      setTanaman(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewTanaman = async () => {
    await addNewTanaman(namaBaru, tanggalPanenBaru);
    await fetchTanaman();
    setNamaBaru("");
    setTanggalPanenBaru("");
  };

  useEffect(() => {
    monitorDatabase();
    fetchTanaman();
  }, []);

  const handleDelete = async (nama: string) => {
    try {
      await deleteTanaman(nama);
      await fetchTanaman();
      onClose();
    } catch (error) {
      console.error(`Error deleting ${nama}: `, error);
    }
  };

  const handleEdit = (nama: string) => {
    const selectedStatus = tanaman?.status_pertumbuhan[nama] || {
      panen: false,
      semai: false,
      tumbuh: false,
    };
    const selectedTanggalTanam = tanaman?.tanggal_tanam[nama] || "";
    const selectedTanggalPanen = tanaman?.tanggal_panen[nama] || "";

    setEditedNama(nama);
    setEditedStatus(selectedStatus);
    setEditedTanggalTanam(selectedTanggalTanam);
    setEditedTanggalPanen(selectedTanggalPanen);

    setSelectedTanaman(nama);
    onOpen(); // Buka modal setelah state diperbarui
  };

  const handleUpdate = async () => {
    try {
      if (selectedTanaman) {
        await editTanaman(selectedTanaman, {
          ...editedStatus,
          tanggal_tanam: editedTanggalTanam,
          tanggal_panen: editedTanggalPanen,
        });
        await fetchTanaman();
        setSelectedTanaman(null);
        setEditedNama("");
        onClose();
      }
    } catch (error) {
      console.error("Kesalahan saat memperbarui tanaman: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!tanaman) return <p>No data available</p>;

  const getStatusPertumbuhan = (status: Record<string, boolean>) => {
    return Object.keys(status).find((key) => status[key] === true) || null;
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-1 gap-4 w-full">
        {Object.keys(tanaman.nama_tanaman).map((nama) => (
          <div
            key={nama}
            className="bg-slate-200 w-full p-4 rounded-lg relative"
          >
            <div>
              <p className="text-center font-semibold text-lg pb-4">
                Pertumbuhan Tanaman {nama || null}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="capitalize w-full">
                <Table hideHeader aria-label="table" radius="sm">
                  <TableHeader>
                    <TableColumn className="py-0 px-0">Data</TableColumn>
                    <TableColumn className="py-0 px-0">Space</TableColumn>
                    <TableColumn className="py-0 px-0">Value</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Status Tanaman</TableCell>
                      <TableCell className="py-0 px-0">: </TableCell>
                      <TableCell>
                        {getStatusPertumbuhan(tanaman.status_pertumbuhan[nama])}
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Tanggal Tanam</TableCell>
                      <TableCell className="py-0 px-0">:</TableCell>
                      <TableCell>
                        {formatDateForDisplay(
                          tanaman.tanggal_tanam[nama] || null
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Tanggal Panen</TableCell>
                      <TableCell className="py-0 px-0">:</TableCell>
                      <TableCell>
                        {formatDateForDisplay(
                          tanaman.tanggal_panen[nama] || null
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>Usia Tanaman</TableCell>
                      <TableCell className="py-0 px-0">:</TableCell>
                      <TableCell>
                        {tanaman.usia_tanaman[nama] || null} Hari
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>Estimasi Panen</TableCell>
                      <TableCell className="py-0 px-0">:</TableCell>
                      <TableCell>
                        {tanaman.estimasi_panen[nama] || null} Hari
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="absolute bottom-6 right-6">
                <Button
                  onPress={() => handleEdit(nama)}
                  size="sm"
                  color="success"
                  variant="flat"
                  className="p-2 min-w-8 h-8"
                >
                  <TuneIcon />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pengaturan Tanaman {selectedTanaman}
              </ModalHeader>
              <ModalBody>
                {selectedTanaman && (
                  <div className="flex flex-col gap-2 justify-start ">
                    <Table hideHeader aria-label="table" radius="sm">
                      <TableHeader>
                        <TableColumn className="py-0 px-0">Data</TableColumn>
                        <TableColumn>Space</TableColumn>
                        <TableColumn className="py-0 px-0">Value</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell className="py-0 px-0">
                            Tanggal Tanam
                          </TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <input
                              className="bg-emerald-100 rounded-lg p-2 ml-2 cursor-pointer uppercase"
                              type="datetime-local"
                              value={formatDateForInput(
                                new Date(editedTanggalTanam)
                              )}
                              onChange={(e) =>
                                setEditedTanggalTanam(e.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell className="py-0 px-0">
                            Tanggal Panen
                          </TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <input
                              className="bg-emerald-100 rounded-lg p-2 ml-2 cursor-pointer uppercase"
                              type="datetime-local"
                              value={formatDateForInput(
                                new Date(editedTanggalPanen)
                              )}
                              onChange={(e) =>
                                setEditedTanggalPanen(e.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow key="3">
                          <TableCell className="py-0 px-0">
                            Status Tanaman
                          </TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <select
                              className="bg-emerald-100 rounded-lg p-2 ml-2"
                              value={getStatusPertumbuhan(editedStatus) || ""}
                              onChange={(e) =>
                                setEditedStatus({
                                  panen: e.target.value === "panen",
                                  semai: e.target.value === "semai",
                                  tumbuh: e.target.value === "tumbuh",
                                })
                              }
                            >
                              <option className="bg-white" value="panen">
                                Panen
                              </option>
                              <option className="bg-white" value="semai">
                                Semai
                              </option>
                              <option className="bg-white" value="tumbuh">
                                Tumbuh
                              </option>
                            </select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button onClick={handleUpdate} color="success" variant="flat">
                  Perbarui
                </Button>
                <Button
                  onClick={() => handleDelete(selectedTanaman!)}
                  color="danger"
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListTanaman;