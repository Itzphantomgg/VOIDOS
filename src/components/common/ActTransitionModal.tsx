import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Download, Layers } from 'lucide-react';
import { StoryAct } from '../../types/story';

interface ActTransitionModalProps {
  completedAct: StoryAct;
  nextAct: StoryAct;
  unlockedPackageName: string;
  onComplete: () => void;
}

export const ActTransitionModal: React.FC<ActTransitionModalProps> = ({
  completedAct,
  nextAct,
  unlockedPackageName,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('VERIFYING ACT COMPLETION REQUIREMENTS...');
  const [isDone, setIsDone] = useState(false);

  const actTitles: Record<StoryAct, string> = {
    1: 'ACT I: RECOVERY',
    2: 'ACT II: THE INCIDENT',
    3: 'ACT III: OBSERVATION',
    4: 'ACT IV: CONTACT',
    5: 'ACT V: CONTROL',
  };

  useEffect(() => {
    try {
      sound.playHorrorSting();
    } catch {}

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + 5);
        if (next === 25) setStatusText(`SAVING DOSSIER METRICS FOR ${actTitles[completedAct]}...`);
        if (next === 50) setStatusText(`RECOVERY PACKAGE FOUND: [${unlockedPackageName.toUpperCase()}]...`);
        if (next === 75) setStatusText(`RESTORING SECURE SYSTEM PRIVILEGES FOR ${actTitles[nextAct]}...`);
        if (next === 95) setStatusText('SYNCHRONIZING RECOVERY WORKSTATION...');
        if (next >= 100) {
          clearInterval(interval);
          setIsDone(true);
          try {
            sound.playNotification();
          } catch {}
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [completedAct, nextAct, unlockedPackageName]);

  return (
    <div className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-4 select-none font-mono text-xs text-slate-200">
      <div className="bg-[#070c1e] border-2 border-cyan-400 p-6 max-w-md w-full rounded shadow-2xl space-y-4">
        {/* Top Header */}
        <div className="border-b border-cyan-800 pb-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold">
            <CheckCircle2 size={18} className="text-green-400" />
            <span>STAGE RESOLUTION CONFIRMED</span>
          </div>
          <span className="text-[10px] text-pink-400 font-bold">
            100% COMPLETE
          </span>
        </div>

        {/* Act Completed Banner */}
        <div className="p-3 bg-[#040714] border border-slate-800 rounded space-y-1 text-center">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            INVESTIGATION PHASE COMPLETED:
          </div>
          <div className="text-base font-black text-green-400 glow-green">
            {actTitles[completedAct]}
          </div>
        </div>

        {/* Next Unlocking Component */}
        <div className="p-3 bg-[#091128] border border-cyan-900 rounded space-y-1">
          <div className="text-[10px] text-cyan-300 font-bold flex items-center space-x-1.5">
            <Download size={13} className="text-cyan-400" />
            <span>UNLOCKED COMPONENT:</span>
          </div>
          <div className="text-sm font-bold text-slate-100">
            {unlockedPackageName}
          </div>
          <div className="text-[10px] text-slate-400">
            Advancing to <strong>{actTitles[nextAct]}</strong>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold">
            <span className="text-slate-400">STAGE TRANSITION:</span>
            <span className="text-cyan-300">{progress}%</span>
          </div>

          <div className="w-full bg-black h-2.5 rounded border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-pink-500 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-[10px] text-slate-400 truncate">
            &gt; {statusText}
          </div>
        </div>

        {/* Proceed Action Button */}
        {isDone && (
          <div className="pt-2">
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                onComplete();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-950 to-pink-950 hover:from-cyan-900 hover:to-pink-900 text-white font-bold rounded text-xs cursor-pointer border border-cyan-400 flex items-center justify-center space-x-2 animate-pulse"
            >
              <span>ENTER {actTitles[nextAct]}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
