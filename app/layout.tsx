import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollToTopOnRouteChange } from "@/components/providers/ScrollToTopOnRouteChange";
import { PlatformFloatingActions } from "@/components/ui/PlatformFloatingActions";
import { ToastProvider } from "@/components/ui/Toast";

import { DesignSystemHeader } from "./DesignSystemHeader";

import "./globals.css";
import "@/styles/animations.css";

const baseFont = localFont({
  src: [
    {
      path: "../public/fonts/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-standart",
  display: "swap",
  preload: false,
});

const uafFont = localFont({
  src: [
    {
      path: "../public/fonts/UAFSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/UAFSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/UAFSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-uaf",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Living Design System | ІКС ГІС МОУ",
  description:
    "Кодова дизайн-система GIS Portal: реальні компоненти, правила використання та адаптивні стани.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`${uafFont.variable} ${baseFont.variable}`}
    >
      <body>
        <ToastProvider>
          <SmoothScrollProvider>
            <ScrollToTopOnRouteChange />

            <DesignSystemHeader />
            {children}
            <PlatformFloatingActions />
            <Footer />
          </SmoothScrollProvider>
        </ToastProvider>
      </body>
    </html>
  );
}