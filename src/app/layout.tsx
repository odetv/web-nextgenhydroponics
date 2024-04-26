import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Maintenance from "../components/Maintenance";
import { maintenanceMode } from "../config/config";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <Maintenance />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
