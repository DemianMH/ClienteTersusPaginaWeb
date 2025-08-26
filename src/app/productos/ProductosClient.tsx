"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaFilter, FaInfoCircle, FaTimes } from 'react-icons/fa';

// ... (ProductItem interface and productData array remain the same)
interface ProductItem {
    id: string;
    image: string;
    name: string;
    description: string;
    category: string;
}

const productData: ProductItem[] = [
    { id: 'tersusbicar', image: '/tersusbicar.png', name: 'TersusBicar+', description: 'Con el poder natural del bicarbonato de sodio, este detergente elimina olores persistentes y residuos orgánicos, dejando la ropa fresca y libre de impurezas. Su fórmula alcalina suave es ideal para prendas deportivas, ropa de cocina, uniformes escolares y textiles expuestos al sudor. Neutraliza olores sin dañar las fibras, ofreciendo una limpieza efectiva y segura para uso doméstico o profesional.', category: 'Detergentes para Ropa' },
    { id: 'tersusproactiva', image: '/tersusproactiva.png', name: 'TersusProActiva', description: 'Nuestro detergente premium con enzimas activas está diseñado para enfrentar las manchas más difíciles con tecnología de limpieza profunda. Funciona eficazmente incluso en agua fría, lo que lo convierte en una opción ideal para lavanderías, hoteles y hogares que buscan resultados profesionales. Su fórmula de alto rendimiento elimina grasa, proteína y suciedad incrustada, cuidando las telas y dejando un aroma limpio y sofisticado.', category: 'Detergentes para Ropa' },
    { id: 'tersustotalclean', image: '/tersustotalclean.png', name: 'TersusTotalClean', description: 'Detergente multiuso para todo tipo de ropa, con una fórmula balanceada que combina poder quitamanchas y fragancia duradera. Ideal para el uso diario en ropa blanca y de color, telas delicadas y prendas resistentes. Su versatilidad lo convierte en el aliado perfecto para hogares, negocios y lavanderías que buscan eficiencia sin complicaciones. Limpia profundamente sin dañar las fibras ni alterar los colores.', category: 'Detergentes para Ropa' },
    { id: 'tersusquita', image: '/tersusquita.png', name: 'TersusQuita+', description: 'Removedor de manchas líquido de acción directa, formulado para eliminar manchas difíciles en ropa blanca y de color. Actúa sobre grasa, tinta, maquillaje, alimentos y más, sin alterar el color ni dañar la tela. Ideal para aplicar antes del lavado, potenciando el rendimiento del detergente. Compatible con toda la línea TersusClean.', category: 'Quitámanchas' },
    { id: 'tersuspinofuerte', image: '/tersuspinofuerte.png', name: 'TersusPinoFuerte', description: 'Limpiador multiusos con aroma a pino, diseñado para desinfectar y aromatizar pisos, baños, cocinas y superficies lavables. Su fórmula alcalina elimina bacterias, grasa y suciedad, dejando un ambiente limpio y fresco. Ideal para hogares, negocios y espacios que requieren limpieza profunda con aroma natural.', category: 'Limpiadores Multiusos' },
    { id: 'tersusaromavivo', image: '/tersusaromavivo.png', name: 'TersusAromaVivo', description: 'Limpiador aromático concentrado disponible en Lavanda, Manzana Canela y Menta. Diseñado para brindar limpieza y ambientación en un solo paso. Ideal para pisos, paredes, muebles lavables y áreas comunes. Su fórmula deja un aroma duradero y agradable, convirtiendo cada espacio en una experiencia sensorial.', category: 'Limpiadores Multiusos' },
    { id: 'tersusoxipol', image: '/tersusoxipol.png', name: 'TersusOxipol', description: 'Desmanchador en polvo con oxígeno activo, ideal para ropa blanca y prendas que requieren blanqueamiento sin cloro. Su fórmula penetra las fibras y elimina manchas difíciles como café, vino, sangre y grasa, sin dañar los tejidos. Puede usarse como prelavado o mezclado con detergente. Seguro para lavadoras y eficaz en agua fría.', category: 'Quitámanchas' },
    { id: 'tersusperlaselegant', image: '/tersusperlaselegant.png', name: 'TersusPerlasElegant', description: 'Suavizante con microperlas aromáticas de alta fijación, diseñado para brindar una experiencia sensorial sofisticada. Ideal para prendas finas, ropa de cama, cortinas y textiles decorativos. Su fórmula encapsulada libera fragancia gradualmente, dejando la ropa suave, perfumada y con un toque elegante. Perfecto para quienes buscan distinción y cuidado en cada lavado.', category: 'Suavizantes' },
    { id: 'tersusbabypearls', image: '/tersusbabyperlas.png', name: 'TersusPerlasBabyCare', description: 'Suavizante hipoalergénico especialmente formulado para ropa infantil. Libre de colorantes y fragancias agresivas, dermatológicamente probado para pieles sensibles. Ideal para mantas, pañales de tela, ropa de bebé y prendas delicadas. Su fórmula suave deja la ropa tersa, segura y con un aroma ligero que transmite limpieza y ternura.', category: 'Suavizantes' },
    { id: 'tersusperlasfreshblue', image: '/tersusperlasfreshblue.png', name: 'TersusPerlasFreshBlue', description: 'Suavizante con aroma fresco y duradero, ideal para ropa diaria, toallas, uniformes y textiles de uso constante. Su fórmula con microperlas libera fragancia gradualmente, manteniendo la sensación de limpieza por más tiempo. Compatible con todo tipo de telas, deja las prendas suaves, fáciles de planchar y con un aroma revitalizante.', category: 'Suavizantes' },
    { id: 'tersuscolor', image: '/tersuscolor.png', name: 'TersusColor+', description: 'Detergente diseñado para proteger y realzar los colores de tu ropa, manteniendo su vitalidad lavado tras lavado. Su fórmula avanzada evita el desgaste y la decoloración, dejando las prendas limpias y como nuevas.', category: 'Detergentes para Ropa' },
    { id: 'tersusnegro', image: '/tersusnegro.png', name: 'TersusNegro+', description: 'Detergente especializado para ropa negra y oscura. Su fórmula única ayuda a mantener la intensidad del color negro, previniendo el deslavado y las manchas blancas. Deja tu ropa oscura luciendo impecable y como nueva.', category: 'Detergentes para Ropa' },
];

const allCategories = ['Todas', ...new Set(productData.map(product => product.category))];

interface ProductCardProps {
    product: ProductItem;
}

function ProductCard({ product }: ProductCardProps) {
    const [showDescriptionMobile, setShowDescriptionMobile] = useState(false);

    return (
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
            <div className="p-6 md:group-hover:opacity-0 md:transition-opacity md:duration-500 flex flex-col h-full">
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain rounded-lg"
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                <span className="text-gray-500 text-xs px-2 py-1 bg-gray-100 rounded-full mt-auto self-start">{product.category}</span>
            </div>
            <div className="md:hidden p-6 pt-0">
                <button
                    onClick={() => setShowDescriptionMobile(!showDescriptionMobile)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors duration-300 mb-4"
                >
                    {showDescriptionMobile ? <FaTimes /> : <FaInfoCircle />}
                    {showDescriptionMobile ? 'Ocultar Ficha Técnica' : 'Ver Ficha Técnica'}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDescriptionMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
            </div>
            <div className="hidden md:flex absolute inset-0 bg-white bg-opacity-95 p-6 rounded-xl flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-95 group-hover:scale-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 overflow-y-auto max-h-[calc(100%-80px)]">{product.description}</p>
                <span className="mt-auto text-gray-500 text-xs px-2 py-1 bg-gray-100 rounded-full">{product.category}</span>
            </div>
        </div>
    );
}

export default function ProductosClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>(productData);

    useEffect(() => {
        let productsToFilter = productData;
        if (selectedCategory !== 'Todas') {
            productsToFilter = productsToFilter.filter(product => product.category === selectedCategory);
        }
        if (searchTerm) {
            productsToFilter = productsToFilter.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredProducts(productsToFilter);
    }, [searchTerm, selectedCategory]);

    return (
        <>
            <div className="relative w-full h-64 md:h-96 overflow-hidden pt-16 flex items-center justify-center">
                <Image
                    src="/productos-limpieza.jpg"
                    alt="Fondo de Catálogo"
                    fill
                    className="object-cover z-0"
                    priority // Añadido para carga prioritaria
                />
                <div className="absolute inset-0 bg-blue-800 opacity-60 z-0"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-4xl font-bold mb-4">Nuestro Catálogo de Productos</h1>
                    <p className="text-xl">Descubre la excelencia en limpieza para tu hogar y negocio.</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8 md:py-16">
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
        </>
    );
}