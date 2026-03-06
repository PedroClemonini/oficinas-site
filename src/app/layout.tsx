import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"
import Footer from "@/components/Footer";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Escolha os pesos que vai usar
  variable: "--font-poppins",           // Define a variável CSS
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
