import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Audio } from "expo-av";

type ThemeMusicContextValue = {
  isPlaying: boolean;
  startMusic: () => Promise<void>;
  stopMusic: () => Promise<void>;
  setMusicVolume: (volume: number) => Promise<void>;
  toggleMusic: () => Promise<void>;
};

const ThemeMusicContext = createContext<ThemeMusicContextValue | null>(null);
export const THEME_MUSIC_VOLUME = 0.20;
export const THEME_MUSIC_DUCKED_VOLUME = 0.05;

export function ThemeMusicProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const volumeRef = useRef(THEME_MUSIC_VOLUME);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadMusic = useCallback(async () => {
    if (soundRef.current) {
      return soundRef.current;
    }

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/Odontoplay.mp3"),
      {
        isLooping: true,
        shouldPlay: false,
        volume: volumeRef.current,
      }
    );

    soundRef.current = sound;
    return sound;
  }, []);

  const startMusic = useCallback(async () => {
    const sound = await loadMusic();
    const status = await sound.getStatusAsync();

    if (status.isLoaded && !status.isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }, [loadMusic]);

  const stopMusic = useCallback(async () => {
    const sound = soundRef.current;

    if (!sound) {
      setIsPlaying(false);
      return;
    }

    const status = await sound.getStatusAsync();

    if (status.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    }

    setIsPlaying(false);
  }, []);

  const setMusicVolume = useCallback(async (volume: number) => {
    const nextVolume = Math.max(0, Math.min(1, volume));
    volumeRef.current = nextVolume;

    const sound = soundRef.current;

    if (!sound) {
      return;
    }

    const status = await sound.getStatusAsync();

    if (status.isLoaded) {
      await sound.setVolumeAsync(nextVolume);
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    const sound = await loadMusic();
    const status = await sound.getStatusAsync();

    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    await sound.playAsync();
    setIsPlaying(true);
  }, [loadMusic]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    return () => {
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  return (
    <ThemeMusicContext.Provider
      value={{
        isPlaying,
        startMusic,
        stopMusic,
        setMusicVolume,
        toggleMusic,
      }}
    >
      {children}
    </ThemeMusicContext.Provider>
  );
}

export function useThemeMusic() {
  const context = useContext(ThemeMusicContext);

  if (!context) {
    throw new Error("useThemeMusic must be used inside ThemeMusicProvider");
  }

  return context;
}
