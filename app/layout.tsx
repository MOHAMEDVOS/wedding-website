import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { LanguageProvider } from "@/components/providers/language-context";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import FloatingNote from "@/components/ui/FloatingNote";
import StarField from "@/components/ui/StarField";
import LanguageToggle from "@/components/ui/LanguageToggle";

const milchella = localFont({
  src: "../public/Milchella-Regular.ttf",
  variable: "--font-milchella",
  display: "swap",
});

const scripalt = localFont({
  src: "../public/SCRIPALT.ttf",
  variable: "--font-scripalt",
  display: "swap",
});

const greatVictorian = localFont({
  src: "../public/great-victorian.standard.otf",
  variable: "--font-great-victorian",
  display: "swap",
});

// Alias other variables to milchella to ensure global coverage
const cormorant = { variable: milchella.variable };
const inter = { variable: milchella.variable };
const pinyon = { variable: milchella.variable };

import { Amiri } from "next/font/google"; // Import Arabic font

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Ibrahim & Aya Samir | Wedding Invitation",
  description: "Join us in celebrating our wedding day. June 15, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning className="lenis">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          milchella.variable,
          scripalt.variable,
          greatVictorian.variable,
          amiri.variable
        )}
      >
        <LanguageProvider>
          <SmoothScroll>
            <StarField />
            <CustomCursor />
            <Noise />
            <LanguageToggle />
            {children}
            <FloatingNote />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
