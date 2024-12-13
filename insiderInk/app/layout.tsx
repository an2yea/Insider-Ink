import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { DashboardProvider } from "@/src/contexts/DashboardContext";
import { StatusDialog } from "@/components/StatusDialog";

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
  title: "GenZ Dashboard",
  description: "A striking and simple dashboard for GenZ users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DashboardProvider>
            <StatusDialog />
            {children}
          </DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
