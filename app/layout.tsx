import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Manrope, Cormorant_Garamond } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

// Premium fonts
const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
    weight: ['400', '500', '600', '700']
});

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-manrope',
    weight: ['200', '300', '400', '500', '600', '700', '800']
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cormorant',
    weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'Matej Pacan | 1-on-1 Coaching',
    description: 'Join my exclusive 1-on-1 coaching program at 75% off the regular price. 2 spots available every 6 months.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${manrope.variable} ${cormorant.variable}`}>
            <body className={manrope.className}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
