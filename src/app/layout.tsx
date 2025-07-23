import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Semih Ergili',
    default: 'Semih Ergili - İnteraktif CV',
  },
  description: 'Full Stack Geliştirici Semih Ergili için interaktif CV.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
