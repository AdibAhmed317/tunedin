"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/format-time';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    toggleFavorite,
    isFavorite
  } = usePlayer();
  
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!currentTrack) return null;

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-background to-background/95 flex flex-col p-6">
        <button 
          onClick={() => setExpanded(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <span className="sr-only">Minimize player</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-6 6-6-6"/><path d="m18 15-6-6-6 6"/></svg>
        </button>
        
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-sm mx-auto">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-xl">
            <Image
              src={currentTrack.thumbnailUrl}
              alt={currentTrack.title}
              fill
              className="object-cover transform transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          
          <div className="w-full space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold truncate">{currentTrack.title}</h2>
                <p className="text-muted-foreground text-sm">{currentTrack.artist || "Unknown Artist"}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleFavorite(currentTrack.id)}
                className="mt-1"
              >
                <Heart className={cn(
                  "h-6 w-6", 
                  isFavorite(currentTrack.id) 
                    ? "fill-red-500 text-red-500" 
                    : "text-muted-foreground"
                )} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Slider
                value={[progress]}
                max={duration}
                step={1}
                onValueChange={(value) => seekTo(value[0])}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button variant="ghost" size="icon" onClick={prevTrack}>
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary" 
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack}>
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mini player
  return (
    <div 
      className="fixed bottom-16 left-0 right-0 z-30 bg-card/80 backdrop-blur-lg border-t p-2 shadow-lg"
      onClick={() => setExpanded(true)}
    >
      <div className="flex items-center max-w-md mx-auto">
        <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={currentTrack.thumbnailUrl}
            alt={currentTrack.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        
        <div className="ml-3 flex-1 min-w-0">
          <Link href={`/play/${currentTrack.id}`} className="block">
            <h3 className="text-sm font-medium truncate">{currentTrack.title}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist || "Unknown Artist"}
            </p>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={(e) => { 
            e.stopPropagation();
            toggleFavorite(currentTrack.id);
          }}>
            <Heart className={cn(
              "h-5 w-5", 
              isFavorite(currentTrack.id) 
                ? "fill-red-500 text-red-500" 
                : "text-muted-foreground"
            )} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => { 
              e.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-primary/20 mt-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-linear"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>
    </div>
  );
}