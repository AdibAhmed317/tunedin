import Image from 'next/image';
import Link from 'next/link';
import { ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';

type PlaylistCardProps = {
  id: string;
  title: string;
  thumbnailUrl: string;
  trackCount?: number;
  className?: string;
};

export function PlaylistCard({ id, title, thumbnailUrl, trackCount, className }: PlaylistCardProps) {
  return (
    <Link href={`/playlists/${id}`} className={cn("block group", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg mb-2 shadow-md group-hover:shadow-lg transition-all">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-full p-3">
            <ListMusic className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
      <h3 className="font-medium text-sm truncate">{title}</h3>
      {trackCount !== undefined && (
        <p className="text-xs text-muted-foreground">{trackCount} tracks</p>
      )}
    </Link>
  );
}