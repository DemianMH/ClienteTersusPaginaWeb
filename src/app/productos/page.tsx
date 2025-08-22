import { Metadata } from 'next';
import ProductosClient from './ProductosClient';

export const metadata: Metadata = {
    title: 'Productos de Limpieza',
    description: 'Descubre nuestro catálogo de productos de limpieza de alta calidad. Detergentes, suavizantes y limpiadores para resultados profesionales en tu hogar o negocio.',
};

export default function ProductosPage() {
    return <ProductosClient />;
}