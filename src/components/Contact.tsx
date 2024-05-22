import { Button, Skeleton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Input, Textarea } from "@nextui-org/react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

export default function Hero() {
  const form = useRef<HTMLFormElement | null>(null);
  const notifySuccess = () => {
    toast.success("Pesan Berhasil Terkirim 👌", { autoClose: 5000 });
  };

  const notifyError = () => {
    toast.error("Gagal Mengirim Pesan 😔", { autoClose: 5000 });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      try {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_VERCEL_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_VERCEL_EMAILJS_TEMPLATE_ID || "",
          form.current,
          process.env.NEXT_PUBLIC_VERCEL_EMAILJS_API_KEY || ""
        );
        form.current.reset();
        notifySuccess();
      } catch (error) {
        notifyError();
      }
    }
  };

  return (
    <div>
      <div className="pt-16 p-4 grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center items-center max-w-screen-xl">
            <div>
              <p className="font-bold text-center text-emerald-600">Kontak</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-center">
                Informasi Lainnya? Hubungi Kami
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2">
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/nextgen.hydroponics"
                target="_blank"
                title="Instagram"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <Button
                  className="lowercase text-xs sm:text-sm"
                  variant="outlined"
                  color="info"
                  startIcon={<InstagramIcon />}
                >
                  @nextgen.hydroponics
                </Button>
              </a>
              <a
                rel="noopener noreferrer"
                href="mailto:research.nextgenhydroponics@gmail.com"
                target="_blank"
                title="Email"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <Button
                  className="lowercase text-xs sm:text-sm"
                  variant="outlined"
                  color="info"
                  startIcon={<MailOutlineIcon />}
                >
                  research.nextgenhydroponics@gmail.com
                </Button>
              </a>
            </div>
            <div>
              <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base pt-2 pb-2">
                Atau Anda dapat mengisi form di bawah ini.
              </p>
            </div>
            <div className="w-full rounded-lg sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5">
              <form
                className="flex flex-col gap-2"
                ref={form}
                onSubmit={sendEmail}
              >
                <Input
                  isRequired
                  variant="bordered"
                  type="text"
                  label="Nama"
                  id="name"
                  name="user_name"
                />
                <Input
                  isRequired
                  variant="bordered"
                  type="email"
                  label="Email"
                  id="email"
                  name="user_email"
                />
                <Textarea
                  isRequired
                  label="Pesan"
                  variant="bordered"
                  classNames={{
                    input: "resize-y min-h-[64px]",
                  }}
                  id="message"
                  name="message"
                />
                <Button
                  type="submit"
                  color="info"
                  variant="contained"
                  className="rounded-lg shadow-none hover:shadow-none"
                >
                  Kirim
                </Button>
              </form>
              <ToastContainer autoClose={5000} />
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6861692693933!2d115.13055157575472!3d-8.133397481429773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd190539001eaff%3A0xadc50e266a228048!2sUniversitas%20Pendidikan%20Ganesha%20Kampus%20Jinengdalem!5e0!3m2!1sid!2sid!4v1716293819191!5m2!1sid!2sid"
          width="100%"
          height="100%"
          title="map"
          className="rounded-lg"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
