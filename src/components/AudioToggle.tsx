import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Howl } from 'howler';

// I'm using a placeholder ambient track here.
const AUDIO_URL = 'https://upload.wikimedia.org/wikipedia/commons/7/75/Apollo_11_Moon_Landing_ambient_sound.ogg';

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // I check local storage for preferences.
    const savedPref = localStorage.getItem('ambient_audio_pref');
    const shouldPlay = savedPref === 'true';

    soundRef.current = new Howl({
      src: [AUDIO_URL],
      loop: true,
      volume: 0.25,
      preload: shouldPlay, // I only preload if opted in.
    });

    if (shouldPlay) {
      setIsPlaying(true);
      soundRef.current.play();
    }

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const toggleAudio = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('ambient_audio_pref', 'false');
    } else {
      // I force load if it isn't preloaded.
      if (soundRef.current.state() === 'unloaded') {
        soundRef.current.load();
      }
      soundRef.current.play();
      setIsPlaying(true);
      localStorage.setItem('ambient_audio_pref', 'true');
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-surface/80 backdrop-blur border border-border-main flex items-center justify-center text-text-secondary hover:text-accent transition-colors z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
      title="Ambient Audio"
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center">
          <Volume2 size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      ) : (
        <VolumeX size={18} />
      )}
    </button>
  );
}
