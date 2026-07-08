import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import SessionWrapper from "@/components/util/sessionWrapper/page";
import CopyUrlButton from "@/components/util/CopyUrlButton";
import ReportIssue from "@/components/util/ReportIssue";
import ToastWrapper from "@/components/util/ToastWrapper/ToastWrapper";
import Navbar from "@/components/util/Navbar/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create a Portfolio Website in Minutes | QuickLinks",

  description:
    "Build and share your personal portfolio website without coding. Perfect for students, developers, and professionals.",
    
  verification: {
    google: "7y6fVBMy6SEz6cnep0tFse0DEpaPr8XHk9cVc8ff5j8",
  },

  keywords: [
    "portfolio builder",
    "portfolio website",
    "developer portfolio",
    "student portfolio",
    "portfolio generator",
    "personal website",
    "online portfolio",
    "resume portfolio",
  ],

  applicationName: "QuickLinks",

  authors: [{ name: "Prathmesh Rai" }],

  creator: "Prathmesh Rai",

  metadataBase: new URL("https://quick-links-three.vercel.app"),

  openGraph: {
    title: "Create a Portfolio Website in Minutes | QuickLinks",
    description:
      "Build and share your personal portfolio website without coding.",
    url: "https://quick-links-three.vercel.app",
    siteName: "QuickLinks",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Create a Portfolio Website in Minutes | QuickLinks",
    description:
      "Build and share your personal portfolio website without coding.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen   text-black      `}
      >
        <SessionWrapper>
          <Navbar/>
          
          <CopyUrlButton />
          {/* <ReportIssue /> */}

          <ToastWrapper>{children}</ToastWrapper>
        </SessionWrapper>

        {/* scripts */}
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
