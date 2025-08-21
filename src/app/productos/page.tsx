// Catalogo.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Loyout from "../layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Image from 'next/image';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface ProductItem {
    id: string;
    image: string;
    name: string;
    price: number;
    description: string;
    category: string;
}

// Product Catalog Data Section
const productData: ProductItem[] = [
    {
        id: 'multiusos',
        image: '/produc1.jpg', // Using Tersus logo as a placeholder product image
        name: 'Limpiador Multiusos Avanzado',
        price: 99.50,
        description: 'Potente limpiador para todas las superficies, elimina grasa y suciedad, dejando un aroma fresco y duradero.',
        category: 'Limpieza General'
    },
    {
        id: 'tapiceria-shampoo',
        image: '/produc2.jpg', // Using Tapicería logo as a placeholder product image
        name: 'Shampoo Concentrado para Tapicería',
        price: 150.00,
        description: 'Fórmula especializada para limpiar a fondo alfombras, sofás y tapicería, eliminando manchas difíciles y olores.',
        category: 'Tapicería'
    },
    {
        id: 'detergente-lavanderia',
        image: '/produc3.jpg', // Using Lavandería logo as a placeholder product image
        name: 'Detergente Líquido Premium',
        price: 120.00,
        description: 'Detergente altamente concentrado para ropa, protege los colores y deja las prendas impecables con cada lavado.',
        category: 'Lavandería'
    },
    {
        id: 'eliminador-olores-mascotas',
        image: '/produc4.jpg', // Using Mascota Tersus image as a placeholder product image
        name: 'Eliminador de Olores para Mascotas',
        price: 85.00,
        description: 'Neutraliza eficazmente los olores de mascotas en telas y superficies, dejando un ambiente limpio y agradable.',
        category: 'Mascotas'
    },
    {
        id: 'limpiador-pisos',
        image: '/produc5.jpg', // Using Sala Limpia image as a placeholder product image
        name: 'Limpiador Abrillantador de Pisos',
        price: 110.00,
        description: 'Devuelve el brillo natural a tus pisos, ideal para madera, cerámica y mármol. No deja residuos.',
        category: 'Pisos'
    },
    {
        id: 'desinfectante-banos',
        image: '/produc6.jpg', // Reusing logo as placeholder
        name: 'Desinfectante Total para Baños',
        price: 75.00,
        description: 'Elimina el 99.9% de gérmenes y bacterias en baños, dejando una limpieza profunda y un aroma a limpio.',
        category: 'Baños'
    },
    {
        id: 'desengrasante-cocina',
        image: '/produc7.jpg', // Reusing logo as placeholder
        name: 'Desengrasante Potente para Cocina',
        price: 90.00,
        description: 'Ideal para eliminar grasa pegada en estufas, campanas y azulejos de la cocina, sin esfuerzo.',
        category: 'Cocina'
    },
];

// Get all unique categories for the filter dropdown
const allCategories = ['Todas', ...new Set(productData.map(product => product.category))];

interface ProductCardProps {
    product: ProductItem;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain" 
                    className="rounded-lg"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <span className="text-blue-600 font-bold text-2xl">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 text-xs px-2 py-1 bg-gray-100 rounded-full">{product.category}</span>
            </div>
        </div>
    );
}

export default function Catalogo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>(productData);

    useEffect(() => {
        let productsToFilter = productData;

        // Filter by category
        if (selectedCategory !== 'Todas') {
            productsToFilter = productsToFilter.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            productsToFilter = productsToFilter.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(productsToFilter);
    }, [searchTerm, selectedCategory]);

    // Main Component Structure
    return (
        <Loyout >
            <Nav />

            <div className="relative w-full h-64 md:h-96 overflow-hidden pt-16 flex items-center justify-center">
                <Image
                    src="/productos-limpieza.jpg" 
                    alt="Fondo de Catálogo"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-60 z-0"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-4">Nuestro Catálogo de Productos</h1>
                    <p className="text-xl">Descubre la excelencia en limpieza para tu hogar y negocio.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="relative w-full md:w-auto">
                        <select
                            className="w-full pl-4 pr-10 py-3 border text-black border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {allCategories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'Todas' ? 'Todas' : category}
                                </option>
                            ))}
                        </select>
                        <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Product Grid Section */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 text-xl py-12">
                        No se encontraron productos que coincidan con tu búsqueda o filtros.
                    </div>
                )}
            </div>

            <Footer />
        </Loyout>
    );
}