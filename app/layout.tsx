import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R3F Solar System",
  description: "Interactive 3D Solar System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
