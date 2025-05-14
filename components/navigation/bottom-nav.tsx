'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Shuffle, Music, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/contexts/player-context';

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { toggleShuffle, isShuffle, currentTrack } = usePlayer();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (path: string) => {
    if (path === '/playlists') {
      return (
        pathname === '/' ||
        pathname === '/playlists' ||
        pathname.startsWith('/playlists/')
      );
    }
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 border-t bg-background/80 backdrop-blur-lg'>
      <nav className='w-full max-w-md mx-auto'>
        <ul className='flex items-center justify-between p-2'>
          <NavItem
            href='/playlists'
            icon={<Home className='h-5 w-5' />}
            label='Home'
            isActive={isActive('/playlists')}
          />
          <NavItem
            href='/favorites'
            icon={<Heart className='h-5 w-5' />}
            label='Favorites'
            isActive={isActive('/favorites')}
          />
          <NavItem
            href='/search'
            icon={<Search className='h-5 w-5' />}
            label='Search'
            isActive={isActive('/search')}
          />

          {/* <NavButton
            onClick={toggleShuffle}
            icon={
              <Shuffle className={cn('h-5 w-5', isShuffle && 'text-primary')} />
            }
            label='Shuffle'
            isActive={isShuffle}
          /> */}
          {/* <NavItem
            href={currentTrack ? `/play/${currentTrack.id}` : '/play'}
            icon={<Music className='h-5 w-5' />}
            label='Playing'
            isActive={isActive('/play')}
            disabled={!currentTrack}
          /> */}
          <NavItem
            href='/profile'
            icon={<User className='h-5 w-5' />}
            label='Profile'
            isActive={isActive('/profile')}
          />
        </ul>
      </nav>
    </div>
  );
}

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  disabled?: boolean;
};

function NavItem({
  href,
  icon,
  label,
  isActive,
  disabled = false,
}: NavItemProps) {
  return (
    <li className='flex-1'>
      <Link
        href={disabled ? '#' : href}
        className={cn(
          'flex flex-col items-center justify-center py-2 px-1 text-xs rounded-md transition-colors',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary hover:bg-accent/50',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        {icon}
        <span className='mt-1'>{label}</span>
      </Link>
    </li>
  );
}

type NavButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

function NavButton({ onClick, icon, label, isActive }: NavButtonProps) {
  return (
    <li className='flex-1'>
      <button
        onClick={onClick}
        className={cn(
          'flex flex-col items-center justify-center py-2 px-1 text-xs rounded-md w-full transition-colors',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
        )}
      >
        {icon}
        <span className='mt-1'>{label}</span>
      </button>
    </li>
  );
}
