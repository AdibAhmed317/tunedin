import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation/bottom-nav';
import Player from '@/components/player/mini-player';
import { Toaster } from '@/components/ui/toaster';
import { PlayerProvider } from '@/contexts/player-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TunedIn - Audio Player',
  description: 'Your personal music library',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#18181b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} pb-28`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <PlayerProvider>
            <div className='min-h-screen bg-background'>
              {children}
              <Player />
              <Navigation />
            </div>
            <Toaster />
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
