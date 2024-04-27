import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Maintenance from "../components/Maintenance";
import { maintenanceMode } from "../config/config";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next-Gen Hydroponics",
  description:
    "Website Tim Next-Gen Hydroponics Program MBKM Riset Independen Smart Green Garden Dago Engineering FTK Undiksha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (maintenanceMode) {
    return (
      <html lang="en">
        <body className={poppins.className}>
          <Providers>
            <Maintenance />
          </Providers>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
