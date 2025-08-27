"use client";
import React, { useState, useEffect, useRef, MouseEvent, TouchEvent, useCallback } from 'react';
import { FaUsers, FaShieldAlt, FaAward, FaTools, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const data = [
    { image: '/lavanderiascamaras.png', title: 'Servicios de Lavandería de Primera Calidad', category: 'Lavandería' },
    { image: '/sala-limpia-4.jpg', title: 'Renovación y Cuidado para tus Muebles', category: 'Tapiceria' },
    { image: '/sala-limpia-6.jpg', title: 'Tu Hogar Impecable, Nuestro Compromiso', category: 'Limpieza de Hogar' },
    { image: '/oficinas.jpg', title: 'Espacios de Trabajo Limpios y Productivos', category: 'Limpieza Corporativa' },
    { image: '/productos-limpieza.jpg', title: 'Los Mejores Productos para una Limpieza Perfecta', category: 'Productos de Limpieza' },
];

interface CardProps {
    image: string;
    title: string;
    category: string;
}

const Card = React.memo(function Card({ image, title, category }: CardProps) {
    const whatsappLink = "https://wa.me/523323254619?text=Hola%2C%20me%20gustaria%20saber%20mas%20sobre%20sus%20servicios.";
    return (
        <div style={{ backgroundImage: `url(${image})` }} className="relative h-[440px] bg-cover bg-center shadow-md rounded-md overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col justify-between h-full p-6">
                <div>
                    <p className="text-white font-bold uppercase text-xs tracking-wider">{category}</p>
                    <h3 className="font-extrabold text-white leading-[1.2] text-[32px] mt-2 cursor-default drop-shadow-lg">{title}</h3>
                </div>
                <div className="absolute bottom-0 left-0 w-80 h-auto">
                    <Image
                        src="/mascota-tersus-segundaP.png"
                        alt="Mascota Tersus"
                        width={200}
                        height={200}
                        className="object-contain"
                        loading="lazy"
                    />
                </div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors shadow-lg">
                    <FaWhatsapp className="h-6 w-6" />
                </a>
            </div>
        </div>
    );
});

export default function Inicio() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = data.length;
    const [slidesToShow, setSlidesToShow] = useState(2);
    const carouselTrackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [animationEnabled, setAnimationEnabled] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const playPauseBtnRef = useRef<HTMLButtonElement>(null);
    const controlsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setSlidesToShow(window.innerWidth < 640 ? 1 : 2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + slidesToShow >= totalSlides ? 0 : prev + 1));
    }, [slidesToShow, totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - slidesToShow : prev - 1));
    }, [slidesToShow, totalSlides]);

    useEffect(() => {
        if (currentSlide + slidesToShow > totalSlides) {
            setCurrentSlide(Math.max(0, totalSlides - slidesToShow));
        }
    }, [currentSlide, slidesToShow, totalSlides]);

    const getSlideWidth = useCallback((): number => {
        if (carouselTrackRef.current && carouselTrackRef.current.parentElement) {
            const containerWidth = carouselTrackRef.current.parentElement.clientWidth;
            return containerWidth / slidesToShow;
        }
        return 0;
    }, [slidesToShow]);

    const setSliderTransform = useCallback((translate: number): void => {
        if (carouselTrackRef.current) {
            carouselTrackRef.current.style.transform = `translateX(${translate}px)`;
        }
    }, []);

    const getClientX = (e: MouseEvent | TouchEvent): number => {
        return (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    };

    const handleStart = (e: MouseEvent | TouchEvent): void => {
        setIsDragging(true);
        setStartX(getClientX(e));
        setPrevTranslate(currentTranslate);
        setAnimationEnabled(false);
    };

    const handleMove = useCallback((e: MouseEvent | TouchEvent): void => {
        if (!isDragging) return;
        const dragDistance = getClientX(e) - startX;
        let newTranslate = prevTranslate + dragDistance;
        const maxTranslate = 0;
        const minTranslate = -(totalSlides - slidesToShow) * getSlideWidth();
        newTranslate = Math.max(minTranslate, Math.min(newTranslate, maxTranslate));
        setSliderTransform(newTranslate);
        setCurrentTranslate(newTranslate);
    }, [isDragging, startX, prevTranslate, totalSlides, slidesToShow, getSlideWidth, setSliderTransform]);

    const handleEnd = useCallback((): void => {
        setIsDragging(false);
        setAnimationEnabled(true);
        const movedBy = currentTranslate - prevTranslate;
        const slideWidth = getSlideWidth();
        let newSlideIndex = currentSlide;
        if (movedBy > 50 && currentSlide > 0) {
            newSlideIndex = currentSlide - 1;
        } else if (movedBy < -50 && currentSlide < totalSlides - slidesToShow) {
            newSlideIndex = currentSlide + 1;
        }
        const snapTranslate = -newSlideIndex * slideWidth;
        setSliderTransform(snapTranslate);
        setCurrentSlide(newSlideIndex);
        setCurrentTranslate(snapTranslate);
    }, [currentTranslate, prevTranslate, getSlideWidth, currentSlide, totalSlides, slidesToShow, setSliderTransform]);

    const handleMouseLeave = useCallback((): void => {
        if (isDragging) {
            handleEnd();
        }
    }, [isDragging, handleEnd]);

    useEffect(() => {
        if (!isDragging) {
            const slideWidth = getSlideWidth();
            const snapTranslate = -currentSlide * slideWidth;
            setSliderTransform(snapTranslate);
            setCurrentTranslate(snapTranslate);
        }
    }, [currentSlide, isDragging, getSlideWidth, setSliderTransform]);

    useEffect(() => {
        const video = videoRef.current;
        const playPauseBtn = playPauseBtnRef.current;
        const controlsContainer = controlsContainerRef.current;

        if (!video || !playPauseBtn || !controlsContainer) return;

        const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

        const togglePlayPause = () => {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        };

        const hideControls = () => {
            controlsContainer.style.opacity = '0';
            controlsContainer.style.pointerEvents = 'none';
        };

        const showControls = () => {
            controlsContainer.style.opacity = '1';
            controlsContainer.style.pointerEvents = 'auto';
        };

        const updateUI = () => {
            if (video.paused || video.ended) {
                playPauseBtn.innerHTML = playIcon;
                showControls();
            } else {
                playPauseBtn.innerHTML = pauseIcon;
                hideControls();
            }
        };

        video.addEventListener('play', updateUI);
        video.addEventListener('pause', updateUI);
        video.addEventListener('ended', updateUI);
        
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });

        video.addEventListener('click', togglePlayPause);

        return () => {
            video.removeEventListener('play', updateUI);
            video.removeEventListener('pause', updateUI);
            video.removeEventListener('ended', updateUI);
            playPauseBtn.removeEventListener('click', togglePlayPause);
            video.removeEventListener('click', togglePlayPause);
        };
    }, []);

    const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab';
    const selectClass = isDragging ? 'select-none' : '';

    return (
        <div>
            <div className="relative w-full h-screen flex flex-col justify-center items-center pt-16">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/video-sala-3.mp4"
                    poster="/sala-limpia.jpg"
                    autoPlay loop muted playsInline preload="auto"
                ></video>
                <div className="absolute inset-0 bg-blue-700 opacity-20 z-0"></div>
                <div className="shadow-white relative z-10 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-white flex items-center justify-center backdrop-blur-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <Image
                        src="/tersus-logo.png"
                        alt="Logo-tersus"
                        width={300}
                        height={300}
                        className="object-contain w-full h-full p-4"
                        priority
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 mt-5 ">
                <div className="w-full h-1 bg-green-500 my-8"></div>
                <h2 className='text-black text-center text-3xl font-bold mb-4'>Sobre nosotros</h2>
                <p className='text-black text-lg text-justify py-10'>Somos un equipo de profesionales dedicados a ofrecerte soluciones de limpieza integrales. Nuestra misión es transformar tus espacios, brindando un ambiente fresco, saludable y reluciente. Con años de experiencia y productos de la más alta calidad, garantizamos tu satisfacción en cada servicio.</p>
                <div>
                    <div className="group relative w-full h-64 md:h-[500px] rounded-xl shadow-lg">
                        <video
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                            src="/videoTersusListo.mp4"
                            poster="/sala-limpia.jpg"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        ></video>
                        <div className="absolute -top-2 md:-top-2 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-xl z-30">
                            <Image src="/tersus-logo.png" alt="Logo-tersus" width={40} height={40} className="object-contain" loading="lazy" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-40 h-auto z-10 transform translate-y-[10%]">
                            <Image
                                src="/mascota-enmarco.png"
                                alt="Mascota Tersus"
                                width={100}
                                height={100}
                                className="object-contain"
                                loading="lazy"
                            />
                        </div>
                        <div
                            ref={controlsContainerRef}
                            className="absolute inset-0 flex justify-center items-center bg-black/30 transition-opacity duration-300 z-20 rounded-xl"
                        >
                            <button
                                ref={playPauseBtnRef}
                                className="bg-white/30 text-white backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center transform hover:scale-110 transition-transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <h2 className='text-black text-center text-3xl font-bold mb-4'>Nuestros Servicios</h2>
                <p className='text-black text-lg text-justify py-10'>Ofrecemos una amplia gama de servicios de limpieza para satisfacer todas tus necesidades. Desde la limpieza profunda de tu hogar hasta soluciones corporativas especializadas, nuestro equipo está listo para brindarte un servicio de excelencia. Descubre todo lo que podemos hacer por ti.</p>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16 relative">
                <div
                    className={`overflow-hidden ${cursorClass} ${selectClass}`}
                    onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleMouseLeave}
                    onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
                >
                    <div ref={carouselTrackRef} className={`flex ${animationEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}>
                        {data.map((item) => (
                            <div key={item.image} className={`flex-shrink-0 ${slidesToShow === 1 ? 'w-full' : 'w-1/2'} p-2`}>
                                <Card {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-8 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10" aria-label="Previous slide">&lt;</button>
                <button onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-8 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10" aria-label="Next slide">&gt;</button>
                <div className="flex justify-center space-x-2 mt-4">
                    {Array.from({ length: totalSlides - slidesToShow + 1 }).map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`} aria-label={`Go to slide ${index + 1}`}></button>
                    ))}
                </div>
            </div>

            <div>
                <div className="relative py-16 md:py-24 overflow-hidden">
                    <Image src="/sala-limpia.jpg" alt="Fondo de la sección Por qué elegirnos" fill style={{ objectFit: 'cover' }} className="z-0" loading="lazy" />
                    <div className="absolute inset-0 bg-blue-900 opacity-80 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                        <h2 className="text-white text-center font-bold text-4xl mb-4">¿Por qué elegirnos?</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            <div className="flex flex-col items-center text-center p-4"><FaUsers className="text-green-500 text-5xl mb-2" /><h3 className="font-semibold text-white text-lg">Profesionales de Limpieza Calificados</h3></div>
                            <div className="flex flex-col items-center text-center p-4"><FaShieldAlt className="text-green-500 text-5xl mb-2" /><h3 className="font-semibold text-white text-lg">Totalmente Asegurados y Garantizados</h3></div>
                            <div className="flex flex-col items-center text-center p-4"><FaAward className="text-green-500 text-5xl mb-2" /><h3 className="font-semibold text-white text-lg">Personal Experimentado</h3></div>
                            <div className="flex flex-col items-center text-center p-4"><FaTools className="text-green-500 text-5xl mb-2" /><h3 className="font-semibold text-white text-lg">Suministros de Limpieza de Calidad</h3></div>
                        </div>
                        <Link href="/contacto" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors">
                            Cotizaciones
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}