"use client";
import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react'; // Importa MouseEvent y TouchEvent
import { FaHeadphonesAlt, FaBuilding, FaHome, FaSprayCan, FaCouch, FaUsers, FaShieldAlt, FaAward, FaTools,FaWhatsapp  } from 'react-icons/fa';
import Image from 'next/image';

const data = [
  {
    image: '/lavanderia_lavadoras.png',
    title: 'lorem ipsum dolor ',
    category: 'Lavandería',
  },
  {
    image: '/tapiceria-trabajo.jpg',
    title: 'lorem ipsum dolor ',
    category: 'Tapiceria',
  },
  {
    image: '/sala-limpia-2.jpg',
    title: 'lorem ipsum dolor ',
    category: 'Limpieza de Hogar',
  },
  {
    image: '/sala-limpia-3.jpg',
    title: 'lorem ipsum dolor ',
    category: 'Limpieza Corporativa',
  },
  {
    image: '/productos-limpieza.jpg',
    title: 'lorem ipsum dolor ',
    category: 'Productos de Limpieza',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const whatsappLink = "https://wa.me/523323254619?text=Hola%2C%20me%20gustaria%20saber%20mas%20sobre%20sus%20servicios.";
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="h-[440px] flex flex-col justify-between items-start bg-cover bg-center shadow-md p-8 rounded-md"
    >
      <div>
        <p className="text-black shadow-black opacity-70 font-bold uppercase text-xs">
          {category}
        </p>
        <h3 className="font-extrabold text-black shadow-black leading-[1.2] text-[32px] mt-2 cursor-default">
          {title}
        </h3>
      </div>
      <button >
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center max-w-xs mx-auto">
          <FaWhatsapp />
        </a>
      </button>
    </div>
  );
}


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = data.length;
  

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const slidesToShow = isMobile ? 1 : 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + slidesToShow >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - slidesToShow : prev - 1));
  };

  useEffect(() => {
    if (currentSlide + slidesToShow > totalSlides) {
        setCurrentSlide(Math.max(0, totalSlides - slidesToShow));
    }
  }, [isMobile, currentSlide, slidesToShow, totalSlides]);

  // Lógica de arrastre
  const carouselTrackRef = useRef<HTMLDivElement>(null); 
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const getSlideWidth = (): number => { 
      if (carouselTrackRef.current && carouselTrackRef.current.parentElement) {
          const containerWidth = carouselTrackRef.current.parentElement.clientWidth;
          return containerWidth / slidesToShow;
      }
      return 0;
  };

  const setSliderTransform = (translate: number): void => {
      if (carouselTrackRef.current) {
          carouselTrackRef.current.style.transform = `translateX(${translate}px)`;
      }
  };

  const getClientX = (e: MouseEvent | TouchEvent): number => {
    return (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
  };

  const handleStart = (e: MouseEvent | TouchEvent): void => { 
      setIsDragging(true);
      setStartX(getClientX(e));
      setPrevTranslate(currentTranslate);
      setAnimationEnabled(false);
  };

  const handleMove = (e: MouseEvent | TouchEvent): void => { 
      if (!isDragging) return;
      const dragDistance = getClientX(e) - startX;
      let newTranslate = prevTranslate + dragDistance;

      const maxTranslate = 0;
      const minTranslate = -(totalSlides - slidesToShow) * getSlideWidth();
      newTranslate = Math.max(minTranslate, Math.min(newTranslate, maxTranslate));
      
      setSliderTransform(newTranslate);
      setCurrentTranslate(newTranslate);
  };

  const handleEnd = (): void => { 
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
  };

  const handleMouseLeave = (): void => { 
      if (isDragging) {
          handleEnd(); 
      }
  };

  useEffect(() => {
    if (!isDragging) {
        const slideWidth = getSlideWidth();
        const snapTranslate = -currentSlide * slideWidth;
        setSliderTransform(snapTranslate);
        setCurrentTranslate(snapTranslate);
    }
  }, [currentSlide, isMobile, totalSlides, slidesToShow, isDragging]);


  const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab';
  const selectClass = isDragging ? 'select-none' : '';


  return (
    <div>
      {/* Portada Inicio */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center pt-16">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/video-sala-3.mp4"
          poster="/sala-limpia.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        ></video>
        <div className="absolute inset-0 bg-blue-700 opacity-60 z-0"></div>

        <div className="shadow-white relative z-10 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-white flex items-center justify-center backdrop-blur-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <Image
                      src="/tersus-logo.png"
                      alt="Logo-tersus"
                      width={300}
                      height={300}
                      className="object-contain w-full h-full"
                      />
            </div>

        <div className="absolute -bottom-16 left-0 right-0 z-20 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/corporativo" className="bg-blue-700 text-white rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:scale-105">
                <FaBuilding className="text-4xl md:text-5xl mb-2" />
                <span className="text-sm md:text-base font-semibold">Corporativo</span>
              </a>
              <a href="/hogar" className="bg-green-500 text-white rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:scale-105">
                <FaHome className="text-4xl md:text-5xl mb-2" />
                <span className="text-sm md:text-base font-semibold">Hogar</span>
              </a>
              <a href="/productos" className="bg-blue-700 text-white rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:scale-105">
                <FaSprayCan className="text-4xl md:text-5xl mb-2" />
                <span className="text-sm md:text-base font-semibold">Productos</span>
              </a>
              <a href="/tapiceria" className="bg-blue-700 text-white rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:scale-105">
                <FaCouch className="text-4xl md:text-5xl mb-2" />
                <span className="text-sm md:text-base font-semibold">Tapicería</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sobre nosotros */}
      <div className="container mx-auto px-4 py-8  mt-5 ">
        <div className="w-full h-1 bg-green-500 my-8"></div>
        
        <h2 className='text-black text-center text-3xl font-bold mb-4'>Sobre nosotros</h2>
        <p className='text-black text-lg text-justify py-10'>Lorem ipsum dolor  adipisicing elit. Aliquid nemo inventore, nulla distinctio cum in! Repudiandae corrupti delectus repellendus, officiis culpa illum possimus sapiente temporibus nostrum ipsam quae aperiam velit!</p>

        {/* Video con Logo y Mascota */}
        <div >
            <div className="relative w-full h-64 md:h-96 rounded-xl shadow-lg overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/video-sala.mp4"
                    poster="/sala-limpia.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                ></video>

                <div className="absolute -top-2 md:-top-2 left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl z-30">
                    <Image
                      src="/tersus-logo.png"
                      alt="Logo-tersus"
                      width={50}
                      height={50}
                      className="object-contain w-full h-full"
                      />
                </div>

                <Image
                  src="/mascota-tersus.png"
                  alt="Mascota de Tersus"
                  width={400} 
                  height={400} 
                  className="absolute bottom-0 left-0 z-20 w-48 h-auto object-contain md:w-64 transform translate-x-[-15%] translate-y-[15%]"
                />
            </div>
        </div>
      </div>
      
      {/* Nuestros Servicios */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h2 className='text-black text-center text-3xl font-bold mb-4'>Nuestros Servicios</h2>
        <p className='text-black text-lg text-justify py-10'>Lorem ipsum dolor  adipisicing elit. Aliquid nemo inventore, nulla distinctio cum in! Repudiandae corrupti delectus repellendus, officiis culpa illum possimus sapiente temporibus nostrum ipsam quae aperiam velit!</p>
      </div>

      {/* Carrusel */}
      <div className="container mx-auto px-4 py-8 md:py-16 relative">
        <div 
          className={`overflow-hidden ${cursorClass} ${selectClass}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <div
            ref={carouselTrackRef}
            className={`flex ${animationEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
          >
            {data.map((item, index) => ( 
  <div key={index} className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/2'} p-2`}>
    <Card {...item} />
  </div>
))}
          </div>
        </div>

        {/* Botones de navegación del carrusel */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 md:-left-8 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 md:-right-8 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
          aria-label="Next slide"
        >
          &gt;
        </button>

        {/* Indicadores de puntos (dots) */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalSlides - slidesToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
          <div>
  {/* Sección: ¿Por qué elegirnos? */}
  <div className="relative py-16 md:py-24 overflow-hidden">
    <Image
      src="/sala-limpia.jpg" 
      alt="Fondo de la sección Por qué elegirnos"
      fill
      style={{ objectFit: 'cover' }}
      className="z-0"
    />
    <div className="absolute inset-0 bg-blue-900 opacity-80 z-0"></div>

    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
      <h2 className="text-white text-center font-bold text-4xl mb-4">¿Por qué elegirnos?</h2>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="flex flex-col items-center text-center p-4">
          <FaUsers className="text-green-500 text-5xl mb-2" />
          <h3 className="font-semibold text-white text-lg">Profesionales de Limpieza Calificados</h3>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <FaShieldAlt className="text-green-500 text-5xl mb-2" />
          <h3 className="font-semibold text-white text-lg">Totalmente Asegurados y Garantizados</h3>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <FaAward className="text-green-500 text-5xl mb-2" />
          <h3 className="font-semibold text-white text-lg">Personal Experimentado</h3>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <FaTools className="text-green-500 text-5xl mb-2" />
          <h3 className="font-semibold text-white text-lg">Suministros de Limpieza de Calidad</h3>
        </div>
      </div>

      <button className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
        <a href="">Cotizaciones</a>
      </button>
    </div>
  </div>
</div>


    </div>
  );
}