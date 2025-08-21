// Tapiceria.tsx
"use client";

import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import Loyout from "../layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Image from 'next/image';
import { FaChair, FaTint, FaFeatherAlt, FaUsers, FaClock, FaHandsHelping, FaMagic,FaCheckCircle, FaWhatsapp } from 'react-icons/fa'; // Adjusted icons for upholstery context

interface ServiceItem {
    id: string;
    image: string;
    icon?: React.ElementType;
    name: string;
    content: string;
}

// Service Logos Data Section for Upholstery
const serviceLogosData: ServiceItem[] = [
    { id: 'sofas', image: '/Tapiceria-logo.png', name: 'Limpieza de Sofás y Sillones', content: 'Expertos en devolver la vida a tus sofás, eliminando manchas, olores y alérgenos. Adecuado para todo tipo de telas, dejando tus muebles frescos y como nuevos.' },
    { id: 'alfombras', image: '/Tersus-logo.png', name: 'Limpieza de Alfombras y Tapetes', content: 'Servicio profundo para alfombras y tapetes, eliminando suciedad incrustada y reviviendo los colores. Protegemos las fibras y extendemos la vida de tus revestimientos.' },
    { id: 'sillas_oficina', image: '/logolavanderia.png', name: 'Limpieza de Sillas de Oficina', content: 'Mantenemos tus sillas de oficina libres de manchas y suciedad, mejorando la higiene y la imagen de tu espacio de trabajo. Ideal para tela y piel sintética.' },
];

interface AvatarItem {
    id: number;
    image: string;
    name: string;
    testimonial: string;
}

// Avatar Data Section
const avatarData: AvatarItem[] = [
    { id: 1, image: '/persona5.jpg', name: 'Ana M., Ama de Casa', testimonial: "¡Mi casa nunca ha estado tan limpia y reluciente! El equipo de Tersus es muy profesional y confiable." },
    { id: 2, image: '/persona2.jpg', name: 'Carlos S., Dueño de Mascota', testimonial: "Con Tersus, no me preocupo por los pelos de mi perro. ¡Mis alfombras lucen como nuevas y el aire es fresco!" },
    { id: 3, image: '/persona3.jpg', name: 'Sofía L., Profesional Ocupada', testimonial: "Gracias a Tersus, tengo más tiempo para mí y mi familia. El servicio es impecable y se adaptan a mis horarios." },
    { id: 4, image: '/persona4.jpg', name: 'Roberto G., Decorador', testimonial: "La limpieza de tapicería fue asombrosa. Mis muebles antiguos parecen recién comprados. ¡Recomiendo Tersus a todos mis clientes!" },
    { id: 5, image: '/persona1.jpg', name: 'Familia R., Hogar Grande', testimonial: "Con tres niños, mantener la casa limpia era un desafío. Tersus lo hace parecer fácil. ¡Son la mejor inversión!" },
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
    isActive: boolean;
    onClick: (id: string) => void;
    isMobile: boolean;
}

function ServiceLogoCard({ service, isActive, onClick, isMobile }: ServiceLogoCardProps) {
    const baseSize = isMobile ? 100 : 150;
    const activeSize = isMobile ? 180 : 250;

    const currentSize = isActive ? activeSize : baseSize;

    return (
        <button
            onClick={() => onClick(service.id)}
            className={`flex-shrink-0 relative shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center p-0
                        ${isActive ? 'z-20' : ''}
                        ${isActive ? '' : 'rounded-full'}`}
            style={{ width: `${currentSize}px`, height: `${currentSize}px` }}
        >
            <Image
                src={service.image}
                alt={service.name}
                width={currentSize}
                height={currentSize}
                className={`object-contain ${isActive ? '' : 'rounded-full'}`}
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
            <p className="text-gray-600 text-sm italic">"{testimonial}"</p>
        </div>
    );
}

export default function Tapiceria() {
    // Set initial active service to the first upholstery service
    const [activeServiceId, setActiveServiceId] = useState('sofas');
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

    const getAvatarSlideWidth = (): number => {
        if (avatarCarouselRef.current && avatarCarouselRef.current.children.length > 0) {
            const firstCard = avatarCarouselRef.current.children[0] as HTMLElement;
            return firstCard.offsetWidth + 16;
        }
        return 0;
    };

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

    // Main Component Structure
    return (
        <Loyout title="Servicios de Limpieza de Tapicería">
            <Nav />

            <div className="relative w-full h-screen overflow-hidden pt-16">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/corporativo.mp4" // General video, ideally replace with upholstery-specific one
                    poster="/Tapiceria-logo.png" // Using upholstery logo as poster
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
                    <ul className="flex items-center justify-center gap-6">
                        {serviceLogosData.map((service) => (
                            <li key={service.id}>
                                <ServiceLogoCard
                                    service={service}
                                    isActive={activeServiceId === service.id}
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

            <div className="container mx-auto px-4 py-16 md:py-24 mt-16 md:mt-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestros Proyectos de Tapicería</h2>
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
                    <h2 className="text-blue-800 font-bold text-4xl mb-8">¿Por qué confiar la limpieza de tu tapicería?</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center p-4">
                            <FaChair className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Especialistas en Telas</h3>
                            <p className="text-gray-600 text-center">Conocimiento profundo de fibras y tratamientos para cada tipo de tapicería.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaTint className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Eliminación de Manchas</h3>
                            <p className="text-gray-600 text-center">Técnicas avanzadas para remover manchas y olores sin dañar tus muebles.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaFeatherAlt className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Secado Rápido</h3>
                            <p className="text-gray-600 text-center">Minimizamos el tiempo de secado para que puedas disfrutar de tus muebles pronto.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaMagic className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Renovación Total</h3>
                            <p className="text-gray-600 text-center">No solo limpiamos, restauramos la apariencia y el confort de tu tapicería.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestro Proceso de Limpieza de Tapicería</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaClock className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">1. Evaluación Inicial</h3>
                        <p className="text-gray-600 text-sm">Inspeccionamos el tipo de tela y el estado de la tapicería para un plan a medida.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaHandsHelping className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">2. Pre-Tratamiento</h3>
                        <p className="text-gray-600 text-sm">Aplicamos soluciones específicas para manchas y suciedad incrustada.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaChair className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">3. Limpieza Profunda</h3>
                        <p className="text-gray-600 text-sm">Utilizamos equipos de extracción para una limpieza a fondo y eficiente.</p>
                    </div>
                        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaCheckCircle className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">4. Secado y Revisión</h3>
                        <p className="text-gray-600 text-sm">Aseguramos un secado óptimo y una inspección final de calidad.</p>
                    </div>
                </div>
            </div>

            <div className="relative py-16 md:py-24 overflow-hidden mt-16 md:mt-24 bg-blue-800">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/corporativo.mp4" // General video
                    poster="/Tapiceria-logo.png"
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
                    <h2 className="text-white text-center text-3xl font-bold mb-8">Testimonios de Tapicería</h2>

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
                    <h2 className="text-4xl font-bold mb-6">¿Tus muebles necesitan un respiro?</h2>
                    <p className="text-lg mb-8">Contáctanos para una cotización personalizada de limpieza de tapicería.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="https://wa.me/523323254619?text=Hola%2C%20me%20interesan%20sus%20servicios%20de%20tapiceria." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2">
                            <FaWhatsapp /> Contáctanos por WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </Loyout>
    );
}