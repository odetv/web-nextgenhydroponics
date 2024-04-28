import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Maintenance from "../components/Maintenance";
import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  if (process.env.MAINTENANCE_MODE === "true") {
    return (
      <html lang="en">
        <body className={poppins.className}>
          <Providers>
            <Header />
            <Maintenance />
            <Footer />
          </Providers>
        </body>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
      </html>
    );
  } else
    return (
      <html lang="en">
        <body className={poppins.className}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </body>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
      </html>
    );
}
