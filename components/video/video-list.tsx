import { VideoItem } from '@/components/video/video-item';
import { TrackType } from '@/contexts/player-context';

type VideoListProps = {
  tracks: TrackType[];
  showArtist?: boolean;
};

export function VideoList({ tracks, showArtist = true }: VideoListProps) {
  return (
    <div className="space-y-1">
      {tracks.map((track, index) => (
        <VideoItem
          key={track.id}
          track={track}
          showArtist={showArtist}
          isPriority={index < 5} // Prioritize loading first few items
        />
      ))}
    </div>
  );
}