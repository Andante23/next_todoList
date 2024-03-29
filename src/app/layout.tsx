import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex text-3xl m-5 ">
          <Link href="/about" className="pr-4">
            About
          </Link>
          <Link href="/report" className="pr-4">
            Report
          </Link>
          <Link href="/todos-csr" className="pr-4">
            todos-csr
          </Link>
          <Link href="/todos-ssr">todos-ssr</Link>
        </nav>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
