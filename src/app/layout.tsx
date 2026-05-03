import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { SplashScreen } from '@/components/ui/SplashScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sajag - Your Election Assistant',
  description: 'Understand the Indian election process, find your booth, and prepare to vote.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <React.Suspense fallback={null}>
          <AnalyticsTracker />
        </React.Suspense>
        <SplashScreen />
        <Navbar />
        <main style={{ paddingBottom: '70px', minHeight: '100vh' }}>
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
