"use client";

import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/format-time';
import { usePlayer, TrackType } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';

type VideoItemProps = {
  track: TrackType;
  showArtist?: boolean;
  isPriority?: boolean;
};

export function VideoItem({ track, showArtist = true, isPriority = false }: VideoItemProps) {
  const { playTrack, toggleFavorite, isFavorite, addToQueue } = usePlayer();
  
  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    playTrack(track);
  }, [track, playTrack]);
  
  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(track.id);
  }, [track.id, toggleFavorite]);
  
  const handleAddToQueue = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQueue(track);
  }, [track, addToQueue]);

  return (
    <Link 
      href={`/play/${track.id}`}
      className="flex items-center p-2 rounded-lg hover:bg-accent/50 transition-colors relative group"
    >
      <div className="relative h-14 w-14 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={track.thumbnailUrl}
          alt={track.title}
          fill
          className="object-cover"
          sizes="56px"
          priority={isPriority}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={handlePlay}
            className="bg-primary/90 hover:bg-primary rounded-full p-1.5 transform scale-90 hover:scale-100 transition-transform"
          >
            <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
          </button>
        </div>
        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1 rounded-tl">
          {formatTime(track.duration)}
        </div>
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">{track.title}</h3>
        {showArtist && track.artist && (
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={handleFavorite}
        >
          <Heart className={cn(
            "h-4 w-4", 
            isFavorite(track.id) 
              ? "fill-red-500 text-red-500" 
              : "text-muted-foreground"
          )} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={handleAddToQueue}
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </Link>
  );
}