import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../styles/globals.css";
import Providers from "../components/Providers";
import Navbar from "@/components/Navbar";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Muzer",
  description: "a powerful music streaming app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-slate-900 bg-white antialiased">
      <body className="bg-gradient-to-r from-gray-100 to-fuchsia-50 antialiased min-h-screen pt-16">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
