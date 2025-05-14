import { PageHeader } from '@/components/ui/page-header';
import { VideoList } from '@/components/video/video-list';
import { mockPlaylists, mockTracks } from '@/lib/mock-data';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Change to named export
export async function generateStaticParams() {
  return mockPlaylists.map((playlist) => ({
    id: playlist.id,
  }));
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = mockPlaylists.find(p => p.id === params.id);
  
  if (!playlist) {
    return (
      <div className="container px-4 pt-6">
        <h1 className="text-2xl font-bold">Playlist not found</h1>
      </div>
    );
  }
  
  // Get all tracks from this playlist
  const playlistTracks = mockTracks.filter(track => 
    playlist.tracks.includes(track.id)
  );

  return (
    <div className="container px-4 pt-6 pb-20">
      <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start">
        <div className="relative w-48 h-48 shrink-0 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={playlist.thumbnailUrl}
            alt={playlist.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 192px"
            priority
          />
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{playlist.title}</h1>
          <p className="text-muted-foreground mt-2">{playlistTracks.length} tracks</p>
          
          <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
            <Button className="gap-2">
              <Play className="h-4 w-4 ml-0.5" />
              <span>Play All</span>
            </Button>
            <Button variant="outline">Shuffle Play</Button>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Tracks</h2>
        <VideoList tracks={playlistTracks} />
      </div>
    </div>
  );
}