import { getDatabase, ref, get, update, set, onValue } from "firebase/database";
import { Tanaman } from "../models/types";
import { database } from "../../firebaseConfig";

const calculateUsiaTanaman = (tanggalTanam: string): string => {
  const tanamDate = new Date(tanggalTanam);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - tanamDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays.toString();
};

const calculateEstimasiPanen = (
  tanggalTanam: string,
  tanggalPanen: string
): string => {
  const tanamDate = new Date(tanggalTanam);
  const panenDate = new Date(tanggalPanen);
  const now = new Date();
  const diffTime = panenDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays.toString() : "0";
};

const getTanamanData = async (): Promise<Tanaman> => {
  const tanamanRef = ref(database, "settings/tanaman");
  const snapshot = await get(tanamanRef);
  if (snapshot.exists()) {
    return snapshot.val() as Tanaman;
  }
  throw new Error("No data available");
};

const updateTanamanData = async (newData: Partial<Tanaman>) => {
  const tanamanRef = ref(database, "settings/tanaman");
  await update(tanamanRef, newData);
};

const addNewTanaman = async (namaBaru: string, tanggalPanenBaru: string) => {
  try {
    const tanaman = await getTanamanData();
    tanaman.nama_tanaman[namaBaru] = true;
    tanaman.status_pertumbuhan[namaBaru] = {
      panen: false,
      semai: false,
      tumbuh: false,
    };
    tanaman.tanggal_panen[namaBaru] = tanggalPanenBaru;
    const tanggalTanam = new Date().toISOString();
    tanaman.tanggal_tanam[namaBaru] = tanggalTanam;
    tanaman.usia_tanaman[namaBaru] = calculateUsiaTanaman(tanggalTanam);
    tanaman.estimasi_panen[namaBaru] = calculateEstimasiPanen(
      tanggalTanam,
      tanggalPanenBaru
    );
    await updateTanamanData(tanaman);
  } catch (error) {
    console.error("Error adding new plant: ", error);
  }
};

const deleteTanaman = async (namaTanaman: string) => {
  const tanamanRef = ref(database, `settings/tanaman`);
  const snapshot = await get(tanamanRef);
  if (snapshot.exists()) {
    const data = snapshot.val() as Tanaman;
    delete data.nama_tanaman[namaTanaman];
    delete data.status_pertumbuhan[namaTanaman];
    delete data.tanggal_panen[namaTanaman];
    delete data.tanggal_tanam[namaTanaman];
    delete data.usia_tanaman[namaTanaman];
    delete data.estimasi_panen[namaTanaman];
    await updateTanamanData(data);
  } else {
    throw new Error("Tanaman not found");
  }
};

const editTanaman = async (
  namaTanaman: string,
  updatedData: Partial<
    Tanaman["status_pertumbuhan"][string] & {
      tanggal_panen?: string;
      tanggal_tanam?: string;
      usia_tanaman?: string;
    }
  >
) => {
  try {
    const tanaman = await getTanamanData();
    tanaman.status_pertumbuhan[namaTanaman] = {
      ...tanaman.status_pertumbuhan[namaTanaman],
      ...updatedData,
    };
    if (updatedData.tanggal_panen !== undefined) {
      tanaman.tanggal_panen[namaTanaman] = updatedData.tanggal_panen;
    }
    if (updatedData.tanggal_tanam !== undefined) {
      const tanggalTanam = updatedData.tanggal_tanam;
      tanaman.tanggal_tanam[namaTanaman] = tanggalTanam;
      tanaman.usia_tanaman[namaTanaman] = calculateUsiaTanaman(tanggalTanam);
      tanaman.estimasi_panen[namaTanaman] = calculateEstimasiPanen(
        tanggalTanam,
        updatedData.tanggal_panen || tanaman.tanggal_panen[namaTanaman]
      );
    }
    await updateTanamanData(tanaman);
  } catch (error) {
    console.error(`Error editing plant ${namaTanaman}: `, error);
  }
};

const addDefaultDataIfEmpty = async () => {
  const tanamanRef = ref(database, "settings/tanaman");
  const snapshot = await get(tanamanRef);
  if (!snapshot.exists()) {
    const defaultData: Tanaman = {
      nama_tanaman: {},
      status_pertumbuhan: {},
      tanggal_panen: {},
      tanggal_tanam: {},
      usia_tanaman: {},
      estimasi_panen: {},
    };
    // Add first default plant example
    const defaultPlantName1 = "Cabai";
    const defaultPanenDate1 = new Date();
    defaultPanenDate1.setDate(defaultPanenDate1.getDate() + 90);
    defaultData.nama_tanaman[defaultPlantName1] = true;
    defaultData.status_pertumbuhan[defaultPlantName1] = {
      semai: true,
      tumbuh: false,
      panen: false,
    };
    defaultData.tanggal_panen[defaultPlantName1] =
      defaultPanenDate1.toISOString();
    const tanggalTanam1 = new Date().toISOString();
    defaultData.tanggal_tanam[defaultPlantName1] = tanggalTanam1;
    defaultData.usia_tanaman[defaultPlantName1] =
      calculateUsiaTanaman(tanggalTanam1);
    defaultData.estimasi_panen[defaultPlantName1] = calculateEstimasiPanen(
      tanggalTanam1,
      defaultData.tanggal_panen[defaultPlantName1]
    );

    // Add second default plant example
    const defaultPlantName2 = "Selada";
    const defaultPanenDate2 = new Date();
    defaultPanenDate2.setDate(defaultPanenDate2.getDate() + 60);
    defaultData.nama_tanaman[defaultPlantName2] = true;
    defaultData.status_pertumbuhan[defaultPlantName2] = {
      semai: true,
      tumbuh: false,
      panen: false,
    };
    defaultData.tanggal_panen[defaultPlantName2] =
      defaultPanenDate2.toISOString();
    const tanggalTanam2 = new Date().toISOString();
    defaultData.tanggal_tanam[defaultPlantName2] = tanggalTanam2;
    defaultData.usia_tanaman[defaultPlantName2] =
      calculateUsiaTanaman(tanggalTanam2);
    defaultData.estimasi_panen[defaultPlantName2] = calculateEstimasiPanen(
      tanggalTanam2,
      defaultData.tanggal_panen[defaultPlantName2]
    );

    await set(tanamanRef, defaultData);
  }
};

const monitorDatabase = () => {
  const tanamanRef = ref(database, "settings/tanaman");
  onValue(tanamanRef, async (snapshot) => {
    if (!snapshot.exists()) {
      await addDefaultDataIfEmpty();
    }
  });
};

const scheduleDailyUpdate = () => {
  const now = new Date();
  const msUntilMidnight =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    ).getTime() - now.getTime();
  setTimeout(() => {
    performDailyUpdate();
    setInterval(performDailyUpdate, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
};

const performDailyUpdate = async () => {
  try {
    const tanaman = await getTanamanData();
    const now = new Date();
    for (const namaTanaman in tanaman.nama_tanaman) {
      const tanggalTanam = tanaman.tanggal_tanam[namaTanaman];
      const tanggalPanen = tanaman.tanggal_panen[namaTanaman];
      tanaman.usia_tanaman[namaTanaman] = calculateUsiaTanaman(tanggalTanam);
      tanaman.estimasi_panen[namaTanaman] = calculateEstimasiPanen(
        tanggalTanam,
        tanggalPanen
      );
    }
    await updateTanamanData(tanaman);
  } catch (error) {
    console.error("Error updating daily plant data: ", error);
  }
};

monitorDatabase();
scheduleDailyUpdate();

export {
  getTanamanData,
  updateTanamanData,
  addNewTanaman,
  deleteTanaman,
  editTanaman,
  addDefaultDataIfEmpty,
  monitorDatabase,
  scheduleDailyUpdate,
};
