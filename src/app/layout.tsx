import './globals.css';

import Header from '@/components/ui/header/Header';

import { ClerkProvider } from '@clerk/nextjs';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Lexend } from 'next/font/google';

import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie Club',
  description:
    "Create and join movie clubs based on specific topics and then link your Letterboxd review when you're done"
};

const lexend = Lexend({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${lexend.className} flex min-h-screen flex-col antialiased`}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Header />
          <main className='mx-auto w-full max-w-7xl p-5 pt-24'>{children}</main>
          <div className='flex-1' />
        </body>
      </html>
    </ClerkProvider>
  );
}
