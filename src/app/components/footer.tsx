"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';

const logoLinks = [
    { src: '/Tersus-logo.png', href: '/', alt: 'Tersus Principal', label: 'Inicio' },
    { src: '/logolavanderia.png', href: '/lavanderia', alt: 'Lavandería', label: 'Lavandería y tintorería' },
    { src: '/Tapiceria-logo.png', href: '/tapiceria', alt: 'Tapicería', label: 'Lavado y retapizado de muebles' },
    { src: '/Productos-logo.png', href: '/productos', alt: 'Productos', label: 'Productos de limpieza' },
];

const textLinks = [
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export default function Nav() {
    const [mainLogo, setMainLogo] = useState(logoLinks[0]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dropdownLogos = useMemo(() => 
        logoLinks.filter(logo => logo.href !== mainLogo.href),
        [mainLogo]
    );

    const handleMobileLinkClick = useCallback((logo: typeof logoLinks[number] | null) => {
        if (logo) {
            setMainLogo(logo);
        }
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
                <div className="container mx-auto px-4 flex justify-between items-center h-16">
                    <div className="hidden md:flex flex-1"></div>
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="relative group">
                            <Link href={mainLogo.href}>
                                <Image 
                                    src={mainLogo.src} 
                                    alt={mainLogo.alt} 
                                    width={50} 
                                    height={50} 
                                    style={{objectFit: "contain"}} 
                                    className="transition-transform duration-300 group-hover:scale-110"
                                    priority // Prioriza la carga del logo principal
                                />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-[-10px]">
                                <div className="flex items-center gap-x-5">
                                    {dropdownLogos.map((logo) => (
                                        <Link key={logo.href} href={logo.href} onClick={() => setMainLogo(logo)} className="transition-transform hover:scale-110">
                                            <div className="bg-white/30 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                                                <Image 
                                                    src={logo.src} 
                                                    alt={logo.alt} 
                                                    width={150} 
                                                    height={150} 
                                                    className="rounded-full"
                                                    loading="lazy" // Carga diferida para logos del menú
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end">
                        <ul className="flex space-x-8 items-center">
                            {textLinks.map((link) => (
                                <li key={link.href}><Link href={link.href} className="text-gray-700 font-semibold hover:text-blue-600 transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:hidden flex-1">
                        <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menú">
                            <MenuIcon className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>
                    <div className="md:hidden flex-1 flex justify-center">
                        <Link href={mainLogo.href}>
                            <Image 
                                src={mainLogo.src} 
                                alt={mainLogo.alt} 
                                width={50} 
                                height={50} 
                                style={{objectFit: "contain"}}
                                priority // Prioriza también el logo principal en móvil
                            />
                        </Link>
                    </div>
                    <div className="md:hidden flex-1"></div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`fixed top-0 left-0 bottom-0 bg-white w-80 shadow-xl p-5 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full pt-4">
                        <nav className="flex flex-col gap-y-2 text-lg">
                            <Link 
                                href="/" 
                                onClick={() => handleMobileLinkClick(logoLinks[0])} 
                                className={`flex items-center gap-x-4 py-3 px-2 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                style={{ transitionDelay: '150ms' }}
                            >
                                <HomeIcon className="h-6 w-6 text-blue-600" />
                                <span className="font-semibold text-gray-700">Inicio</span>
                            </Link>
                            <hr className="my-2" />
                            {logoLinks.filter(l => l.href !== '/').map((logo, index) => (
                                <Link 
                                    key={logo.href} 
                                    href={logo.href} 
                                    onClick={() => handleMobileLinkClick(logo)} 
                                    className={`flex items-center gap-x-4 py-2 px-2 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    style={{ transitionDelay: `${200 + index * 75}ms` }}
                                >
                                    <Image 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        width={50} 
                                        height={50} 
                                        className="rounded-full bg-white/30 backdrop-blur-md p-0.5"
                                        loading="lazy" // Carga diferida para logos del menú
                                    />
                                    <span className="font-semibold text-gray-700 text-base">{logo.label}</span>
                                </Link>
                            ))}
                            <hr className="my-2" />
                            {textLinks.map((link, index) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href} 
                                    onClick={() => handleMobileLinkClick(null)} 
                                    className={`py-3 px-2 rounded-md hover:bg-gray-100 font-semibold text-gray-700 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    style={{ transitionDelay: `${200 + (logoLinks.length - 1) * 75 + (index + 1) * 75}ms` }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
