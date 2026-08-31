import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../../audio/soundEngine';
import { BookOpen, Cpu, Info, Play, X, Keyboard, Mouse, Compass, ShieldAlert, AlertTriangle, Terminal } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<'howToPlay' | 'sysInfo' | 'credits' | null>(null);
  const [commandInput, setCommandInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootSequence = [
    'VOID//OS RECOVERY TERMINAL',
    'NEXUS SYSTEMS // RECOVERY ENVIRONMENT (BUILD v1.3.0)',
    '====================================================',
    'SYSTEM CHECK ........................ COMPLETE',
    'KERNEL .............................. OK',
    'MEMORY (16384 MB) ................... OK',
    'STORAGE (512 GB QUANTUM) ............ OK',
    'NETWORK ............................. OFFLINE (AIR-GAPPED)',
    'VOID CORE ........................... UNKNOWN',
    'RECOVERY PACKAGE .................... MOUNTED AT /',
    'USER IDENTITY ....................... RECOVERY_OPERATOR',
    '====================================================',
    'STATUS: READY FOR OPERATOR COMMAND.',
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
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  // Execute terminal command
  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    setCommandInput('');

    if (cmd === 'start' || cmd === 'enter' || cmd === 'boot' || cmd === 'run') {
      sound.playClick();
      setFeedbackMessage('COMMAND ACCEPTED. INITIALIZING VOID//OS...');
      setTimeout(() => {
        onBootComplete();
      }, 600);
    } else if (cmd === 'help' || cmd === 'h') {
      sound.playClick();
      setActiveModal('howToPlay');
    } else if (cmd === 'hardware' || cmd === 'specs' || cmd === 's') {
      sound.playClick();
      setActiveModal('sysInfo');
    } else if (cmd === 'credits' || cmd === 'c') {
      sound.playClick();
      setActiveModal('credits');
    } else if (cmd === 'skip') {
      onBootComplete();
    } else if (cmd) {
      sound.playError();
      setFeedbackMessage(`UNKNOWN COMMAND: "${cmd}". TYPE "START", "HELP", "HARDWARE", OR "CREDITS".`);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          setActiveModal(null);
          sound.playClick();
        }
        return;
      }

      if (e.key === 'Enter' && !commandInput) {
        executeCommand('start');
      } else if (e.key.toLowerCase() === 'h' && !commandInput) {
        executeCommand('help');
      } else if (e.key.toLowerCase() === 's' && !commandInput) {
        executeCommand('hardware');
      } else if (e.key.toLowerCase() === 'c' && !commandInput) {
        executeCommand('credits');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, commandInput]);

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="fixed inset-0 z-[99990] bg-[#02040b] text-cyan-400 font-mono text-xs sm:text-sm p-4 sm:p-10 flex flex-col justify-between select-none overflow-y-auto cursor-text"
    >
      {/* Top Section */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center space-x-2 text-pink-500 font-bold tracking-widest text-sm sm:text-lg glow-magenta">
          <ShieldAlert size={20} className="text-pink-500 animate-pulse" />
          <span>NEXUS SYSTEMS // RECOVERY TERMINAL (2004)</span>
        </div>

        {/* Narrative Mission Briefing Banner */}
        <div className="p-3.5 bg-[#060a18]/90 border border-cyan-500/60 rounded shadow-retro-cyan space-y-1.5 text-xs text-slate-200">
          <div className="text-cyan-300 font-bold text-xs uppercase tracking-wider">
            RECOVERY ASSIGNMENT: WORKSTATION TERMINAL 04
          </div>
          <p className="text-slate-300 leading-relaxed">
            Inspect the recovered 2004 operating system, investigate the <strong>03:14 AM</strong> incident, and uncover what happened to Project VOID.
          </p>
          <div className="text-[11px] text-red-400 font-bold flex items-center space-x-1.5 pt-0.5">
            <AlertTriangle size={13} className="shrink-0" />
            <span>CRITICAL WARNING: "DO NOT CONNECT VOID TO THE EXTERNAL NETWORK." [AIR-GAPPED]</span>
          </div>
        </div>

        {/* Boot Stream Lines */}
        <div className="space-y-1 pt-1 font-mono text-xs">
          {lines.map((line, idx) => {
            const isReady = line.includes('READY FOR');
            const isWarning = line.includes('WARNING') || line.includes('OFFLINE');
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
        </div>

        {/* Available Terminal Commands */}
        {currentLineIndex >= bootSequence.length && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-pink-400 font-bold text-xs tracking-wider">
              AVAILABLE COMMANDS:
            </div>

            <div className="space-y-1 text-xs">
              <div 
                onClick={() => executeCommand('start')}
                className="hover:text-cyan-200 hover:bg-cyan-950/40 p-1 rounded cursor-pointer transition-colors flex items-center space-x-2"
              >
                <span className="text-green-400 font-bold">&gt; START</span>
                <span className="text-slate-400">Boot into operating system [ENTER]</span>
              </div>
              <div 
                onClick={() => executeCommand('help')}
                className="hover:text-cyan-200 hover:bg-cyan-950/40 p-1 rounded cursor-pointer transition-colors flex items-center space-x-2"
              >
                <span className="text-pink-400 font-bold">&gt; HELP</span>
                <span className="text-slate-400">View controls and investigation guide [H]</span>
              </div>
              <div 
                onClick={() => executeCommand('hardware')}
                className="hover:text-cyan-200 hover:bg-cyan-950/40 p-1 rounded cursor-pointer transition-colors flex items-center space-x-2"
              >
                <span className="text-purple-400 font-bold">&gt; HARDWARE</span>
                <span className="text-slate-400">View system specifications [S]</span>
              </div>
              <div 
                onClick={() => executeCommand('credits')}
                className="hover:text-cyan-200 hover:bg-cyan-950/40 p-1 rounded cursor-pointer transition-colors flex items-center space-x-2"
              >
                <span className="text-slate-300 font-bold">&gt; CREDITS</span>
                <span className="text-slate-400">View project credits & heritage [C]</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Command Prompt Line */}
      <div className="mt-6 pt-3 border-t border-slate-800 space-y-2">
        {feedbackMessage && (
          <div className="text-xs font-bold text-pink-400 animate-pulse">
            {feedbackMessage}
          </div>
        )}

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>SHORTCUT KEYS:</span>
          <button onClick={() => executeCommand('start')} className="px-2 py-0.5 bg-[#0a1226] border border-cyan-600 text-cyan-300 rounded hover:bg-cyan-900 cursor-pointer">
            [ENTER] START
          </button>
          <button onClick={() => executeCommand('help')} className="px-2 py-0.5 bg-[#0a1226] border border-pink-700 text-pink-300 rounded hover:bg-pink-900 cursor-pointer">
            [H] HELP
          </button>
          <button onClick={() => executeCommand('hardware')} className="px-2 py-0.5 bg-[#0a1226] border border-purple-700 text-purple-300 rounded hover:bg-purple-900 cursor-pointer">
            [S] HARDWARE
          </button>
          <button onClick={() => executeCommand('credits')} className="px-2 py-0.5 bg-[#0a1226] border border-slate-700 text-slate-300 rounded hover:bg-slate-800 cursor-pointer">
            [C] CREDITS
          </button>
        </div>

        {/* Command Line Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(commandInput || 'start');
          }}
          className="flex items-center space-x-2 bg-black/80 border border-cyan-500/80 p-2 rounded"
        >
          <span className="text-green-400 font-bold text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type command (e.g. START, HELP, HARDWARE) or press ENTER..."
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-cyan-200 font-mono text-xs caret-cyan-400 placeholder:text-slate-600"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-cyan-900 hover:bg-cyan-800 text-cyan-200 rounded text-xs font-bold border border-cyan-500 cursor-pointer"
          >
            EXECUTE
          </button>
        </form>
      </div>

      {/* HOW TO PLAY MODAL */}
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
                <p>4. Use the <strong>OBSERVER</strong> application to perform Observation Duty and stabilize the Anomaly.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModal(null);
                  executeCommand('start');
                }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold rounded text-xs cursor-pointer shadow-retro-magenta"
              >
                ENTER SYSTEM [START]
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
              <div><strong>Kernel:</strong> VOID//OS 4.09.2a (2004 Recovery Build v1.2.0)</div>
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
              <p><strong>VOID//OS v1.3.0</strong> is an interactive digital mystery, ARG, and digital horror experience.</p>
              <p>Created by <strong>Paarth</strong>.</p>
              <p>GitHub: <a href="https://github.com/Itzphantomgg/Paarth" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">https://github.com/Itzphantomgg/Paarth</a></p>
              <p>Feedback: <a href="mailto:paarth.archive@gmail.com" className="text-pink-400 underline">paarth.archive@gmail.com</a></p>
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
