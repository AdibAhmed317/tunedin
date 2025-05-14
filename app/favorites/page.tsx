"use client";

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { VideoList } from '@/components/video/video-list';
import { usePlayer, TrackType, mockTracks } from '@/contexts/player-context';

export default function FavoritesPage() {
  const { favorites } = usePlayer();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a skeleton while waiting for client hydration
    return (
      <div className="container px-4 pt-6 pb-20">
        <div className="h-10 w-40 bg-accent/50 rounded mb-6" />
        <div className="h-6 w-32 bg-accent/50 rounded mb-8" />
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="h-14 w-14 bg-accent/50 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full max-w-xs bg-accent/50 rounded" />
                <div className="h-3 w-24 bg-accent/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Get all tracks that are in favorites
  const favoriteTracks = mockTracks.filter(track => 
    favorites.includes(track.id)
  );

  return (
    <div className="container px-4 pt-6 pb-20">
      <PageHeader
        title="Favorites"
        description="Your favorite tracks in one place"
      />
      
      {favoriteTracks.length > 0 ? (
        <VideoList tracks={favoriteTracks} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">
            Start adding favorites by tapping the heart icon on tracks
          </p>
        </div>
      )}
    </div>
  );
}