import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTiktok, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
    { href: "https://www.facebook.com/tersuscleanguadalajara", icon: FaFacebook, label: 'Facebook', color: "text-blue-600 hover:text-blue-700" },
    { href: "https://www.instagram.com/tersuscleangdl?igsh=bDF5ZDExa2lmaWVx", icon: FaInstagram, label: 'Instagram', color: "text-pink-600 hover:text-pink-700" },
    { href: "https://www.tiktok.com/@tersus.clean.gdl?_t=8gR9niEXuje&_r=1", icon: FaTiktok, label: 'TikTok', color: "text-black hover:text-gray-700" },
    { href: "https://wa.me/523323254619?text=Hola%2C%20me%20gustaria%20saber%20mas%20sobre%20sus%20servicios.", icon: FaWhatsapp, label: 'WhatsApp', color: "text-green-500 hover:text-green-600" },
];

const serviceLinks = [
    { href: '/lavanderia', label: 'Lavandería y Tintorería' },
    { href: '/tapiceria', label: 'Lavado y Retapizado' },
    { href: '/productos', label: 'Productos de Limpieza' },
];

const companyLinks = [
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

const contactInfo = {
    address: "Nte. 7 453-Int 202, Conjunto Laureles, 45157 Zapopan, Jal.",
    phone: "+52 33 2325 4619",
    email: "tersuscleangdl@gmail.com",
};

export default function Footer() {
    return (
        <footer className="bg-slate-100 text-gray-800 border-t border-slate-200">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="mb-4">
                            <Image
                                src="/tersus-logo.png"
                                alt="Tersus Clean Logo"
                                width={120}
                                height={120}
                            />
                        </Link>
                        <p className="text-gray-600 text-center md:text-left text-sm">
                            Soluciones integrales de limpieza para tu hogar y negocio.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map(link => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={`${link.color} transition-transform hover:scale-110`}>
                                    <link.icon className="h-7 w-7" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900">Nuestros Servicios</h3>
                        <ul className="space-y-2">
                            {serviceLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900">Compañía</h3>
                        <ul className="space-y-2">
                            {companyLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900">Contacto</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-blue-600" />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="h-5 w-5 mr-3 text-blue-600" />
                                <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600 transition-colors">{contactInfo.phone}</a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="h-5 w-5 mr-3 text-blue-600" />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 transition-colors break-all">{contactInfo.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-300 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Tersus Clean. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}