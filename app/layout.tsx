// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Fraunces } from "next/font/google";

const brand = Fraunces({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-brand", // exposes CSS var we’ll use in CSS
});

export const metadata: Metadata = {
  title: "ViaDan Travel",
  description: "Dream it. Plan it. Live it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${brand.variable} bg-cream text-navy antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
