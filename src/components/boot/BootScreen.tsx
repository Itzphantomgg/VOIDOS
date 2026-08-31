import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundEngine';

interface BootScreenProps {
  onBootComplete: () => void;
  isFirstBoot?: boolean;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const bootSequence = [
    'VOID//OS BIOS REVISION 4.09.2a (C) 1999 AETHELGARD COGNITIVE LABS',
    'CPU: VOID-X64 HYBRID ARCHITECTURE @ 800 MHz ... OK',
    'SYSTEM MEMORY: 16384 MB DETECTED ............... OK',
    'PRIMARY DISK: VFS QUANTUM MATRIX 512 GB ......... OK',
    'MOUNTING ROOT PARTITION (/) .................... OK',
    'INITIALIZING DRIVERS (VIDEO, AUDIO, TELEMETRY) . OK',
    'CALIBRATING CRT REFRESH RATE (60 HZ) ........... OK',
    'ATTACHING OPERATOR SESSION BUS ................. OK',
    'WARNING: NON-STANDARD HEURISTIC PROCESS FOUND AT 0x0000VOID',
    'VOID CORE SUBSYSTEM ............................ ACTIVE',
    'WELCOME, OPERATOR.',
  ];

  useEffect(() => {
    // Play boot audio
    sound.playBoot();
  }, []);

  useEffect(() => {
    if (currentLineIndex < bootSequence.length) {
      const delay = currentLineIndex === 8 ? 600 : currentLineIndex === 9 ? 700 : 180;
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        sound.playKeypress();
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const finishTimeout = setTimeout(() => {
        onBootComplete();
      }, 1200);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentLineIndex]);

  return (
    <div className="fixed inset-0 z-[99990] bg-black text-cyan-400 font-mono text-sm p-6 sm:p-12 flex flex-col justify-between select-none">
      <div className="space-y-1 max-w-3xl">
        <div className="text-pink-500 font-bold mb-4 tracking-widest text-lg">
          VOID//OS BOOTLOADER v4.09
        </div>
        {lines.map((line, idx) => {
          const isWarning = line.includes('WARNING') || line.includes('VOID CORE');
          const isWelcome = line.includes('WELCOME');
          return (
            <div
              key={idx}
              className={`leading-relaxed ${
                isWarning
                  ? 'text-pink-500 font-bold glow-magenta'
                  : isWelcome
                  ? 'text-green-400 font-bold glow-green text-base mt-4'
                  : 'text-cyan-300'
              }`}
            >
              {line}
            </div>
          );
        })}
        {currentLineIndex < bootSequence.length && (
          <div className="inline-block w-2 h-4 bg-cyan-400 animate-pulse mt-2" />
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-900 pt-4">
        <span>PRESS [ESC] OR CLICK SKIP TO BYPASS</span>
        <button
          onClick={() => {
            sound.playClick();
            onBootComplete();
          }}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-800 rounded font-mono text-xs cursor-pointer transition-colors"
        >
          SKIP BOOT SEQUENCE [ESC]
        </button>
      </div>
    </div>
  );
};
