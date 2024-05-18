import FeaturesImage from "../assets/images/components/features.png";
import {
  Button,
  Card,
  CardFooter,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

const Feature1 =
  "Pada hidroponik ini menerapkan sistem IoT sebagai kontrol monitoring dari beberapa sensor atau modul menggunakan ESP32. Dan implementasi AI untuk deteksi hama pada tanaman menggunakan ESP32-CAM yang terpisah tetapi tetap parrent atau induk nya ada pada ESP32.";
const Feature2 =
  "Sistem pengairan otomatis pada hidroponik menggunakan pompa air yang akan diatur kondisi mengalir atau tidaknya tergantung dengan kondisi suhu air dan juga interval waktu idealnya air mengalir pada sistem DFT.";
const Feature3 =
  "Melihat dan mengontrol kondisi suhu air di sistem hidroponik. Jika suhu pada air terlalu panas, maka secara otomatis pompa air irigasi hidroponik akan dihidupkan untuk memutar air dengan tujuan agar dapat mengurangi panas air yang ada pada pipa hidroponik.";
const Feature4 =
  "Melihat dan mengontrol nutrisi pada hidroponik yang diukur melalui sensor TDS pada tandon air pencampuran hidroponik secara otomatis (Jika nilai saat ini kurang dari nilai yang telah di tetapkan, maka akan disesuaikan secara otomatis menggunakan bantuan dosing pump untuk aliran larutan nutrisi ke box pencampuran agar dapat mencapai angka yang telah ditetapkan).";
const Feature5 =
  "Melihat dan mengontrol kondisi pH air pada hidroponik yang diukur melalui sensor pH pada tandon air pencampuran hidroponik secara otomatis (Jika nilai saat ini kurang dari nilai yang telah di tetapkan, maka akan disesuaikan secara otomatis menggunakan bantuan dosing pump untuk aliran larutan ke box pencampuran agar dapat mencapai angka yang telah ditetapkan).";
const Feature6 =
  "Membuat sistem penerangan pada tanaman secara otomatis jika kondisi gelap atau kurang cahaya dan pada saat malam hari yang gelap, sehingga tanaman akan tetap mendapat penyinaran yang tercukupi.";
const Feature7 =
  "Mendeteksi hama ulat yang terdapat pada tanaman dan dapat di kontrol menggunakan AI. Jika terdapat hama yang terdeteksi maka akan ada aksi penyemprotan pestisida organik pada tanaman dengan tujuan dapat mengusir dan mematikan hama tersebut. Selain itu, pada aplikasi mobile dan web juga akan ada notifikasi bahwa ada hama yang mengganggu tanaman.";
const Feature8 =
  "Mengolah semua data yang dihasilkan dari input/output sensor atau modul yang digunakan untuk disimpan didalam database dan menjadi pusat data untuk kebutuhan pengaplikasian di beberapa platform seperti aplikasi web dan mobile.";
const Feature9 =
  "Menghasilkan aplikasi website dan mobile yang dapat diakses oleh semua pengguna baik yang terdaftar pada sistem maupun sebagai guest atau hanya pengunjung. Rencana kedepannya yaitu pengguna guest hanya dapat memonitoring saja. Untuk pengguna yang telah terdaftar atau sudah memiliki akun maka dapat melakukan monitoring dan kontrol terhadap sistem. Hal ini kami lakukan untuk menjaga keamanan dan terbentuknya sistem yang aman kedepannya.";

export default function Features() {
  return (
    <div>
      <div className="pt-16 p-4 sm:grid flex flex-col-reverse gap-8 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <Card isFooterBlurred radius="lg" className="border-none">
          <div className="relative overflow-hidden rounded-inherit rounded-large">
            <Image
              className="transform hover:scale-110 transition-transform-opacity object-cover pt-4 pb-10"
              alt="Next-Gen Hydroponics"
              src={FeaturesImage.src}
              width={800}
              height={400}
            />
          </div>
          <CardFooter className="justify-center bg-emerald-500/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-black/80 p-2 text-center">
              Penerapan Teknologi Bidang Pertanian
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div>
            <p className="font-bold text-center text-emerald-600">
              Produk Unggulan
            </p>
          </div>
          <div>
            <p className="font-bold text-3xl text-center">
              Pertanian Canggih Tanpa Batas
            </p>
          </div>
          <div>
            <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              Bertani Tanpa Takut Kotor dengan Next-Gen Hydroponics
            </p>
          </div>
          <div className="mt-2 sm:w-full w-11/12 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6 text-sm bg-emerald-50 rounded-lg">
            <Accordion isCompact>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Terintegrasi Sistem IoT & AI ESP32"
              >
                {Feature1}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Sistem Irigasi Otomatis"
              >
                {Feature2}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Monitoring & Kontrol Suhu Air"
              >
                {Feature3}
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Accordion 4"
                title="Monitoring & Kontrol Nutrisi"
              >
                {Feature4}
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="Accordion 5"
                title="Monitoring & Kontrol pH Air"
              >
                {Feature5}
              </AccordionItem>
              <AccordionItem
                key="6"
                aria-label="Accordion 6"
                title="Grow Light LED Otomatis"
              >
                {Feature6}
              </AccordionItem>
              <AccordionItem
                key="7"
                aria-label="Accordion 7"
                title="Monitoring & Kontrol Hama"
              >
                {Feature7}
              </AccordionItem>
              <AccordionItem
                key="8"
                aria-label="Accordion 8"
                title="Realtime Database"
              >
                {Feature8}
              </AccordionItem>
              <AccordionItem
                key="9"
                aria-label="Accordion 9"
                title="Aplikasi Web & Mobile"
              >
                {Feature9}
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
