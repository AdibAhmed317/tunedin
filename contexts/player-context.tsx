"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type TrackType = {
  id: string;
  title: string;
  artist?: string;
  thumbnailUrl: string;
  duration: number;
};

type PlayerContextType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isShuffle: boolean;
  queue: TrackType[];
  favorites: string[];
  playTrack: (track: TrackType) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  toggleShuffle: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  addToQueue: (track: TrackType) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Mock data
const mockPlaylists = [
  {
    id: 'playlist1',
    title: 'Chill Lofi Beats',
    thumbnailUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: ['track1', 'track2', 'track3', 'track4', 'track5'],
  },
  {
    id: 'playlist2',
    title: 'Focus Music',
    thumbnailUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: ['track6', 'track7', 'track8', 'track9'],
  },
];

const mockTracks = [
  { id: 'track1', title: 'Midnight Jazz', artist: 'Moonlight Quartet', thumbnailUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 183 },
  { id: 'track2', title: 'Ocean Waves', artist: 'Natural Sounds', thumbnailUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 242 },
  { id: 'track3', title: 'Urban Beat', artist: 'City Pulse', thumbnailUrl: 'https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 197 },
  { id: 'track4', title: 'Electric Dream', artist: 'Neon Echo', thumbnailUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 214 },
  { id: 'track5', title: 'Mountain Serenity', artist: 'Alpine Sounds', thumbnailUrl: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 258 },
  { id: 'track6', title: 'Deep Focus', artist: 'Concentration', thumbnailUrl: 'https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 305 },
  { id: 'track7', title: 'Ambient Reflection', artist: 'Mind Space', thumbnailUrl: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 278 },
  { id: 'track8', title: 'Night Drive', artist: 'Midnight Cruiser', thumbnailUrl: 'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 221 },
  { id: 'track9', title: 'Dawn Chorus', artist: 'Morning Bliss', thumbnailUrl: 'https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', duration: 190 },
];

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [queue, setQueue] = useState<TrackType[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem('ytunes-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    if (typeof window !== 'undefined' && favorites.length > 0) {
      localStorage.setItem('ytunes-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Media Session API integration
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    
    if (currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist || 'Unknown Artist',
        artwork: [
          { src: currentTrack.thumbnailUrl, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => togglePlay());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
    }
  }, [currentTrack]);

  const playTrack = useCallback((track: TrackType) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    if (audioRef.current) {
      // In a real app, we would set the audio source to the track URL
      // For this demo, we'll just simulate playing
      audioRef.current.src = `https://example.com/audio/${track.id}.mp3`;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
      setDuration(track.duration);
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    
    setIsPlaying(prev => {
      const newState = !prev;
      if (audioRef.current) {
        if (newState) {
          audioRef.current.play().catch(error => {
            console.error('Resume playback failed:', error);
          });
        } else {
          audioRef.current.pause();
        }
      }
      return newState;
    });
  }, [currentTrack]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextTrackIndex = 0;
    if (isShuffle) {
      nextTrackIndex = Math.floor(Math.random() * queue.length);
    } else if (currentTrack) {
      const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
      nextTrackIndex = (currentIndex + 1) % queue.length;
    }
    
    playTrack(queue[nextTrackIndex]);
  }, [queue, currentTrack, isShuffle, playTrack]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0 || !currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1) return;
    
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    playTrack(queue[prevIndex]);
  }, [queue, currentTrack, playTrack]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => {
      const newState = !prev;
      toast({
        title: newState ? "Shuffle On" : "Shuffle Off",
        description: newState ? "Playing tracks in random order" : "Playing tracks in sequence",
        duration: 2000,
      });
      return newState;
    });
  }, [toast]);

  const toggleFavorite = useCallback((trackId: string) => {
    setFavorites(prev => {
      if (prev.includes(trackId)) {
        toast({
          title: "Removed from favorites",
          description: "Track removed from your favorites",
          duration: 2000,
        });
        return prev.filter(id => id !== trackId);
      } else {
        toast({
          title: "Added to favorites",
          description: "Track added to your favorites",
          duration: 2000,
        });
        return [...prev, trackId];
      }
    });
  }, [toast]);

  const isFavorite = useCallback((trackId: string) => {
    return favorites.includes(trackId);
  }, [favorites]);

  const addToQueue = useCallback((track: TrackType) => {
    setQueue(prev => {
      if (prev.some(t => t.id === track.id)) {
        return prev;
      }
      toast({
        title: "Added to queue",
        description: `${track.title} added to your queue`,
        duration: 2000,
      });
      return [...prev, track];
    });
  }, [toast]);

  // Simulating progress updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= currentTrack.duration) {
            nextTrack();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, nextTrack]);

  // Function to seek to a specific time
  const seekTo = useCallback((time: number) => {
    if (!audioRef.current || !currentTrack) return;
    
    audioRef.current.currentTime = time;
    setProgress(time);
  }, [currentTrack]);

  // Function to set volume
  const setVolumeHandler = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Exposing the context value
  const value = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    isShuffle,
    queue,
    favorites,
    playTrack,
    togglePlay,
    setVolume: setVolumeHandler,
    seekTo,
    toggleShuffle,
    nextTrack,
    prevTrack,
    toggleFavorite,
    isFavorite,
    addToQueue,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

// These exports allow components to access mock data
export { mockPlaylists, mockTracks };