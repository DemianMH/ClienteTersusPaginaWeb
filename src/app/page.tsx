import Inicio from "@/app/inicio/Inicio";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Soluciones integrales de limpieza para tu hogar y negocio. Ofrecemos servicios de lavandería, limpieza de tapicería y productos de alta calidad en Guadalajara.',
};

export default function Home() {
  return (
      <Inicio />
  );
}