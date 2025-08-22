import { Metadata } from 'next';
import ContactoClient from './ContactoClient';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con Tersus Clean. Encuentra nuestra ubicación en Guadalajara, teléfono y correo para cotizar nuestros servicios de limpieza y lavandería.',
};

export default function ContactoPage() {
  return <ContactoClient />;
}