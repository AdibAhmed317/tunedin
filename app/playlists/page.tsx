import { PageHeader } from '@/components/ui/page-header';
import { PlaylistGrid } from '@/components/playlist/playlist-grid';
import { mockPlaylists } from '@/lib/mock-data';

export default function PlaylistsPage() {
  return (
    <div className="container px-4 pt-6 pb-20">
      <PageHeader
        title="YTunes"
        description="Listen to your favorite music without video"
      />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
        <PlaylistGrid playlists={mockPlaylists} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
        <PlaylistGrid playlists={[
          {
            id: 'featured1',
            title: 'Study Focus',
            thumbnailUrl: 'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tracks: []
          },
          {
            id: 'featured2',
            title: 'Coffee House Jazz',
            thumbnailUrl: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tracks: []
          },
          {
            id: 'featured3',
            title: 'Electronic Beats',
            thumbnailUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tracks: []
          },
          {
            id: 'featured4',
            title: 'Sleep Sounds',
            thumbnailUrl: 'https://images.pexels.com/photos/5137767/pexels-photo-5137767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tracks: []
          }
        ]} />
      </div>
    </div>
  );
}