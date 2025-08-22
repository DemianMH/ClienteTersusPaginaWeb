"use client";

import React from 'react';
import Image from 'next/image';
import { FaUsers, FaHandshake, FaStar, FaLightbulb, FaCheckCircle, FaLeaf, FaAward } from 'react-icons/fa';

export default function Nosotros() {
    return (
        // Se elimina el <Loyout>, <Nav> y <Footer>
        <>
            {/* Hero Section */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden pt-16 flex items-center justify-center">
                <Image
                    src="/camioneta-tersus.jpg"
                    alt="Acerca de Tersus Clean"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-70 z-0"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-4">Conoce a Tersus Clean</h1>
                    <p className="text-xl md:text-2xl">Expertos en limpieza que transforman tus espacios.</p>
                </div>
            </div>

            {/* Mission Section - Esta es la que se ve negra en tu captura */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-blue-800 font-bold text-4xl mb-4">Nuestra Misión</h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        En Tersus Clean, nuestra misión es superar las expectativas de limpieza,
                        ofreciendo servicios impecables y soluciones innovadoras que promuevan
                        ambientes saludables, seguros y estéticamente agradables para nuestros clientes,
                        tanto en hogares como en espacios corporativos y lavanderías.
                    </p>
                </div>
                {/* ... el resto del contenido de la página ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                        <FaLightbulb className="text-green-500 text-6xl mb-4" />
                        <h3 className="font-semibold text-gray-800 text-2xl mb-3">Nuestra Visión</h3>
                        <p className="text-gray-600">
                            Ser la empresa líder en servicios de limpieza y lavandería,
                            reconocida por nuestra excelencia, innovación y compromiso con
                            la satisfacción del cliente y el cuidado del medio ambiente.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                        <FaStar className="text-blue-600 text-6xl mb-4" />
                        <h3 className="font-semibold text-gray-800 text-2xl mb-3">Nuestros Valores</h3>
                        <ul className="text-gray-600 list-none p-0 space-y-2">
                            <li><FaCheckCircle className="inline-block mr-2 text-green-500" />Profesionalismo</li>
                            <li><FaHandshake className="inline-block mr-2 text-green-500" />Integridad y Confianza</li>
                            <li><FaUsers className="inline-block mr-2 text-green-500" />Orientación al Cliente</li>
                            <li><FaLeaf className="inline-block mr-2 text-green-500" />Responsabilidad Ambiental</li>
                            <li><FaAward className="inline-block mr-2 text-green-500" />Excelencia en el Servicio</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="relative py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-blue-800 font-bold text-4xl mb-8">¿Por qué elegir Tersus Clean?</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* ... contenido ... */}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-800 py-16 md:py-24 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">Únete a la experiencia de limpieza Tersus Clean.</h2>
                    <p className="text-lg mb-8">Contáctanos y descubre cómo podemos transformar tus espacios.</p>
                    <a href="/contacto" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg">
                        Contáctanos Hoy
                    </a>
                </div>
            </div>
        </>
    );
}