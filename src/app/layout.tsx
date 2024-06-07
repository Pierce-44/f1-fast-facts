import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SideBar from "../components/sideBar";

const inter = Plus_Jakarta_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F1 Fast Facts",
  description: "F1 Fast Facts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <link rel="icon" href="/ufo.png" sizes="any" />
      <body className={`${inter.className} h-full`}>
        <SideBar />
        {children}
      </body>
    </html>
  );
}
