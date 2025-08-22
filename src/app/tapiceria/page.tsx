import { Metadata } from 'next';
import TapiceriaClient from './TapiceriaClient';

export const metadata: Metadata = {
  title: 'Tapicería',
  description: 'Devolvemos la vida a tus muebles. Servicio especializado en limpieza de tapicería para sofás, sillas y alfombras, tanto para hogares como para oficinas.',
};

export default function TapiceriaPage() {
    return <TapiceriaClient />;
}