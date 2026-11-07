
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { PersonalDataProvider } from "@/context/PersonalDataContext";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vision Star | My Life, My Progress, My Direction",
  description:
    "A personal space to manage your journey, achievements, goals, skills and future vision.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PersonalDataProvider>
          <Sidebar />
<div className="min-h-screen pt-20 md:ml-64 md:pt-0">
  {children}
</div>
        </PersonalDataProvider>
      </body>
    </html>
  );
}
