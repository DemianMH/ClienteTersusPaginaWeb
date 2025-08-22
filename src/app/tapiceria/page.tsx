"use client";
import React, { useState } from 'react';
import Loyout from "../layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Image from 'next/image';
import { FaHome, FaBuilding, FaChair, FaTint, FaFeatherAlt, FaMagic, FaWhatsapp, FaHandsHelping, FaClock, FaCheckCircle } from 'react-icons/fa';

const galleryImages = [
    { src: '/tapiceria-trabajo.jpg', alt: 'Sofá de sala limpio y renovado' },
    { src: '/sala-limpia-6.jpg', alt: 'Sillas de comedor impecables' },
    { src: '/sala-limpia-4.jpg', alt: 'Alfombra de oficina después de una limpieza profunda' },
];

const TapiceriaPage = () => {
  const [activeTab, setActiveTab] = useState('hogar');

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
    <Loyout>
      <Nav />
      <div className="relative w-full h-48 md:h-64 flex items-center justify-center bg-gray-100 pt-16">
        <div className="absolute inset-0">
            <Image
                src="/tapiceria-trabajo.jpg"
                alt="Fondo de Tapicería"
                layout="fill"
                objectFit="cover"
                className="opacity-30"
            />
        </div>
        <div className="relative z-10 flex space-x-4">
          <button
            onClick={() => setActiveTab('hogar')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold transition-colors ${
              activeTab === 'hogar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaHome />
            <span>Hogar</span>
          </button>
          <button
            onClick={() => setActiveTab('corporativo')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold transition-colors ${
              activeTab === 'corporativo' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaBuilding />
            <span>Corporativo</span>
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

       {/* Secciones Comunes */}
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
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">2. Pre-Tratamiento</h3>
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

        <div className="container mx-auto px-4 py-16">
            <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Galería de Proyectos</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, index) => (
                    <div
                        key={index}
                        className="group relative rounded-xl shadow-xl overflow-hidden hover:shadow-blue-500/50 transition-shadow duration-300"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                ))}
            </div>
        </div>
      <Footer />
    </Loyout>
  );
};

const HogarContent = () => (
  <div>
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Limpieza y Renovación de Tapicería para tu Hogar</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
      Devuélvele la vida a tus muebles con nuestro servicio profesional de limpieza de tapicería. Eliminamos manchas, ácaros y malos olores, dejando tus sofás, sillas y alfombras como nuevos, y creando un ambiente más saludable para tu familia.
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
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Servicio de Tapicería para Oficinas y Empresas</h1>
    <p className="text-lg text-center text-gray-700 mb-12">
      La imagen de tu negocio es fundamental. Ofrecemos limpieza de sillería, alfombras y muebles de oficina, garantizando un ambiente de trabajo limpio, saludable y profesional para tus empleados y clientes.
    </p>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <div className="flex flex-col items-center p-4">
            <FaChair className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Sillería de Oficina</h3>
            <p className="text-gray-600">Limpieza y desinfección profunda de sillas de oficina, eliminando manchas y ácaros para un entorno de trabajo más sano.</p>
        </div>
        <div className="flex flex-col items-center p-4">
            <FaTint className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Alfombras y Corporativas</h3>
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

export default TapiceriaPage;