import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SideBar from "../components/sideBar";
import UpperBar from "@/components/upperBar";
import { Providers } from "@/components/providers";

const inter = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
      <link rel="icon" href="/ufo.webp" sizes="any" />
      <Providers>
        <body className={`${inter.className} h-full flex`}>
          <SideBar />
          <div className="w-full h-full">
            <UpperBar />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
