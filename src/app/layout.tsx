import "./globals.css";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import WhatsAppButton from '@/app/components/WhatsAppButton';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Tersus | %s', 
    default: 'Tersus | Soluciones de Limpieza', 
  },
  description: 'Ofrecemos servicios profesionales de limpieza, lavandería y tapicería para hogares y empresas en Guadalajara.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="icon" href="/logovectores.svg" type="image/svg+xml" />
      </head>

      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Nav />
        <main className="flex-grow">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
