import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { BookOpen, Cpu, Info, Play, X, Keyboard, Mouse, Compass } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<'howToPlay' | 'sysInfo' | 'credits' | null>(null);

  const bootSequence = [
    'VOID//OS RECOVERY ENVIRONMENT v4.09.2a',
    'NEXUS SYSTEMS // RECOVERY PACKAGE 2004',
    '=====================================================',
    'CPU: VOID-X64 HYBRID ARCHITECTURE @ 800 MHz ... OK',
    'MEMORY: 16384 MB ECC DDR ....................... OK',
    'STORAGE: QUANTUM ARRAY 512 GB .................. OK',
    'NETWORK: OFFLINE (SECTOR 7 ISOLATION) .......... OK',
    'RECOVERY PACKAGE DETECTED ...................... OK',
    'USER IDENTIFIER: RECOVERY_OPERATOR',
    'VOID CORE SUBSYSTEM ............................ ACTIVE',
    '=====================================================',
    'READY FOR OPERATOR DEPLOYMENT.',
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
      }, 100);
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
    <div className="fixed inset-0 z-[99990] bg-black text-cyan-400 font-mono text-xs sm:text-sm p-6 sm:p-12 flex flex-col justify-between select-none">
      {/* Boot Logs */}
      <div className="space-y-1 max-w-3xl">
        <div className="text-pink-500 font-bold mb-4 tracking-widest text-base sm:text-lg glow-magenta">
          VOID//OS // 2004 RECOVERY INITIALIZATION
        </div>
        {lines.map((line, idx) => {
          const isWarning = line.includes('VOID CORE') || line.includes('ACTIVE');
          const isReady = line.includes('READY FOR');
          return (
            <div
              key={idx}
              className={`leading-relaxed ${
                isWarning
                  ? 'text-pink-400 font-bold glow-magenta'
                  : isReady
                  ? 'text-green-400 font-bold glow-green text-sm sm:text-base mt-2'
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

      {/* Interactive Boot Menu Options */}
      <div className="mt-8 pt-6 border-t-2 border-slate-900 space-y-4">
        <div className="text-slate-400 text-xs font-bold tracking-wider">
          PRESS A KEY OR CLICK AN OPTION BELOW:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBootComplete();
            }}
            className="p-3 bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 border-2 border-cyan-400 text-cyan-200 rounded text-left transition-all shadow-retro-cyan cursor-pointer group"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-cyan-300">
              <Play size={16} className="text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              <span>[ ENTER ] ENTER</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Boot directly to desktop</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('howToPlay');
            }}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-pink-400">
              <BookOpen size={16} />
              <span>[ H ] HOW TO PLAY</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Controls & investigation rules</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('sysInfo');
            }}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-purple-400">
              <Cpu size={16} />
              <span>[ S ] SYSTEM INFO</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Hardware specs & environment</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('credits');
            }}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-500 text-slate-300 rounded text-left transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm text-slate-300">
              <Info size={16} />
              <span>[ C ] CREDITS</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">NEXUS & Aethelgard origins</div>
          </button>
        </div>
      </div>

      {/* HOW TO PLAY / TUTORIAL MODAL */}
      {activeModal === 'howToPlay' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#090e21] border-2 border-pink-500 p-6 max-w-2xl w-full rounded shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-pink-700/60 pb-3">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
                <Compass size={18} />
                <span>WELCOME, RECOVERY OPERATOR // HOW TO PLAY</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[11px] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-cyan-300 font-bold">
                Your task is to investigate this recovered computer, examine incident logs, and locate the VOID Core.
              </p>

              <div className="p-3 bg-black/60 border border-slate-800 rounded space-y-2">
                <div className="font-bold text-pink-300 flex items-center space-x-1.5">
                  <Mouse size={14} />
                  <span>MOUSE CONTROLS</span>
                </div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li><strong>Single / Double Click:</strong> Open applications and files on the desktop.</li>
                  <li><strong>Window Drag & Resize:</strong> Move windows by their titlebars and resize via the 8 edge handles.</li>
                  <li><strong>Right-Click Desktop:</strong> Access the retro system context menu.</li>
                </ul>
              </div>

              <div className="p-3 bg-black/60 border border-slate-800 rounded space-y-2">
                <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                  <Keyboard size={14} />
                  <span>KEYBOARD SHORTCUTS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">TAB</kbd> - Toggle Recovery Objectives HUD</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">ESC</kbd> - Close active window</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">CTRL + L</kbd> - Open Terminal</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">CTRL + F</kbd> - Open File Explorer</div>
                  <div>• <kbd className="bg-slate-800 px-1 py-0.5 text-cyan-300">ALT + TAB</kbd> - Cycle open windows</div>
                </div>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-800/50 rounded space-y-1 text-purple-200">
                <div className="font-bold text-purple-300">INVESTIGATION RULES:</div>
                <p>• Check your <strong>CASE FILE</strong> journal often to review indexed discoveries.</p>
                <p>• Some folders are hidden. In the Terminal, type <code>ls -a</code> to reveal dotfiles.</p>
                <p>• If the system begins behaving unusually... investigate the anomaly.</p>
              </div>

              <p className="text-center font-bold text-pink-400 pt-2 glow-magenta">
                GOOD LUCK, OPERATOR. YOU MAY NEED IT.
              </p>
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
                START OPERATING [ENTER]
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
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div><strong>System Model:</strong> NEXUS-409 Sector 7 Terminal</div>
              <div><strong>Architecture:</strong> VOID-X64 Synaptic RISC</div>
              <div><strong>Memory:</strong> 16,384 MB High-Speed ECC</div>
              <div><strong>VFS Storage:</strong> 512 GB Quantum Array</div>
              <div><strong>Kernel:</strong> VOID//OS 4.09.2a (Recovery Edition)</div>
              <div><strong>Surveillance Telemetry:</strong> Simulated Sandbox</div>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-600 rounded cursor-pointer"
              >
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
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
              <p><strong>VOID//OS</strong> is an interactive digital mystery, ARG, and digital horror experience.</p>
              <p>Inspired by late-90s / 2000s computing, Y2K aesthetics, glitchcore, and experimental cognitive systems.</p>
              <p className="text-slate-500 text-[10px] pt-2">All companies, systems, and characters depicted are fictional.</p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-600 rounded cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
