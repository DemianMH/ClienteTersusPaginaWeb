import "./globals.css";


interface LayoutProps {
  children: React.ReactNode; 
  title?: string; 
}

export default function loyout({ children, title ="Tersus" }: LayoutProps) {
  return(
    <>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title === "Tersus" ? "Tersus" : `Tersus | ${title}`}</title>
    </head>
    <body className="flex flex-col min-h-screen bg-gray-50">

      {children}

      
    </body>
    </html>
    </>
    
  );
}

