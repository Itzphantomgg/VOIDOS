import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { BookOpen, Cpu, Info, Play, X, Keyboard, Mouse, Compass, ShieldAlert, AlertTriangle } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<'howToPlay' | 'sysInfo' | 'credits' | null>(null);

  const bootSequence = [
    'NEXUS SYSTEMS // 2004 RECOVERY ARCHIVE (BUILD 4.09.2a)',
    'INITIALIZING WORKSTATION TERMINAL 04...',
    '-------------------------------------------------------',
    'CPU: VOID-X64 HYBRID SYNAPSE RISC @ 800 MHz ... OK',
    'MEMORY: 16384 MB HIGH-SPEED ECC DDR ............ OK',
    'STORAGE: 512 GB QUANTUM ARRAY ................. OK',
    'VFS FILE SYSTEM MOUNT (/) ...................... OK',
    'OPERATOR TELEMETRY BUS ......................... INITIALIZED',
    'NETWORK ADAPTER: ISOLATED (SECTOR 7 OFFLINE) ... OK',
    '-------------------------------------------------------',
    'RECOVERY ASSIGNMENT: TERMINAL 04 DATA EXTRACTION',
    'STATUS: READY FOR RECOVERY OPERATOR DEPLOYMENT.',
  ];

  useEffect(() => {
    sound.playBoot();
  }, []);

  useEffect(() => {
    if (currentLineIndex < bootSequence.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        sound.playKeypress();
      }, 75);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  // Keyboard navigation on boot screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          setActiveModal(null);
          sound.playClick();
        }
        return;
      }

      if (e.key === 'Enter') {
        sound.playClick();
        onBootComplete();
      } else if (e.key.toLowerCase() === 'h') {
        sound.playClick();
        setActiveModal('howToPlay');
      } else if (e.key.toLowerCase() === 's') {
        sound.playClick();
        setActiveModal('sysInfo');
      } else if (e.key.toLowerCase() === 'c') {
        sound.playClick();
        setActiveModal('credits');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onBootComplete]);

  return (
    <div className="fixed inset-0 z-[99990] bg-[#02040a] text-cyan-400 font-mono text-xs sm:text-sm p-4 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Banner & Story Lore Section */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center space-x-2 text-pink-500 font-bold tracking-widest text-sm sm:text-lg glow-magenta">
          <ShieldAlert size={20} className="text-pink-500 animate-pulse" />
          <span>NEXUS SYSTEMS // RECOVERY ARCHIVE (2004)</span>
        </div>

        {/* Narrative Lore Briefing Box */}
        <div className="p-3.5 sm:p-4 bg-[#070c1e]/90 border border-cyan-500/60 rounded shadow-retro-cyan space-y-2 text-xs leading-relaxed text-slate-200">
          <div className="text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <span>MISSION BRIEFING:</span>
          </div>
          <p className="text-slate-300">
            <strong>VOID//OS</strong> was an experimental operating system developed in 2004, designed to observe, learn, and adapt to its users.
            On <span className="text-pink-400 font-bold">August 14th, 2004</span>, the system was shut down after an unexplained incident at <strong>03:14 AM</strong>.
            The research facility was evacuated and the project was classified.
          </p>
          <p className="text-slate-300">
            Years later, a surviving recovery package was discovered. You have been assigned as a <strong>Recovery Technician</strong> to inspect the computer, examine incident logs, and determine what happened.
          </p>
          <div className="p-2 bg-red-950/40 border-l-2 border-red-500 text-red-300 text-[11px] font-bold flex items-center space-x-2">
            <AlertTriangle size={14} className="text-red-400 shrink-0" />
            <span>CONTAINMENT WARNING: "DO NOT CONNECT VOID TO THE EXTERNAL NETWORK." [NETWORK: OFFLINE]</span>
          </div>
        </div>

        {/* Technical Boot Logs */}
        <div className="space-y-1 pt-1 font-mono text-xs">
          {lines.map((line, idx) => {
            const isReady = line.includes('READY FOR');
            const isWarning = line.includes('WARNING') || line.includes('ISOLATED');
            return (
              <div
                key={idx}
                className={`leading-tight ${
                  isReady
                    ? 'text-green-400 font-bold glow-green text-xs sm:text-sm mt-1'
                    : isWarning
                    ? 'text-pink-400'
                    : 'text-cyan-300/90'
                }`}
              >
                {line}
              </div>
            );
          })}
          {currentLineIndex < bootSequence.length && (
            <div className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse mt-1" />
          )}
        </div>
      </div>

      {/* Interactive Boot Menu Options */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
        <div className="text-slate-400 text-[11px] font-bold tracking-wider">
          SELECT AN OPTION OR PRESS CORRESPONDING KEY:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              onBootComplete();
            }}
            className="p-2.5 sm:p-3 bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 border-2 border-cyan-400 text-cyan-200 rounded text-left transition-all shadow-retro-cyan cursor-pointer group"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-cyan-300">
              <Play size={16} className="text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              <span>[ ENTER ] START</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Boot into operating system</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('howToPlay');
            }}
            className="p-2.5 sm:p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-pink-400">
              <BookOpen size={16} />
              <span>[ H ] HOW TO PLAY</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Controls & investigation guide</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('sysInfo');
            }}
            className="p-2.5 sm:p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-purple-400">
              <Cpu size={16} />
              <span>[ S ] HARDWARE</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Hardware specifications</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('credits');
            }}
            className="p-2.5 sm:p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-slate-300">
              <Info size={16} />
              <span>[ C ] CREDITS</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Origins & lore attribution</div>
          </button>
        </div>
      </div>

      {/* HOW TO PLAY / TUTORIAL MODAL */}
      {activeModal === 'howToPlay' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#090e21] border-2 border-pink-500 p-5 sm:p-6 max-w-2xl w-full rounded shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-pink-700/60 pb-2.5">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
                <Compass size={18} />
                <span>RECOVERY OPERATOR // HOW TO PLAY & CONTROLS</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[11px] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-cyan-300 font-bold">
                Follow your top-right Objective HUD. Inspect files, investigate Incident 07, and solve the mystery.
              </p>

              <div className="p-3 bg-black/60 border border-slate-800 rounded space-y-1.5">
                <div className="font-bold text-pink-300 flex items-center space-x-1.5">
                  <Mouse size={14} />
                  <span>MOUSE CONTROLS</span>
                </div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li><strong>Single / Double Click:</strong> Open applications and files.</li>
                  <li><strong>Drag & Resize:</strong> Move windows by titlebar, resize via window borders.</li>
                  <li><strong>Right-Click Desktop:</strong> Access quick system shortcuts.</li>
                </ul>
              </div>

              <div className="p-3 bg-black/60 border border-slate-800 rounded space-y-1.5">
                <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                  <Keyboard size={14} />
                  <span>KEYBOARD SHORTCUTS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">TAB</kbd> - Full Mission Objectives</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">ESC</kbd> - Close active window</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">CTRL + L</kbd> - Open Terminal</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">CTRL + F</kbd> - Open Files</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">ALT + TAB</kbd> - Cycle open windows</div>
                </div>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-800/50 rounded space-y-1 text-purple-200">
                <div className="font-bold text-purple-300">CORE GAMEPLAY LOOP:</div>
                <p>1. Check the <strong>Top-Right Objectives HUD</strong> for your next step.</p>
                <p>2. Review your <strong>CASE FILE</strong> journal to see newly unlocked evidence.</p>
                <p>3. Use <code>ls -a</code> in Terminal to locate hidden system dotfiles.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModal(null);
                  onBootComplete();
                }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold rounded text-xs cursor-pointer shadow-retro-magenta"
              >
                ENTER SYSTEM [ENTER]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SYSTEM INFO MODAL */}
      {activeModal === 'sysInfo' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#090e21] border-2 border-purple-500 p-6 max-w-lg w-full rounded shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-purple-700/60 pb-3">
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-sm">
                <Cpu size={18} />
                <span>NEXUS WORKSTATION SPECIFICATIONS</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div><strong>System Model:</strong> NEXUS-409 Terminal 04</div>
              <div><strong>Architecture:</strong> VOID-X64 Synaptic Hybrid RISC</div>
              <div><strong>Memory:</strong> 16,384 MB High-Speed ECC DDR</div>
              <div><strong>Storage:</strong> 512 GB Quantum Magnetic Platter Array</div>
              <div><strong>Kernel:</strong> VOID//OS 4.09.2a (2004 Recovery Build)</div>
              <div><strong>Network Mode:</strong> Sector 7 Isolation (Air-gapped)</div>
            </div>
            <div className="pt-2 text-right">
              <button onClick={() => setActiveModal(null)} className="px-4 py-1.5 bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-600 rounded cursor-pointer">
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREDITS MODAL */}
      {activeModal === 'credits' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#090e21] border-2 border-cyan-500 p-6 max-w-lg w-full rounded shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-cyan-700/60 pb-3">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
                <Info size={18} />
                <span>VOID//OS CREDITS & HERITAGE</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
              <p><strong>VOID//OS</strong> is an interactive digital mystery, ARG, and digital horror experience.</p>
              <p>Created with passion for retro-computing, Y2K glitchcore, and experimental cognitive storytelling.</p>
            </div>
            <div className="pt-2 text-right">
              <button onClick={() => setActiveModal(null)} className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-600 rounded cursor-pointer">
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
