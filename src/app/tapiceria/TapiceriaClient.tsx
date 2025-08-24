"use client";
import React from 'react';
import Image from 'next/image';
import { FaHome, FaBuilding, FaChair, FaTint, FaFeatherAlt, FaMagic, FaWhatsapp, FaHandsHelping, FaClock, FaCheckCircle } from 'react-icons/fa';

// Se definen los tipos para las propiedades del componente
type GaleriaConLogoProps = {
    imgSrc: string;
    imgAlt: string;
    logoSrc: string;
};

// Se aplica el tipado al componente
const GaleriaConLogo: React.FC<GaleriaConLogoProps> = ({ imgSrc, imgAlt, logoSrc }) => (
    <div className="relative group rounded-xl shadow-lg overflow-hidden p-2 bg-white">
        <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
                src={imgSrc}
                alt={imgAlt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/80 p-2 rounded-full shadow-lg z-10">
            <Image
                src={logoSrc}
                alt="Logo de la sección"
                width={40}
                height={40}
                className="object-contain"
            />
        </div>
    </div>
);


const galleryImagesHogar = [
    { src: '/sala-limpia-4.jpg', alt: 'Sofá de sala limpio y renovado' },
    { src: '/sala-limpia.jpg', alt: 'Sillas de comedor impecables' },
    { src: '/sala-limpia-2.jpg', alt: 'Interior de auto familiar después de limpieza de tapicería' },
];

const galleryImagesCorporativo = [
    { src: '/oficinas.jpg', alt: 'Sillas de oficina limpias y desinfectadas' },
    { src: '/oficinas2.jpg', alt: 'Alfombra de oficina después de una limpieza profunda' },
    { src: '/oficinas3.jpg', alt: 'Mobiliario de área de espera renovado' },
];

type GaleriaDinamicaProps = {
    images: { src: string; alt: string }[];
    logo: string;
};

const GaleriaDinamica: React.FC<GaleriaDinamicaProps> = ({ images, logo }) => (
    <div className="container mx-auto px-4 py-16">
        <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Galería de Proyectos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, index) => (
                <GaleriaConLogo key={index} imgSrc={img.src} imgAlt={img.alt} logoSrc={logo} />
            ))}
        </div>
    </div>
);


const TapiceriaClient = () => {
const [activeTab, setActiveTab] = React.useState('hogar');

const renderContent = () => {
    switch (activeTab) {
    case 'hogar':
        return <HogarContent />;
    case 'corporativo':
        return <CorporativoContent />;
    default:
        return <HogarContent />;
    }
};

return (
    <>
    <div className="relative w-full h-48 md:h-64 flex items-center justify-center bg-gray-100 pt-16">
        <div className="absolute inset-0">
            <Image
                src="/sala-limpia-6.jpg"
                alt="Fondo de Tapicería"
                layout="fill"
                objectFit="cover"
                className="opacity-30"
            />
        </div>
        <div className="relative z-10 flex space-x-2 md:space-x-4"> 
        <button
            onClick={() => setActiveTab('hogar')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg rounded-full font-semibold transition-colors ${
            activeTab === 'hogar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
        >
            <FaHome />
            <span>Para Tú Hogar</span>
        </button>
        <button
            onClick={() => setActiveTab('corporativo')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg rounded-full font-semibold transition-colors ${
            activeTab === 'corporativo' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
        >
            <FaBuilding />
            <span>Para Tú Negocio</span>
        </button>
        </div>
    </div>
    <div className="container mx-auto px-4 py-8">
        {renderContent()}
    </div>

    <div className="container mx-auto px-4 py-16">
            <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestro Proceso de Limpieza de Tapicería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                    <FaClock className="text-green-500 text-5xl mb-3" />
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">1. Evaluación Detallada</h3>
                    <p className="text-gray-600 text-sm">Inspeccionamos el tipo de tela, el nivel de suciedad y las manchas para determinar el mejor método de limpieza.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                    <FaHandsHelping className="text-green-500 text-5xl mb-3" />
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">2. Pre-Lavado</h3>
                    <p className="text-gray-600 text-sm">Aplicamos soluciones especializadas para ablandar la suciedad y tratar las manchas más difíciles antes de la limpieza profunda.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                    <FaChair className="text-green-500 text-5xl mb-3" />
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">3. Limpieza Profunda</h3>
                    <p className="text-gray-600 text-sm">Utilizamos equipos de inyección y extracción para eliminar a fondo la suciedad, los alérgenos y los residuos.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                    <FaCheckCircle className="text-green-500 text-5xl mb-3" />
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">4. Inspección Final</h3>
                    <p className="text-gray-600 text-sm">Aseguramos un secado adecuado y realizamos una revisión final para garantizar resultados impecables y tu total satisfacción.</p>
                </div>
            </div>
        </div>

        {activeTab === 'hogar' ? (
            <GaleriaDinamica images={galleryImagesHogar} logo="/tapiceria-logo.png" />
        ) : (
            <GaleriaDinamica images={galleryImagesCorporativo} logo="tapiceria-logo.png" />
        )}

    </>
);
};

const HogarContent = () => (
    <div>
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Limpieza y Renovación de Tapicería para tu Hogar</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
        Renueva por completo tus espacios. Además de nuestra limpieza profesional de tapicería que elimina manchas y ácaros, también ofrecemos servicios expertos de retapizado y restauración de muebles. Dale una nueva vida a tus sofás, sillas y sillones, y disfruta de un ambiente más saludable y elegante en tu hogar.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div className="flex flex-col items-center p-4">
            <FaChair className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Especialistas en Telas</h3>
            <p className="text-gray-600">Conocemos cada tipo de tela y aplicamos el tratamiento adecuado para proteger y revitalizar tus muebles.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaTint className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Eliminación de Manchas</h3>
            <p className="text-gray-600">Técnicas avanzadas para eliminar eficazmente hasta las manchas más difíciles sin dañar los tejidos.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaFeatherAlt className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Secado Rápido</h3>
            <p className="text-gray-600">Utilizamos equipos profesionales que garantizan un secado rápido para que puedas volver a usar tus muebles en poco tiempo.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaMagic className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Renovación Total</h3>
            <p className="text-gray-600">No solo limpiamos, restauramos la apariencia, el color y la frescura original de tu tapicería.</p>
        </div>
    </div>
    <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">¿Tus muebles necesitan una nueva vida?</h2>
            <p className="text-lg mb-8">Contáctanos y solicita una cotización para la limpieza y renovación de tu tapicería.</p>
            <a href="https://wa.me/523323254619?text=Hola%2C%20quisiera%20cotizar%20un%20servicio%20de%20limpieza%20de%20tapiceria%20para%20mi%20hogar." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto">
                <FaWhatsapp className="mr-2" /> Solicita tu Cotización
            </a>
        </div>
    </div>
    </div>
);

const CorporativoContent = () => (
    <div>
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Soluciones de Tapicería para Negocios y Auditorios</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
        Proyecta una imagen impecable en cada espacio. Ofrecemos soluciones expertas en limpieza y restauración de tapicería para todo tipo de negocios, desde sillería de oficina y salas de juntas, hasta butacas de auditorios, garantizando un ambiente profesional para tus clientes y colaboradores.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div className="flex flex-col items-center p-4">
            <FaChair className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Sillas, Bancas y Butacas</h3>
            <p className="text-gray-600">Limpieza y desinfección profunda de sillas, bancas y butacas de auditorios, eliminando manchas y ácaros para un entorno de trabajo más sano.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaTint className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Alfombras</h3>
            <p className="text-gray-600">Devolvemos el color y la frescura a las alfombras de alto tráfico, mejorando la estética de tus instalaciones.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaFeatherAlt className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Mobiliario de Recepción</h3>
            <p className="text-gray-600">Sofás y sillones de áreas comunes y de recepción siempre impecables para causar la mejor primera impresión.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaMagic className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Ambiente Laboral Óptimo</h3>
            <p className="text-gray-600">Un espacio de trabajo limpio y cuidado mejora la productividad, la moral y el bienestar general de tu equipo.</p>
        </div>
    </div>
    <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">¿Quieres proyectar la mejor imagen de tu negocio?</h2>
            <p className="text-lg mb-8">Contáctanos para diseñar un plan de limpieza de tapicería a la medida de las necesidades de tu empresa.</p>
            <a href="https://wa.me/523323254619?text=Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de%20limpieza%20de%20tapiceria%20para%20mi%20empresa." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto">
                <FaWhatsapp className="mr-2" /> Contacto para Empresas
            </a>
        </div>
    </div>
    </div>
);

export default TapiceriaClient;
