"use client"; 

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {

const phoneNumber = '523323254619'; 
const message = 'Hola, me gustaría solicitar más información.';

  // Codifica el mensaje para que sea seguro en una URL
const encodedMessage = encodeURIComponent(message);

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

return (
    <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-transform duration-300 ease-in-out hover:scale-110"
    aria-label="Contactar por WhatsApp"
    >
    <FaWhatsapp size={32} />
    </a>
);
};

export default WhatsAppButton;
