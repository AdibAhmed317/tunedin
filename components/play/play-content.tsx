"use client";

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { usePlayer } from '@/contexts/player-context';
import { useRouter } from 'next/navigation';
import { Track } from '@/lib/mock-data';

interface PlayContentProps {
  videoId: string;
  initialTrack: Track | undefined;
}

export function PlayContent({ videoId, initialTrack }: PlayContentProps) {
  const { currentTrack, playTrack } = usePlayer();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Play this track when loaded
  useEffect(() => {
    if (mounted && initialTrack && (!currentTrack || currentTrack.id !== initialTrack.id)) {
      playTrack(initialTrack);
    }
  }, [mounted, initialTrack, currentTrack, playTrack]);

  // Redirect to playlists if track not found
  useEffect(() => {
    if (mounted && !initialTrack) {
      router.push('/playlists');
    }
  }, [mounted, initialTrack, router]);

  if (!mounted || !initialTrack) {
    return (
      <div className="container px-4 pt-6 pb-20">
        <div className="h-10 w-40 bg-accent/50 rounded mb-6" />
      </div>
    );
  }
  
  return (
    <div className="container px-4 pt-6 pb-20">
      <PageHeader
        title="Now Playing"
        description="Tap on the player to see full controls"
      />
    </div>
  );
}