"use client";
import React, { useState } from 'react';
import { FaHeadphonesAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function Nav() {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <a href="/" className="flex items-center text-blue-600 text-2xl font-bold no-underline">
        <Image
        src="/tersus-logo.png"
        alt="Logo-tersus"
        width={50}
        height={50}
        className="hover:scale-3d"
        />
        </a>
        <div className="md:hidden">
        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 focus:outline-none focus:text-gray-800"
            aria-label="Toggle navigation"
        >
            {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            )}
        </button>
        </div>

        <ul className={`md:flex md:space-x-8 md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none py-4 md:py-0 px-4 md:px-0 z-10 w-full md:w-auto`}>
        <li><a href="/" className="block py-2 md:py-0 text-blue-600 font-semibold hover:text-blue-700">Inicio</a></li>
        <li><a href="/nosotros" className="block py-2 md:py-0 text-gray-700 font-semibold hover:text-blue-600">Nosotros</a></li>
        
        <li className="relative">
            <button
            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
            className="flex items-center text-gray-700 font-semibold hover:text-blue-600 py-2 md:py-0 focus:outline-none"
            aria-expanded={isServicesDropdownOpen}
            aria-haspopup="true"
            >
            Servicios
            <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </button>
            {isServicesDropdownOpen && (
            <ul className="absolute md:top-full left-0 md:left-auto md:right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                <li><a href="/hogar" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Hogar</a></li>
                <li><a href="/corporativo" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Corporativo</a></li>
                <li><a href="/productos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Productos</a></li>
                <li><a href="/lavanderia" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Lavandería</a></li>
                <li><a href="/tapiceria" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Tapicería</a></li>
            </ul>
            )}
        </li>
        
        <li><a href="/contacto" className="block py-2 md:py-0 text-gray-700 font-semibold hover:text-blue-600">Contacto</a></li>
        </ul>
    </div>
    </nav>
);
}