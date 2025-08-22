import { Metadata } from 'next';
import LavanderiaClient from './LavanderiaClient';

export const metadata: Metadata = {
  title: 'Lavandería',
  description: 'Servicio de lavandería profesional para hogar y empresas. Cuidado experto para tus prendas, uniformes y mantelería con resultados impecables.',
};

export default function LavanderiaPage() {
  return <LavanderiaClient />;
}
