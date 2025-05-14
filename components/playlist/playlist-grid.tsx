'use client';

import { PlaylistCard } from '@/components/playlist/playlist-card';

type Playlist = {
  id: string;
  title: string;
  thumbnailUrl: string;
  tracks: string[];
};

type PlaylistGridProps = {
  playlists: Playlist[];
};

export function PlaylistGrid({ playlists }: PlaylistGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          id={playlist.id}
          title={playlist.title}
          thumbnailUrl={playlist.thumbnailUrl}
          trackCount={playlist.tracks.length}
        />
      ))}
    </div>
  );
}