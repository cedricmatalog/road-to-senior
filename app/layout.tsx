import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import { Nav } from "@/components/ui/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Road to Senior',
  description: 'Practical challenges to level up your JavaScript skills — from junior to senior.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <ProgressProvider>
          <Nav />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
