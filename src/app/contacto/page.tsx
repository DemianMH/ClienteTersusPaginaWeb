"use client";

import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Contacto() {
    const address = "Prol av laureles 453, 45157";
    const phoneNumber = "+52 33 2325 4619";
    const emailAddress = "tersuscleangdl@gmail.com";
    const whatsappLink = "https://wa.me/523323254619?text=Hola%2C%20me%20gustaria%20saber%20mas%20sobre%20sus%20servicios.";
    const facebookLink = "https://www.facebook.com/tersuscleanguadalajara";
    const tiktokLink = "https://www.tiktok.com/@tersus.clean.gdl?_t=8gR9niEXuje&_r=1";

    // Link para el mapa incrustado (iframe)
    const googleMapsEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.428498816823!2d-103.4154435255474!3d20.73024889759458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428aee658df8d07%3A0xc484b93b8f67341e!2sProl%20Av.%20Laureles%20453%2C%20Industrial%20La%20Cantera%2C%2045157%20Zapopan%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx";
    
    // NUEVO LINK para el botón "Abrir en Google Maps"
    const googleMapsLink = "https://maps.app.goo.gl/WEFqgsM1x6UCUViF7";


    return (
        <>
            {/* Hero Section */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden pt-16 flex items-center justify-center">
                <Image
                    src="/persona_trabajando.png" 
                    alt="Contacto Tersus Clean"
                    layout="fill"
                    objectFit="cover"
                    className="z-0 rendered-lg"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-70 z-0"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-xl md:text-2xl">Estamos listos para ayudarte a mantener tus espacios impecables.</p>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <h2 className="text-blue-800 font-bold text-3xl mb-6">Información de Contacto</h2>
                        <div className="space-y-6 w-full max-w-sm">
                            <div className="flex items-center justify-center gap-4 text-gray-800">
                                <FaMapMarkerAlt className="text-blue-600 text-3xl" />
                                <div>
                                    <p className="font-semibold text-lg">Dirección:</p>
                                    <p className="text-md">{address}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 text-gray-800">
                                <FaPhone className="text-blue-600 text-3xl" />
                                <div>
                                    <p className="font-semibold text-lg">Teléfono:</p>
                                    <a href={`tel:${phoneNumber}`} className="text-md hover:underline">{phoneNumber}</a>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 text-gray-800">
                                <FaEnvelope className="text-blue-600 text-3xl" />
                                <div>
                                    <p className="font-semibold text-lg">Correo Electrónico:</p>
                                    <a href={`mailto:${emailAddress}`} className="text-md hover:underline">{emailAddress}</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-800 text-xl mb-4">Síguenos en Redes Sociales:</h3>
                            <div className="flex justify-center gap-6">
                                <a href={facebookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-700 hover:text-blue-800 transition-colors">
                                    <FaFacebook className="text-4xl" />
                                </a>
                                <a href={tiktokLink} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-black hover:text-gray-700 transition-colors">
                                    <FaTiktok className="text-4xl" />
                                </a>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-green-500 hover:text-green-600 transition-colors">
                                    <FaWhatsapp className="text-4xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-blue-800 font-bold text-3xl mb-6 text-center">Nuestra Ubicación</h2>
                        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-500 text-sm">
                            <iframe
                                src={googleMapsEmbedSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Tersus Clean"
                            ></iframe>
                        </div>
                        <a
                            // CAMBIO APLICADO AQUÍ
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            <FaMapMarkerAlt className="mr-2" /> Abrir en Google Maps
                        </a>
                    </div>
                </div>
            </div>

            {/* Call to Action for WhatsApp */}
            <div className="bg-blue-800 py-16 md:py-24 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">¿Tienes alguna pregunta? ¡Estamos para ayudarte!</h2>
                    <p className="text-lg mb-8">Envíanos un mensaje rápido por WhatsApp.</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto">
                        <FaWhatsapp className="mr-2" /> Escríbenos por WhatsApp
                    </a>
                </div>
            </div>
        </>
    );
}
