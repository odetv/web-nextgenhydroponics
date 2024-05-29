export interface Tanaman {
  nama_tanaman: Record<string, boolean>;
  tanggal_tanam: Record<string, string>;
  tanggal_panen: Record<string, string>;
  status_pertumbuhan: Record<
    string,
    {
      panen: boolean;
      semai: boolean;
      tumbuh: boolean;
    }
  >;
  usia_tanaman: Record<string, string>;
  estimasi_panen: Record<string, string>;
}

export interface User {}
