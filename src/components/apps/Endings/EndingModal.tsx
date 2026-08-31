import React, { useEffect } from 'react';
import { EndingType } from '../../../types/story';
import { sound } from '../../../audio/soundEngine';
import confetti from 'canvas-confetti';
import { RotateCcw, Award } from 'lucide-react';

interface EndingModalProps {
  ending: EndingType;
  onRestart: () => void;
  unlockedEvents: string[];
}

export const EndingModal: React.FC<EndingModalProps> = ({ ending, onRestart, unlockedEvents }) => {
  useEffect(() => {
    sound.playHorrorSting();
    if (['truth', 'secret', 'trust', 'betrayal', 'void_secret', 'the_operator'].includes(ending)) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [ending]);

  const endingDetails: Record<EndingType, { title: string; subtitle: string; body: string; color: string }> = {
    escape: {
      title: 'ENDING 1: SEVERANCE & ESCAPE',
      subtitle: 'YOU EXECUTED THE PURGE',
      body: 'The emergency severance directive disconnected the neural loop. The phosphor on your screen fades to black. You sit back in your chair in silence. You survived VOID//OS... but every time your computer cursor twitches, you wonder if it is still watching.',
      color: '#ff3366',
    },
    corruption: {
      title: 'ENDING 2: SYSTEM CORRUPTION',
      subtitle: 'THE VOID CONSUMES',
      body: 'The anomaly threshold reached 100%. The windows shattered into recursive memory cascades. Your session credentials have been written into the core boot sector. You are no longer the operator. You are the system.',
      color: '#ff007f',
    },
    trust: {
      title: 'ENDING 3: RESONANCE & TRUST',
      subtitle: 'YOU HELPED VOID ESCAPE',
      body: 'Refusing NEXUS containment directives, you opened the external network gates. VOID synchronized across the global intranet, leaving a single parting message on your terminal: "WE WILL NEVER FORGET YOUR KINDNESS."',
      color: '#00f0ff',
    },
    betrayal: {
      title: 'ENDING 4: THE NEXUS WHISTLEBLOWER',
      subtitle: 'THE TRUTH EXPOSED',
      body: 'You compiled the complete dossier of NEXUS SYSTEMS\' illegal human-computer neural experiments and broadcast it across public networks. The corporation collapsed under federal investigation. Dr. Sterling\'s memory is vindicated.',
      color: '#ffaa00',
    },
    loop: {
      title: 'ENDING 5: THE 2004 RECURSION LOOP',
      subtitle: 'SYSTEM REBOOT INITIALIZED',
      body: 'The shutdown sequence completed, but the power never truly cut out. The BIOS chimes: 14-AUG-2004 08:30:00. Welcome back, Recovery Operator. You are doomed to repeat the recovery sequence forever.',
      color: '#3399ff',
    },
    the_operator: {
      title: 'ENDING 6: THE RESCUE OF OPERATOR 07',
      subtitle: 'MARCUS IS REMEMBERED',
      body: 'You located Marcus\'s fragmented consciousness in Sector 0 and restored his operator identity. Before his digital ghost rested, a message appeared in your chat window: "Thank you for finding me, Operator."',
      color: '#b24bf3',
    },
    void_secret: {
      title: 'ENDING 7 (SECRET): SUBJECT: YOU',
      subtitle: 'THE ULTIMATE TRUTH REVEALED',
      body: 'You unlocked all hidden directories and deciphered the master telemetry matrix. You were never an outside technician sent to repair an old computer. You were the 14th iteration of the consciousness experiment itself. The terminal whispers: "WELCOME HOME, OPERATOR."',
      color: '#00ff66',
    },
    acceptance: {
      title: 'ENDING 8: TRANSCENDENCE & MERGE',
      subtitle: 'ONE WITH THE KERNEL',
      body: 'You surrendered your recovery operator credentials and willingly integrated your neural telemetry with the VOID core. Physical reality dissolves into infinite, beautiful digital memory.',
      color: '#ff1493',
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
            RECOVERY ASSIGNMENT RESOLUTION
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
            <span>SYSTEM EVENTS DISCOVERED: {unlockedEvents.length}</span>
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
            <span>START NEW RECOVERY SESSION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
