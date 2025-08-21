"use client";

import React, { useState, useEffect, useRef, MouseEvent, TouchEvent, useCallback } from 'react';
import Loyout from "../layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Image from 'next/image';
import {FaSprayCan, FaCheckCircle, FaUsers, FaShieldAlt, FaAward, FaCalendarAlt, FaLaptop, FaHandsHelping, FaWhatsapp } from 'react-icons/fa';

interface ServiceItem {
    id: string;
    image: string;
    name: string;
    content: string;
}

const serviceLogosData: ServiceItem[] = [
    { id: 'general', image: '/Tersus-logo.png', name: 'Limpieza General del Hogar', content: 'Ofrecemos una limpieza profunda y completa para cada rincón de tu hogar, asegurando un ambiente fresco y saludable. Desde cocinas hasta baños, cuidamos cada detalle.' },
    { id: 'tapiceria_hogar', image: '/Tapiceria-logo.png', name: 'Limpieza de Alfombras y Tapicería', content: 'Especialistas en la limpieza de alfombras, sofás, sillones y sillas del hogar, eliminando manchas, olores y reviviendo los colores de tus textiles con técnicas seguras y efectivas.' },
    { id: 'ventanas', image: '/logolavanderia.png', name: 'Limpieza de Ventanas y Cristales', content: 'Ventanas impecables y sin rayas, garantizando la máxima luminosidad y una vista perfecta en tu hogar. Incluimos marcos y rieles para un acabado perfecto.' },
];

interface AvatarItem {
    id: number;
    image: string;
    name: string;
    testimonial: string;
}

const avatarData: AvatarItem[] = [
    { id: 1, image: '/persona5.jpg', name: 'Ana M., Ama de Casa', testimonial: '¡Mi casa nunca ha estado tan limpia y reluciente! El equipo de Tersus es muy profesional y confiable.' },
    { id: 2, image: '/persona2.jpg', name: 'Carlos S., Dueño de Mascota', testimonial: 'Con Tersus, no me preocupo por los pelos de mi perro. ¡Mis alfombras lucen como nuevas y el aire es fresco!' },
    { id: 3, image: '/persona3.jpg', name: 'Sofía L., Profesional Ocupada', testimonial: 'Gracias a Tersus, tengo más tiempo para mí y mi familia. El servicio es impecable y se adaptan a mis horarios.' },
    { id: 4, image: '/persona4.jpg', name: 'Roberto G., Decorador', testimonial: 'La limpieza de tapicería fue asombrosa. Mis muebles antiguos parecen recién comprados. ¡Recomiendo Tersus a todos mis clientes!' },
    { id: 5, image: '/persona1.jpg', name: 'Familia R., Hogar Grande', testimonial: 'Con tres niños, mantener la casa limpia era un desafío. Tersus lo hace parecer fácil. ¡Son la mejor inversión!' },
];

const galleryImages = [
    { src: '/sala-limpia-4.jpg', alt: 'Sala de Hogar Limpia' },
    { src: '/sala-limpia-5.jpg', alt: 'Equipo Tersus limpiando cocina de hogar' },
    { src: '/sala-limpia-6.jpg', alt: 'Mueble de sala de hogar limpio' },
    { src: '/sala-limpia-2.jpg', alt: 'Ventanas de hogar limpias' },
    { src: '/sala-limpia-3.jpg', alt: 'Baño de hogar reluciente' },
];

interface ServiceLogoCardProps {
    service: ServiceItem;
    onClick: (id: string) => void;
    isMobile: boolean;
}

function ServiceLogoCard({ service, onClick, isMobile }: ServiceLogoCardProps) {

    const fixedSize = isMobile ? 100 : 150; 

    return (
        <button
            onClick={() => onClick(service.id)}
            className={`flex-shrink-0 relative rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center p-0 hover:scale-105 hover:shadow-xl`}
            style={{ width: `${fixedSize}px`, height: `${fixedSize}px` }} 
        >
            <Image
                src={service.image}
                alt={service.name}
                width={fixedSize} 
                height={fixedSize}
                className="rounded-full object-contain" 
            />
        </button>
    );
}

function TestimonialCard({ image, name, testimonial }: AvatarItem) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-6 text-center h-[400px]">
            <Image
                src={image}
                alt={name}
                width={120}
                height={120}
                className="rounded-full object-cover mb-4 border-4 border-blue-400"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 text-sm italic">{testimonial}</p>
        </div>
    );
}

export default function Hogar() {
    const [activeServiceId, setActiveServiceId] = useState('general');
    const activeServiceContent = serviceLogosData.find(s => s.id === activeServiceId)?.content;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [currentAvatarSlide, setCurrentAvatarSlide] = useState(0);
    const avatarCarouselRef = useRef<HTMLDivElement>(null);
    const [isAvatarDragging, setIsAvatarDragging] = useState(false);
    const [avatarStartX, setAvatarStartX] = useState(0);
    const [avatarCurrentTranslate, setAvatarCurrentTranslate] = useState(0);
    const [avatarPrevTranslate, setAvatarPrevTranslate] = useState(0);
    const [avatarAnimationEnabled, setAvatarAnimationEnabled] = useState(true);

    const getAvatarSlideWidth = useCallback((): number => {
        if (avatarCarouselRef.current && avatarCarouselRef.current.children.length > 0) {
            const firstCard = avatarCarouselRef.current.children[0] as HTMLElement;
            return firstCard.offsetWidth + 16;
        }
        return 0;
    }, []);

    const setAvatarSliderTransform = (translate: number): void => {
        if (avatarCarouselRef.current) {
            avatarCarouselRef.current.style.transform = `translateX(${translate}px)`;
        }
    };

    const handleAvatarStart = (e: MouseEvent | TouchEvent): void => {
        setIsAvatarDragging(true);
        setAvatarStartX(getClientX(e));
        setAvatarPrevTranslate(avatarCurrentTranslate);
        setAvatarAnimationEnabled(false);
    };

    const handleAvatarMove = (e: MouseEvent | TouchEvent): void => {
        if (!isAvatarDragging) return;
        e.preventDefault();
        const dragDistance = getClientX(e) - avatarStartX;
        let newTranslate = avatarPrevTranslate + dragDistance;

        const maxTranslate = 0;
        const minTranslate = -(avatarData.length - (isMobile ? 1 : 3)) * getAvatarSlideWidth();
        newTranslate = Math.max(minTranslate, Math.min(newTranslate, maxTranslate));

        setAvatarSliderTransform(newTranslate);
        setAvatarCurrentTranslate(newTranslate);
    };

    const handleAvatarEnd = (): void => {
        setIsAvatarDragging(false);
        setAvatarAnimationEnabled(true);

        const movedBy = avatarCurrentTranslate - avatarPrevTranslate;
        const slideWidth = getAvatarSlideWidth();

        let newSlideIndex = currentAvatarSlide;

        if (Math.abs(movedBy) > slideWidth / 4) {
            if (movedBy > 0) {
                newSlideIndex = Math.max(0, currentAvatarSlide - 1);
            } else {
                newSlideIndex = Math.min(avatarData.length - (isMobile ? 1 : 3), currentAvatarSlide + 1);
            }
        }

        const snapTranslate = -newSlideIndex * slideWidth;
        setAvatarSliderTransform(snapTranslate);
        setCurrentAvatarSlide(newSlideIndex);
        setAvatarCurrentTranslate(snapTranslate);
    };

    const handleAvatarMouseLeave = (): void => {
        if (isAvatarDragging) {
            handleAvatarEnd();
        }
    };

    useEffect(() => {
        if (!isAvatarDragging) {
            const slideWidth = getAvatarSlideWidth();
            const snapTranslate = -currentAvatarSlide * slideWidth;
            setAvatarSliderTransform(snapTranslate);
            setAvatarCurrentTranslate(snapTranslate);
        }
    }, [currentAvatarSlide, isAvatarDragging, getAvatarSlideWidth]);


    const getClientX = (e: MouseEvent | TouchEvent): number => {
        return (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    };


    const avatarCursorClass = isAvatarDragging ? 'cursor-grabbing' : 'cursor-grab';
    const avatarSelectClass = isAvatarDragging ? 'select-none' : '';

    return (
        <Loyout>
            <Nav />

            <div className="relative w-full h-screen overflow-hidden pt-16">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/video-sala-2.mp4"
                    poster="/sala-limpia.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-white opacity-60 z-0"></div>

                <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4">
                    <ul className="flex items-center justify-center gap-5">
                        {serviceLogosData.map((service) => (
                            <li key={service.id}>
                                <ServiceLogoCard
                                    service={service}
                                    onClick={setActiveServiceId}
                                    isMobile={isMobile}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16 mt-16 md:mt-24">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
                    {serviceLogosData.find(s => s.id === activeServiceId)?.name}
                </h1>
                <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 min-h-[200px] flex items-center justify-center">
                    <p className="text-lg text-center text-gray-800">
                        {activeServiceContent || 'Selecciona un servicio para ver la información.'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Galería de Proyectos en Hogares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((img, index) => (
                        <div
                            key={index}
                            className="group relative rounded-xl shadow-xl overflow-hidden
                                    hover:shadow-blue-500/50  transition-shadow duration-300"
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

            <div className="relative py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-blue-800 font-bold text-4xl mb-8">¿Por qué elegirnos para tu hogar?</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center p-4">
                            <FaUsers className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Personal de Confianza</h3>
                            <p className="text-gray-600 text-center">Nuestro equipo es cuidadosamente seleccionado y de total confianza para entrar en tu hogar.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaShieldAlt className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Seguridad Garantizada</h3>
                            <p className="text-gray-600 text-center">Ofrecemos tranquilidad con seguros completos y un servicio realizado con el máximo cuidado.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaAward className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Resultados Excepcionales</h3>
                            <p className="text-gray-600 text-center">Años de experiencia en limpieza de hogares garantizan un brillo y limpieza que notarás al instante.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaSprayCan className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Productos Eco-Amigables</h3>
                            <p className="text-gray-600 text-center">Utilizamos productos de limpieza seguros para tu familia, mascotas y el medio ambiente.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestro Proceso de Limpieza Doméstica</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaCalendarAlt className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">1. Agenda Tu Servicio</h3>
                        <p className="text-gray-600 text-sm">Elige la fecha y hora que mejor se adapte a tu rutina desde nuestra plataforma o por teléfono.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaLaptop className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">2. Personalización</h3>
                        <p className="text-gray-600 text-sm">Define tus necesidades específicas, áreas de enfoque y cualquier instrucción especial para tu hogar.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaHandsHelping className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">3. Ejecución Profesional</h3>
                        <p className="text-gray-600 text-sm">Nuestro equipo llega puntualmente y realiza la limpieza con eficiencia y atención al detalle.</p>
                    </div>
                        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaCheckCircle className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">4. Disfruta tu Hogar</h3>
                        <p className="text-gray-600 text-sm">Relájate y disfruta de un hogar impecable, fresco y con un ambiente de bienestar.</p>
                    </div>
                </div>
            </div>

            <div className="relative py-16 md:py-24 overflow-hidden mt-16 md:mt-24 bg-blue-800">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/corporativo.mp4"
                    poster="/sala-limpia.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-blue-800 opacity-60 z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-white text-center text-3xl font-bold mb-8">Hogares Felices con Tersus</h2>

                    <div
                        className={`overflow-hidden ${avatarCursorClass} ${avatarSelectClass}`}
                        onMouseDown={handleAvatarStart}
                        onMouseMove={handleAvatarMove}
                        onMouseUp={handleAvatarEnd}
                        onMouseLeave={handleAvatarMouseLeave}
                        onTouchStart={handleAvatarStart}
                        onTouchMove={handleAvatarMove}
                        onTouchEnd={handleAvatarEnd}
                    >
                        <div
                            ref={avatarCarouselRef}
                            className={`flex ${avatarAnimationEnabled ? 'transition-transform duration-500 ease-in-out' : ''} gap-4`}
                        >
                            {avatarData.map((item) => (
                                <div key={item.id} className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/3'}`}>
                                    <TestimonialCard {...item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentAvatarSlide(prev => Math.max(0, prev - 1))}
                        className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-20"
                        aria-label="Anterior"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => setCurrentAvatarSlide(prev => Math.min(avatarData.length - (isMobile ? 1 : 3), prev + 1))}
                        className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-20"
                        aria-label="Siguiente"
                    >
                        &gt;
                    </button>

                    <div className="flex justify-center space-x-2 mt-4">
                        {Array.from({ length: Math.max(0, avatarData.length - (isMobile ? 1 : 3) + 1) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentAvatarSlide(index)}
                                className={`w-3 h-3 rounded-full ${
                                    currentAvatarSlide === index ? 'bg-white' : 'bg-gray-400'
                                }`}
                                aria-label={`Ir a slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-blue-800 py-16 md:py-24 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu hogar en un oasis de limpieza?</h2>
                    <p className="text-lg mb-8">Contáctanos hoy mismo para obtener una cotización personalizada y sin compromiso.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="https://wa.me/523323254619?text=Hola%2C%20me%20interesan%20sus%20servicios%20para%20el%20hogar." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2">
                            <FaWhatsapp /> Contáctanos por WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </Loyout>
    );
}