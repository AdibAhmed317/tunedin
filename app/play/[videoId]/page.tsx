import { mockTracks } from '@/lib/mock-data';
import { PlayContent } from '@/components/play/play-content';

export function generateStaticParams() {
  return mockTracks.map((track) => ({
    videoId: track.id,
  }));
}

export default function PlayPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;
  const track = mockTracks.find(t => t.id === videoId);
  
  return <PlayContent videoId={videoId} initialTrack={track} />;
}