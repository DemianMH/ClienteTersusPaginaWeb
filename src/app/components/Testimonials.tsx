// src/app/components/Testimonials.tsx
"use client";
import React from 'react';
import { FaStar, FaGoogle } from 'react-icons/fa';


const reviews = [
{
    name: 'Karol Gabriel Torres',
    text: 'Excelente servicio, y muy amables los que atienden.',
    rating: 5,
},
{
    name: 'Carlos Rodríguez',
    text: 'La mejor lavandería de la zona. Entregan a tiempo y la ropa siempre vuelve impecable y oliendo muy bien. ¡Totalmente recomendados!',
    rating: 5,
},
{
    name: 'Sofía Martínez',
    text: 'Contraté la limpieza profunda para mi oficina y el resultado superó mis expectativas. Gran atención al detalle. Nuestro espacio de trabajo nunca se había visto tan bien.',
    rating: 5,
},
];

const StarRating = ({ rating }: { rating: number }) => (
<div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
    <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
    ))}
</div>
);

const Testimonials = () => {
return (
    <div className="bg-gray-50 py-16 md:py-24">
    <div className="container mx-auto px-4 text-center">
        <h2 className="text-blue-800 font-bold text-4xl mb-4">Lo que dicen nuestros clientes</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Nos enorgullece la satisfacción de nuestros clientes. Estas son algunas de las opiniones que hemos recibido en Google.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-left flex flex-col">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                {review.name.charAt(0)}
                </div>
                <div>
                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                <StarRating rating={review.rating} />
                </div>
            </div>
            <p className="text-gray-700 italic flex-grow">{review.text}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-gray-500">
                <FaGoogle className="mr-2" />
                <span className="text-sm">Publicado en Google</span>
            </div>
            </div>
        ))}
        </div>
    </div>
    </div>
);
};

export default Testimonials;