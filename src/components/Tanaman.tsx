import { useEffect, useState } from "react";
import { Tanaman } from "../models/types";
import {
  getTanamanData,
  addNewTanaman,
  deleteTanaman,
  editTanaman,
  monitorDatabase,
} from "../services/tanamanService";

const TanamanList = () => {
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
    } catch (error) {
      console.error(`Error deleting ${nama}: `, error);
    }
  };

  const handleEdit = (nama: string) => {
    setEditedNama(nama);
    const selectedStatus = tanaman?.status_pertumbuhan[nama] || {
      panen: false,
      semai: false,
      tumbuh: false,
    };
    const selectedTanggalTanam = tanaman?.tanggal_tanam[nama] || "";
    const selectedTanggalPanen = tanaman?.tanggal_panen[nama] || "";

    setEditedStatus(selectedStatus);
    setEditedTanggalTanam(selectedTanggalTanam);
    setEditedTanggalPanen(selectedTanggalPanen);
  };

  const handleUpdate = async () => {
    try {
      await editTanaman(editedNama, {
        ...editedStatus,
        tanggal_tanam: editedTanggalTanam,
        tanggal_panen: editedTanggalPanen,
      });
      await fetchTanaman();
      setEditedNama("");
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
      <div>
        {Object.keys(tanaman.nama_tanaman).map((nama) => (
          <div key={nama} className="tanaman-card mb-4">
            <h3>{nama || null}</h3>
            <p>
              Status Pertumbuhan:{" "}
              {getStatusPertumbuhan(tanaman.status_pertumbuhan[nama])}
            </p>
            <p>Tanggal Tanam: {tanaman.tanggal_tanam[nama] || null}</p>
            <p>Tanggal Panen: {tanaman.tanggal_panen[nama] || null}</p>
            <p>Usia Tanaman: {tanaman.usia_tanaman[nama] || null}</p>
            <p>Estimasi Panen: {tanaman.estimasi_panen[nama] || null}</p>
            <button onClick={() => handleDelete(nama)}>Delete</button>
            <button onClick={() => handleEdit(nama)}>Edit</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={namaBaru}
          onChange={(e) => setNamaBaru(e.target.value)}
          placeholder="Nama Tanaman Baru"
        />
        <input
          type="datetime-local"
          value={tanggalPanenBaru}
          onChange={(e) => setTanggalPanenBaru(e.target.value)}
          placeholder="Tanggal Panen Tanaman Baru"
        />
        <button onClick={handleAddNewTanaman}>Add Tanaman</button>
      </div>

      {editedNama && (
        <div>
          <h3>Edit {editedNama}</h3>
          <div>
            <label>
              Tanggal Tanam:
              <input
                type="datetime-local"
                value={editedTanggalTanam}
                onChange={(e) => setEditedTanggalTanam(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Tanggal Panen:
              <input
                type="datetime-local"
                value={editedTanggalPanen}
                onChange={(e) => setEditedTanggalPanen(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Status Pertumbuhan:
              <select
                value={getStatusPertumbuhan(editedStatus) || ""}
                onChange={(e) =>
                  setEditedStatus({
                    panen: e.target.value === "panen",
                    semai: e.target.value === "semai",
                    tumbuh: e.target.value === "tumbuh",
                  })
                }
              >
                <option value="panen">Panen</option>
                <option value="semai">Semai</option>
                <option value="tumbuh">Tumbuh</option>
              </select>
            </label>
          </div>
          <button onClick={handleUpdate}>Update Tanaman</button>
        </div>
      )}
    </>
  );
};

export default TanamanList;
