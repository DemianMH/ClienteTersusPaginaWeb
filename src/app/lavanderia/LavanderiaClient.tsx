"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaHome, FaBuilding, FaTshirt, FaHandsHelping, FaClock, FaCheckCircle, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

// --- Tipos de Datos (TypeScript) ---
interface ImageItem {
src: string;
alt: string;
}

interface GaleriaConLogoProps {
    imgSrc: string;
    imgAlt: string;
    logoSrc: string;
    isPriority: boolean;
}

// --- Componente: Tarjeta de Imagen Individual ---
const GaleriaConLogo: React.FC<GaleriaConLogoProps> = ({ imgSrc, imgAlt, logoSrc, isPriority }) => (
    <div className="relative group rounded-xl shadow-lg  p-2 bg-white">
        <div className="relative h-64 rounded-lg ">
            <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={isPriority}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Mascota añadida aquí */}
            <div className="absolute bottom-0 left-0 w-40 h-auto z-10 transform translate-y-[10%]">
                <Image
                    src="/mascota-enmarco.png"
                    alt="Mascota Tersus"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                />
            </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/80 p-2 rounded-full shadow-lg z-20">
            <Image
                src={logoSrc}
                alt="Logo de la sección"
                width={40}
                height={40}
                className="object-contain"
                loading="lazy"
            />
        </div>
    </div>
);

// --- Datos de la Galería ---
const galleryImages: ImageItem[] = [
    { src: '/lavanderia_lavadoras.png', alt: 'Lavadoras modernas en Tersus' },
    { src: '/localtersus.png', alt: 'Ropa limpia y doblada profesionalmente' },
    { src: '/lavanderiascamaras.png', alt: 'Instalaciones limpias y acogedoras' },
];

// --- Contenido de la Pestaña "Hogar" ---
const HogarContent = () => (
<div>
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Lavandería para tu Hogar</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
    Sabemos que tu tiempo es valioso. Deja que nos encarguemos de tu ropa con nuestro servicio de lavandería para el hogar. Ofrecemos lavado, secado y planchado de alta calidad para que tus prendas luzcan siempre impecables.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div className="flex flex-col items-center p-4"><FaTshirt className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Cuidado de Prendas</h3><p className="text-gray-600">Tratamos cada prenda con el cuidado que merece, utilizando productos de alta calidad.</p></div>
        <div className="flex flex-col items-center p-4"><FaClock className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Servicio Rápido</h3><p className="text-gray-600">Tu ropa limpia y lista en el menor tiempo posible, para que no tengas que esperar.</p></div>
        <div className="flex flex-col items-center p-4"><FaHandsHelping className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Comodidad</h3><p className="text-gray-600">Disfruta de la comodidad de un servicio profesional sin salir de casa.</p></div>
        <div className="flex flex-col items-center p-4"><FaCheckCircle className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Calidad Garantizada</h3><p className="text-gray-600">Resultados impecables en cada prenda, garantizando tu satisfacción.</p></div>
    </div>
    <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">¿Listo para tener tu ropa siempre perfecta?</h2>
            <p className="text-lg mb-8">Contáctanos y descubre nuestros planes de lavandería para el hogar.</p>
            <a href="https://wa.me/523323254619?text=Hola%2C%20me%20interesan%20sus%20servicios%20de%20lavanderia%20para%20el%20hogar." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto"><FaWhatsapp className="mr-2" /> Contáctanos</a>
        </div>
    </div>
</div>
);

// --- Contenido de la Pestaña "Corporativo" ---
const CorporativoContent = () => (
<div>
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Soluciones de Lavandería para Empresas</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
    Ofrecemos un servicio de lavandería industrial y corporativo adaptado a las necesidades de tu negocio. Desde uniformes hasta mantelería, garantizamos una limpieza profunda y profesional que reflejará la mejor imagen de tu empresa.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div className="flex flex-col items-center p-4"><FaTshirt className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Uniformes Impecables</h3><p className="text-gray-600">Mantenemos los uniformes de tu personal siempre limpios y presentables.</p></div>
        <div className="flex flex-col items-center p-4"><FaClock className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Puntualidad</h3><p className="text-gray-600">Entregas puntuales para que tu operación nunca se detenga.</p></div>
        <div className="flex flex-col items-center p-4"><FaHandsHelping className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Servicio Personalizado</h3><p className="text-gray-600">Nos adaptamos a las necesidades específicas de tu empresa.</p></div>
        <div className="flex flex-col items-center p-4"><FaCheckCircle className="text-blue-600 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">Máxima Higiene</h3><p className="text-gray-600">Procesos de lavado que garantizan la máxima higiene y desinfección.</p></div>
    </div>
    <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">¿Tu empresa necesita un servicio de lavandería profesional?</h2>
            <p className="text-lg mb-8">Solicita una cotización y descubre cómo podemos ayudarte.</p>
            <a href="https://wa.me/523323254619?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios%20de%20lavanderia%20corporativa." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto"><FaWhatsapp className="mr-2" /> Cotiza Ahora</a>
        </div>
    </div>
</div>
);

// --- Componente Principal de la Página ---
export default function LavanderiaClient() {
    const [activeTab, setActiveTab] = useState('hogar');
    const renderContent = () => {
        switch (activeTab) {
        case 'hogar': return <HogarContent />;
        case 'corporativo': return <CorporativoContent />;
        default: return <HogarContent />;
        }
    };

    return (
        <>
        <div className="relative w-full h-48 md:h-64 flex items-center justify-center bg-gray-100 pt-16">
            <div className="absolute inset-0">
                <Image
                    src="/lavanderia_lavadoras.png"
                    alt="Fondo de Lavandería"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </div>
            <div className="relative z-10 flex space-x-2 md:space-x-4">
                <button onClick={() => setActiveTab('hogar')} className={`flex items-center space-x-2 px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg rounded-full font-semibold transition-colors ${activeTab === 'hogar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}><FaHome /><span>Para Tú Hogar</span></button>
                <button onClick={() => setActiveTab('corporativo')} className={`flex items-center space-x-2 px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg rounded-full font-semibold transition-colors ${activeTab === 'corporativo' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}><FaBuilding /><span>Para Tú Negocio</span></button>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">{renderContent()}</div>
        <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
                    <h2 className="text-blue-800 font-bold text-4xl">Nuestro Proceso Simplificado</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"><FaTshirt className="text-green-500 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">1. Recepción</h3><p className="text-gray-600 text-sm">Trae tu ropa o solicita nuestro servicio de recolección. Clasificamos tus prendas para darles el mejor tratamiento.</p></div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"><FaHandsHelping className="text-green-500 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">2. Lavado Profesional</h3><p className="text-gray-600 text-sm">Utilizamos detergentes de alta calidad y equipos modernos que cuidan tus prendas y el medio ambiente.</p></div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"><FaClock className="text-green-500 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">3. Secado y Planchado</h3><p className="text-gray-600 text-sm">Secamos tus prendas a la temperatura ideal y ofrecemos un planchado experto para un acabado perfecto.</p></div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"><FaCheckCircle className="text-green-500 text-5xl mb-3" /><h3 className="font-semibold text-gray-800 text-xl mb-2">4. Entrega Impecable</h3><p className="text-gray-600 text-sm">Recoge tu ropa fresca, doblada y lista para usar, o recíbela cómodamente en tu domicilio.</p></div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestras Instalaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((img, index) => (
                        <GaleriaConLogo 
                            key={index} 
                            imgSrc={img.src} 
                            imgAlt={img.alt} 
                            logoSrc="/logolavanderia.png"
                            isPriority={index === 0}
                        />
                    ))}
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Visítanos</h2>
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-gray-700 text-lg mb-4 flex items-center justify-center"><FaMapMarkerAlt className="text-red-500 mr-2" />Av. Independencia 2550, 45200 Granja Luz Aidé, Jal.</p>
                    <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-500 text-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.5717757112456!2d-103.4371986856294!3d20.72768098616421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428a9f6b5b5b5b5%3A0x8f8f8f8f8f8f8f8f!2sAv.%20Independencia%202550%2C%20Granja%20Luz%20Aid%C3%A9%2C%2045200%20Zapopan%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1629876543210!5m2!1ses-419!2smx"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación de nuestra lavandería"
                        ></iframe>
                    </div>
                    <a href="https://maps.app.goo.gl/iUQlv2KOJdRnoRkQa" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"><FaMapMarkerAlt className="mr-2" /> Abrir en Google Maps</a>
                </div>
            </div>
        </>
    );
};
