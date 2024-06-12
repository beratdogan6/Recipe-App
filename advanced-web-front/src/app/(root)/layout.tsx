"use client"

import { Inter } from "next/font/google";
import "../globals.css";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Header from "@/components/Header";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
