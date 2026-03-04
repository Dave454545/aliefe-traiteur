import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

// Police pour les titres (Luxe, Tradition)
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

// Police pour le texte (Moderne, Lisible)
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Alièfè Traiteur | L'Excellence Ivoirienne",
  description: "L'art de recevoir à l'ivoirienne. Traiteur d'exception au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${playfair.variable} ${outfit.variable} antialiased bg-stone-50`}>
        {children}
      </body>
    </html>
  );
}