import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SSV CRM — AI-Powered Customer Support Platform",
  description:
    "AI-powered customer support platform for SSV. Unify every channel with 9 intelligent agents that classify, route, respond, and resolve.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
