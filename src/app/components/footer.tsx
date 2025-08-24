import { FaFacebookF, FaInstagram,  FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
return (
<footer className="bg-gray-100 py-8 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="flex flex-col items-center justify-center space-y-6">
                <nav>
                <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-700 text-sm md:text-base font-medium">
                    <li><a href="/nosotros" className="hover:text-blue-600 transition-colors duration-200">Sobre nosotros</a></li>
                    <li><a href="/tapiceria" className="hover:text-blue-600 transition-colors duration-200">Tapicería</a></li>
                    <li><a href="/lavanderia" className="hover:text-blue-600 transition-colors duration-200">Lavandería</a></li>
                    <li><a href="/productos" className="hover:text-blue-600 transition-colors duration-200">Productos de Limpieza</a></li>
                    <li><a href="/contacto" className="hover:text-blue-600 transition-colors duration-200">Contacto</a></li>
                </ul>
                </nav>
                <div className="flex space-x-6 mt-4">
                <a href="https://www.facebook.com/tersuscleanguadalajara" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-2xl">
                    <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/tersuscleangdl?igsh=bDF5ZDExa2lmaWVx" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-2xl">
                    <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@tersus.clean.gdl?_t=8gR9niEXuje&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-2xl">
                    <FaTiktok />
                </a>
                <a href="https://wa.me/523323254619?text=Hola%2C%20me%20gustaria%20saber%20mas%20sobre%20sus%20servicios" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-2xl">
                    <FaWhatsapp />
                </a>
                </div>
                <div className="text-center text-gray-500 text-xs mt-4">
                <p className="mb-1">© {new Date().getFullYear()} Tersus. Reservados todos los derechos.</p>
                <p>Pagina realizada por Primetech</p>
                </div>

            </div>
            </div>
        </footer>
);
}