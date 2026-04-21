import type {Metadata} from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Eng. Shehab Elebady - The Math Star',
  description: 'Interactive Bio and Resource Portal',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
