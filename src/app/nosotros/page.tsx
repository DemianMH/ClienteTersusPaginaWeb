import { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';

export const metadata: Metadata = {
    title: 'Nosotros',
    description: 'Conoce la misión, visión y valores de Tersus Clean. Somos expertos en limpieza comprometidos con la excelencia y la satisfacción del cliente en Guadalajara.',
};

export default function NosotrosPage() {
    return <NosotrosClient />;
}