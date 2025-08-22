import "./globals.css";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tersus | Inicio </title>
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}