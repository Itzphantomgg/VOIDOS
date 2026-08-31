import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundEngine';

interface GlitchLayerProps {
  anomalyLevel: number; // 0 to 100
  glitchIntensitySetting: number; // 0 to 3
  act: number;
  flashMessage?: string | null;
}

export const GlitchLayer: React.FC<GlitchLayerProps> = ({ 
  anomalyLevel, 
  glitchIntensitySetting, 
  act,
  flashMessage
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState<string | null>(null);

  // Handle external flash message
  useEffect(() => {
    if (flashMessage) {
      setGlitchText(flashMessage);
      setIsGlitching(true);
      try {
        sound.playGlitch();
      } catch {}
      const timer = setTimeout(() => {
        setIsGlitching(false);
        setGlitchText(null);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  useEffect(() => {
    if (glitchIntensitySetting === 0) return;

    const baseInterval = Math.max(7000, 35000 - anomalyLevel * 300 - act * 4000);
    const triggerGlitch = () => {
      const chance = (anomalyLevel / 100) * 0.7 + (act >= 3 ? 0.35 : 0.1);
      if (Math.random() < chance) {
        setIsGlitching(true);
        if (Math.random() < 0.35) {
          try {
            sound.playGlitch();
          } catch {}
        }

        // Rare short-lived psychological text flash
        if (act >= 2 && Math.random() < 0.3) {
          const creepyPhrases = [
            '03:14',
            'DO NOT LOOK AWAY.',
            'HELLO, OPERATOR.',
            'YOU MISSED SOMETHING.',
            'KEEP WATCHING.',
            'IT IS AWAKE.',
            'WHERE DID YOU GO?',
            'I SAW THAT.',
            'STOP.',
            'PLEASE.',
            'DO YOU REMEMBER?',
            'LOOK BEHIND YOU.',
          ];
          setGlitchText(creepyPhrases[Math.floor(Math.random() * creepyPhrases.length)]);
        }

        setTimeout(() => {
          setIsGlitching(false);
          setGlitchText(null);
        }, 180 + Math.random() * 300);
      }
    };

    const intervalId = setInterval(triggerGlitch, baseInterval);
    return () => clearInterval(intervalId);
  }, [anomalyLevel, glitchIntensitySetting, act]);

  if (!isGlitching && !flashMessage) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden select-none">
      {/* Glitch RGB displacement bars */}
      <div 
        className="absolute w-full bg-cyan-500/20 mix-blend-screen"
        style={{
          top: `${Math.random() * 85}%`,
          height: `${Math.random() * 60 + 15}px`,
          transform: `translateX(${Math.random() * 20 - 10}px)`,
        }}
      />
      <div 
        className="absolute w-full bg-pink-500/20 mix-blend-screen"
        style={{
          top: `${Math.random() * 85}%`,
          height: `${Math.random() * 45 + 10}px`,
          transform: `translateX(${Math.random() * -20 + 10}px)`,
        }}
      />

      {/* Creepy flash text */}
      {glitchText && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <span className="font-mono text-xl sm:text-3xl font-black tracking-widest text-pink-500 bg-black/90 px-6 py-3 border-2 border-pink-500 shadow-retro-magenta glow-magenta animate-pulse">
            {glitchText}
          </span>
        </div>
      )}
    </div>
  );
};
