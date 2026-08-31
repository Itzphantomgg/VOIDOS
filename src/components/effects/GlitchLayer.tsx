import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundEngine';

interface GlitchLayerProps {
  anomalyLevel: number; // 0 to 100
  glitchIntensitySetting: number; // 0 to 3
  act: number;
}

export const GlitchLayer: React.FC<GlitchLayerProps> = ({ anomalyLevel, glitchIntensitySetting, act }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState<string | null>(null);

  useEffect(() => {
    if (glitchIntensitySetting === 0) return;

    const baseInterval = Math.max(8000, 45000 - anomalyLevel * 350 - act * 5000);
    const triggerGlitch = () => {
      // Chance of glitch based on anomaly & act
      const chance = (anomalyLevel / 100) * 0.7 + (act >= 3 ? 0.3 : 0.1);
      if (Math.random() < chance) {
        setIsGlitching(true);
        if (Math.random() < 0.3) {
          sound.playGlitch();
        }

        // Creepy random phrase on high anomaly
        if (act >= 2 && Math.random() < 0.25) {
          const creepyPhrases = [
            'WE ARE WATCHING',
            'WHO IS OPERATING THIS TERMINAL?',
            'DO NOT TURN OFF THE MONITOR',
            'VOID KERNEL SYNCHRONIZED',
            'NULL RECURSION DETECTED',
            'YOU CANNOT LEAVE',
          ];
          setGlitchText(creepyPhrases[Math.floor(Math.random() * creepyPhrases.length)]);
        }

        setTimeout(() => {
          setIsGlitching(false);
          setGlitchText(null);
        }, 150 + Math.random() * 250);
      }
    };

    const intervalId = setInterval(triggerGlitch, baseInterval);
    return () => clearInterval(intervalId);
  }, [anomalyLevel, glitchIntensitySetting, act]);

  if (!isGlitching) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden">
      {/* Glitch RGB displacement bar */}
      <div 
        className="absolute w-full bg-cyan-500/20 mix-blend-screen"
        style={{
          top: `${Math.random() * 85}%`,
          height: `${Math.random() * 60 + 15}px`,
          transform: `translateX(${Math.random() * 16 - 8}px)`,
        }}
      />
      <div 
        className="absolute w-full bg-pink-500/20 mix-blend-screen"
        style={{
          top: `${Math.random() * 85}%`,
          height: `${Math.random() * 40 + 10}px`,
          transform: `translateX(${Math.random() * -16 + 8}px)`,
        }}
      />

      {/* Creepy flash text */}
      {glitchText && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-pink-500 bg-black/80 px-4 py-2 border border-pink-500 shadow-retro-magenta glow-magenta">
            {glitchText}
          </span>
        </div>
      )}
    </div>
  );
};
