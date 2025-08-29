import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/sessionWrapper/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "quickLinks: Everything you are, in one simple link | Quicklinks",
  description:
    "Generated your link pages within minutes and share across your all social media plateforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   bg-white  h-screen  `}
      >
        <SessionWrapper>
          <Navbar />

          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
