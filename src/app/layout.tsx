import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { SWRProvider } from '@/lib/swr-config';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

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
      <body className={`${poppins.variable} ${notoSans.variable} font-sans`}>
        <SWRProvider>
          <React.Suspense fallback={null}>
            <AnalyticsTracker />
          </React.Suspense>
          <SplashScreen />
          <Navbar />
          <main style={{ paddingBottom: '70px', minHeight: '100vh' }}>
            {children}
          </main>
          <BottomNav />
        </SWRProvider>
      </body>
    </html>
  );
}
