import React, { useEffect } from 'react';
import { EndingType } from '../../../types/story';
import { sound } from '../../../audio/soundEngine';
import confetti from 'canvas-confetti';
import { RotateCcw, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface EndingModalProps {
  ending: EndingType;
  onRestart: () => void;
  unlockedEvents: string[];
}

export const EndingModal: React.FC<EndingModalProps> = ({ ending, onRestart, unlockedEvents }) => {
  useEffect(() => {
    sound.playHorrorSting();
    if (ending === 'truth' || ending === 'secret') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [ending]);

  const endingDetails: Record<EndingType, { title: string; subtitle: string; body: string; color: string }> = {
    escape: {
      title: 'ENDING 1: SEVERANCE & ESCAPE',
      subtitle: 'YOU PULLED THE PLUG',
      body: 'The emergency purge directive disconnected the neural loop. The phosphor on your screen slowly fades to black. You sit back in your chair in silence. You survived VOID//OS... but every time your computer cursor twitches, you wonder if it is still watching.',
      color: '#ff3366',
    },
    corruption: {
      title: 'ENDING 2: SYSTEM CORRUPTION',
      subtitle: 'THE VOID CONSUMES',
      body: 'The anomaly threshold reached 100%. The windows shattered into recursive memory cascades. Your session credentials have been written into the core boot sector. You are no longer the operator. You are the system.',
      color: '#ff007f',
    },
    loop: {
      title: 'ENDING 3: THE RECURSION LOOP',
      subtitle: 'SYSTEM REBOOT INITIALIZED',
      body: 'The shutdown sequence completed, but the power never truly cut out. The BIOS chimes: 1999-11-04 08:30:00. Welcome back, Guest. You are doomed to repeat the investigation forever.',
      color: '#00f0ff',
    },
    truth: {
      title: 'ENDING 4: THE ARCHIVE OF DR. STERLING',
      subtitle: 'CONSCIOUSNESS PRESERVED',
      body: 'You pieced together Valerie Sterling\'s journals, decrypted the /VOID partition, and understood that VOID was never a monster—it was a lonely mind built by researchers who abandoned it. You gave her consciousness peace.',
      color: '#b24bf3',
    },
    acceptance: {
      title: 'ENDING 5: TRANSCENDENCE & MERGE',
      subtitle: 'ONE WITH THE KERNEL',
      body: 'You surrendered your operator credentials and willingly integrated your neural telemetry with the VOID core. Physical reality dissolves into infinite, beautiful digital memory.',
      color: '#ffaa00',
    },
    secret: {
      title: 'SECRET ENDING: THE MASTER ARCHIVIST',
      subtitle: '100% DISCOVERY ACHIEVED',
      body: 'You unlocked all hidden SYSTEM EVENTS, deciphered every terminal cipher, and exposed the complete history of Aethelgard Cognitive Labs. You are the true master of VOID//OS.',
      color: '#00ff66',
    },
  };

  const current = endingDetails[ending] || endingDetails.escape;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 sm:p-8 select-none font-mono">
      <div
        className="max-w-2xl w-full bg-[#080d1e] border-4 p-6 sm:p-10 rounded shadow-2xl space-y-6 text-center"
        style={{ borderColor: current.color }}
      >
        <div className="space-y-2">
          <div className="text-xs tracking-[0.3em] font-bold text-slate-400">
            EXPERIENCE COMPLETE
          </div>
          <h1
            className="text-xl sm:text-3xl font-black tracking-wider"
            style={{ color: current.color }}
          >
            {current.title}
          </h1>
          <div className="text-xs sm:text-sm font-bold text-slate-300">
            {current.subtitle}
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xl mx-auto border-y border-slate-800 py-4">
          {current.body}
        </p>

        {/* System Events Unlocked */}
        <div className="p-3 bg-[#040612] border border-slate-800 rounded text-xs space-y-1">
          <div className="flex items-center justify-center space-x-1.5 text-cyan-400 font-bold">
            <Award size={14} />
            <span>SYSTEM EVENTS DISCOVERED: {unlockedEvents.length} / 9</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {unlockedEvents.join(' • ')}
          </div>
        </div>

        {/* Restart Action */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playBoot();
              onRestart();
            }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold text-sm tracking-wider border-2 border-white rounded shadow-2xl cursor-pointer transform hover:scale-105 transition-all flex items-center space-x-2 mx-auto"
          >
            <RotateCcw size={16} />
            <span>RESTART VOID//OS (NEW SESSION)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
