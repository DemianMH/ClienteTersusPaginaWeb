// Lavanderia.tsx
"use client";

import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import Loyout from "../layout";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Image from 'next/image';
import { FaTshirt, FaHandsHelping, FaClock, FaCheckCircle, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'; // Adjusted icons for laundry context

interface ServiceItem {
    id: string;
    image: string;
    icon?: React.ElementType;
    name: string;
    content: string;
}

// Service Logos Data Section for Laundry
const serviceLogosData: ServiceItem[] = [
    { id: 'lavanderia_autoservicio', image: '/logolavanderia.png', name: 'Lavandería Autoservicio', content: 'Utiliza nuestras modernas máquinas de lavado y secado de alta eficiencia para tus prendas. Ambiente cómodo y siempre limpio.' },
];

interface AvatarItem {
    id: number;
    image: string;
    name: string;
    testimonial: string;
}

// Avatar Data Section for Laundry Testimonials
const avatarData: AvatarItem[] = [
    { id: 1, image: '/logolavanderia.png', name: 'Laura G., Estudiante', testimonial: "¡La lavandería de Tersus es mi salvación! Rápida, limpia y siempre tienen espacio. ¡Me encanta el autoservicio!" },
    { id: 2, image: '/mascota-tersus.png', name: 'Pedro R., Gerente', testimonial: "Mis camisas siempre perfectas. El servicio de planchado es de primera y me ahorra muchísimo tiempo cada semana." },
    { id: 3, image: '/Tersus-logo.png', name: 'Mónica V., Mamá', testimonial: "Dejo la ropa de toda mi familia y siempre me la entregan impecable y bien doblada. Un servicio súper confiable." },
    { id: 4, image: '/sala-limpia.jpg', name: 'Diego L., Viajero', testimonial: "Ideal para cuando estoy de paso, lavo y seco mi ropa rápidamente. Las instalaciones son muy cómodas y seguras." },
    { id: 5, image: '/Tapiceria-logo.png', name: 'Carmen H., Diseñadora', testimonial: "Mis telas delicadas las confío solo a Tersus. El cuidado que le dan a la ropa es excepcional. ¡Siempre impecable!" },
];

const galleryImages = [
    { src: '/logolavanderia.png', alt: 'Máquinas de lavandería modernas' },
    { src: '/sala-limpia.jpg', alt: 'Ropa planchada y doblada' },
    { src: '/Tersus-logo.png', alt: 'Interior de lavandería limpio' },
    { src: '/mascota-tersus.png', alt: 'Canastas de ropa organizada' },
    { src: '/Tapiceria-logo.png', alt: 'Detalle de planchado profesional' },
];

interface ServiceLogoCardProps {
    service: ServiceItem;
    isActive: boolean;
    onClick: (id: string) => void;
    isMobile: boolean;
}

function ServiceLogoCard({ service, isActive, onClick, isMobile }: ServiceLogoCardProps) {
    const baseSize = isMobile ? 500 : 500;
    const activeSize = isMobile ? 500 : 500;

    const currentSize = isActive ? activeSize : baseSize;

    return (
        <button
            onClick={() => onClick(service.id)}
            className={`flex-shrink-0 relative transition-all duration-300 ease-in-out flex items-center justify-center p-0
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

export default function Lavanderia() {
    // CAMBIO CLAVE: Cambiado de 'lavado_secado' a 'lavanderia_autoservicio' para que el logo de lavandería sea grande por defecto
    const [activeServiceId, setActiveServiceId] = useState('lavanderia_autoservicio');
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
        <Loyout title="Servicios de Lavandería y Planchaduría">
            <Nav />

            <div className="relative w-full h-screen overflow-hidden pt-16">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/corporativo.mp4" // Reusing general video for now, ideally replace with a laundry-specific one
                    poster="/logolavanderia.png" // Using laundry logo as poster
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
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestras Instalaciones y Trabajos</h2>
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
                    <h2 className="text-blue-800 font-bold text-4xl mb-8">¿Por qué elegir nuestra Lavandería?</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center p-4">
                            <FaTshirt className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Cuidado Experto de Prendas</h3>
                            <p className="text-gray-600 text-center">Tratamos cada prenda con el cuidado que merece, desde ropa diaria hasta delicados.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaClock className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Servicio Rápido y Eficiente</h3>
                            <p className="text-gray-600 text-center">Optimizamos nuestros procesos para que tengas tu ropa limpia y lista en el menor tiempo.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaHandsHelping className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Comodidad Total</h3>
                            <p className="text-gray-600 text-center">Ya sea autoservicio o servicio completo, tu comodidad es nuestra prioridad.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <FaCheckCircle className="text-blue-600 text-5xl mb-3" />
                            <h3 className="font-semibold text-gray-800 text-xl mb-2">Calidad Garantizada</h3>
                            <p className="text-gray-600 text-center">Utilizamos productos de alta calidad y equipos modernos para resultados impecables.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Nuestro Proceso de Lavado y Planchado</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaTshirt className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">1. Entrega/Selección</h3>
                        <p className="text-gray-600 text-sm">Elige autoservicio o entrega tu ropa para lavado y/o planchado.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaHandsHelping className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">2. Proceso Profesional</h3>
                        <p className="text-gray-600 text-sm">Lavado con equipos de última generación y planchado experto.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaClock className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">3. Listo en Tiempo Récord</h3>
                        <p className="text-gray-600 text-sm">Tu ropa limpia, seca y planchada, lista para recoger en poco tiempo.</p>
                    </div>
                        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                        <FaCheckCircle className="text-green-500 text-5xl mb-3" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">4. Ropa Impecable</h3>
                        <p className="text-gray-600 text-sm">Disfruta de la frescura y la suavidad de tus prendas como nuevas.</p>
                    </div>
                </div>
            </div>

            <div className="relative py-16 md:py-24 overflow-hidden mt-16 md:mt-24 bg-blue-800">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/corporativo.mp4" // Reusing general video
                    poster="/logolavanderia.png"
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
                    <h2 className="text-white text-center text-3xl font-bold mb-8">Nuestros Clientes lo Confirman</h2>

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

            <div className="container mx-auto px-4 py-16 md:py-24">
                <h2 className="text-blue-800 font-bold text-4xl text-center mb-12">Encuéntranos Aquí</h2>
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-gray-700 text-lg mb-4 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                        Visítanos en nuestra ubicación: Av. Independencia 2550, 45200 Granja Luz Aidé, Jal.
                    </p>
                    <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-500 text-sm">      
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1866.5204480068305!2d-103.41604562410777!3d20.73039755866173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428aee658df8d07%3A0xc484b93b8f67341e!2sAv.%20Independencia%202550%2C%20Granja%20Luz%20Aid%C3%A9%2C%2045200%20Zapopan%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx" // Reemplaza esto con tu src real
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de nuestra lavandería"
                        ></iframe>
                    </div>
                    <a
                        href="https://share.google/iUQlv2KOJdRnoRkQa" // Your original share link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        <FaMapMarkerAlt className="mr-2" /> Abrir en Google Maps
                    </a>
                </div>
            </div>

            <div className="bg-blue-800 py-16 md:py-24 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">¿Listo para una experiencia de lavado y planchado sin igual?</h2>
                    <p className="text-lg mb-8">Contáctanos hoy mismo para resolver tus dudas o visitarnos.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="https://wa.me/523323254619?text=Hola%2C%20me%20interesan%20sus%20servicios%20de%20lavanderia." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2">
                            <FaWhatsapp /> Contáctanos por WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </Loyout>
    );
}