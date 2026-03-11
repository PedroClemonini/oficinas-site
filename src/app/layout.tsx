import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers"

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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `
        }} />
      </head>
      <body className={`${poppins.variable} antialiased`}>
       <Providers>
          <Header />
          </Providers>
        {children}
        <Footer />
      </body>
    </html>
  );
}
