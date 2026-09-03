import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentín Ruiz León — Desarrollador Web FullStack",
  description:
    "Portfolio de Valentín Ruiz León. Desarrollador FullStack con experiencia en React, Angular, Symfony, Node.js y más. Buscando nuevas oportunidades profesionales.",
  keywords: [
    "desarrollador web",
    "fullstack",
    "react",
    "angular",
    "portfolio",
    "Valentín Ruiz León",
  ],
  authors: [{ name: "Valentín Ruiz León" }],
  openGraph: {
    title: "Valentín Ruiz León — Desarrollador Web FullStack",
    description:
      "Portfolio profesional. React, Angular, Symfony, Node.js y más.",
    url: "https://portfolio-sigma-five-65.vercel.app",
    siteName: "Portfolio de Valentín",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentín Ruiz León — Desarrollador Web FullStack",
    description:
      "Portfolio profesional. React, Angular, Symfony, Node.js y más.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
