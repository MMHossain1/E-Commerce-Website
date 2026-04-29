import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat, { AIChatButton } from "@/components/ai/AIChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TECHCORE — High-Performance Tech",
  description: "Pioneering high-end computing solutions for the modern professional.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans antialiased text-on-background bg-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIChat />
        <AIChatButton />
      </body>
    </html>
  );
}
