import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import SessionWrapper from "@/components/Pages/sessionWrapper/page";
import CopyUrlButton from "@/components/CopyUrlButton";
import ReportIssue from "@/components/ReportIssue";
import ToastWrapper from "@/components/pages/ToastWrapper/ToastWrapper.tsx";


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

export default async function RootLayout({ children }) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   bg-white  min-h-screen   text-black      `}
      >
        <SessionWrapper>
          <Navbar />
          <CopyUrlButton />
          {/* <ReportIssue /> */}

          <ToastWrapper>

            {children}
          </ToastWrapper>

        </SessionWrapper>

        {/* scripts */}
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
