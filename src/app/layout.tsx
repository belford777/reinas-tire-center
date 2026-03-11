import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat, Source_Sans_3 } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/layout/CartDrawer';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans' });

export const metadata: Metadata = {
  title: "Reina's Tire Center LLC | Premium Auto Parts",
  description: "Trusted auto parts importer. OEM and aftermarket parts from worldwide manufacturers. Orlando, FL. Serving auto shops across America.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${montserrat.variable} ${sourceSans.variable}`}>
      <body className="font-body antialiased grain-overlay">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
