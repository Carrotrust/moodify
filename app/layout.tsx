import type { Metadata } from "next";
import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/authContext";
import Head from "./Head";
import Logout from "@/components/Logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodify",
  description: "track daily moods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="flex p-4 md:p-8 items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={`text-2xl md:text-4xl bg-gradient-to-r from-purple-500 to-violet-400  bg-clip-text text-transparent
          ${fugaz.className}`}
        >
          Moodify
        </h1>
      </Link>
      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-8 flex items-center justify-center">
      <p className={`text-indigo-400 ${fugaz.className}`}>
        Created by The Carrot
      </p>
    </footer>
  );
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={` ' w-full text-slate-800  text-sm sm:text-base min-h-screen flex flex-col '  ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
