import "./globals.css";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import { Metadata } from 'next';


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
        {/* Link para el logo en la pestaña (favicon) */}
        <link rel="icon" href="/logovectores.svg" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}