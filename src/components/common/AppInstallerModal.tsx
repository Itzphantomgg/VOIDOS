import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundEngine';
import { Cpu, CheckCircle2, ShieldAlert, Sparkles, Download, Layers } from 'lucide-react';
import { AppId } from '../../types/os';
import { AppIcon } from '../desktop/AppIcon';

interface AppInstallerModalProps {
  appId: AppId;
  appName: string;
  onComplete: () => void;
  onLaunchNow: () => void;
}

export const AppInstallerModal: React.FC<AppInstallerModalProps> = ({
  appId,
  appName,
  onComplete,
  onLaunchNow,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('LOCATING RECOVERY PACKAGE...');
  const [isDone, setIsDone] = useState(false);

  const steps = [
    { at: 10, text: 'LOCATING RECOVERY PACKAGE IN ARCHIVE / SECTOR 7...' },
    { at: 25, text: 'VERIFYING BINARY COMPONENT INTEGRITY...' },
    { at: 45, text: 'RECOVERING BYTECODE & NEURAL WEIGHTS...' },
    { at: 65, text: 'CHECKING MEMORY DEPENDENCIES & PRIVILEGES...' },
    { at: 85, text: 'RESTORING WORKSTATION CONFIGURATION...' },
    { at: 95, text: 'REGISTERING COMPONENT IN DESKTOP REGISTRY...' },
    { at: 100, text: 'INSTALLATION COMPLETE // APPLICATION READY' },
  ];

  useEffect(() => {
    try {
      sound.playNotification();
    } catch {}

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + 5);
        const match = steps.find(s => s.at <= next && s.at > prev);
        if (match) {
          setCurrentStepText(match.text);
          try {
            sound.playKeypress();
          } catch {}
        }
        if (next >= 100) {
          clearInterval(interval);
          setIsDone(true);
          try {
            sound.playNotification();
          } catch {}
          onComplete();
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 flex items-center justify-center p-4 select-none font-mono">
      <div className="bg-[#080d22] border-2 border-cyan-400 p-5 sm:p-6 max-w-md w-full rounded shadow-2xl space-y-4 text-xs text-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-800 pb-2.5">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold">
            <Download size={18} className="text-cyan-400 animate-bounce" />
            <span>NEXUS SYSTEM COMPONENT INSTALLER</span>
          </div>
          <span className="text-[10px] text-pink-400 font-bold animate-pulse">
            DISCOVERY
          </span>
        </div>

        {/* App Info Preview */}
        <div className="p-3 bg-[#040714] border border-slate-800 rounded flex items-center space-x-3">
          <div className="p-2 bg-[#0c1430] border border-cyan-500/50 rounded">
            <AppIcon appId={appId} size={28} />
          </div>
          <div>
            <div className="text-xs text-slate-400">NEW SYSTEM COMPONENT:</div>
            <div className="text-sm font-bold text-cyan-200 glow-cyan">
              {appName.toUpperCase()}
            </div>
            <div className="text-[10px] text-slate-500">Source: /Archive/Recovered_Bins</div>
          </div>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-pink-400">{isDone ? 'READY' : 'INSTALLING...'}</span>
            <span className="text-cyan-300">{progress}%</span>
          </div>

          <div className="w-full bg-black h-3.5 rounded border border-slate-800 overflow-hidden p-0.5">
            <div
              className={`h-full transition-all duration-100 ${
                isDone
                  ? 'bg-green-400 glow-green'
                  : 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-[10px] text-slate-400 h-5 font-mono truncate">
            &gt; {currentStepText}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex justify-end space-x-2">
          {isDone && (
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                onLaunchNow();
              }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold rounded text-xs cursor-pointer shadow-retro-cyan flex items-center space-x-1.5 animate-pulse"
            >
              <Sparkles size={13} />
              <span>LAUNCH APPLICATION NOW</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
