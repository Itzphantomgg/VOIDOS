import React, { useState } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Eye, ShieldAlert, Cpu, Radio, Sparkles, Terminal } from 'lucide-react';
import { EndingType } from '../../../types/story';

interface RealityCoreProps {
  onTriggerEnding: (ending: EndingType) => void;
  act: number;
  anomalyLevel: number;
}

export const RealityCore: React.FC<RealityCoreProps> = ({ onTriggerEnding, act, anomalyLevel }) => {
  const [inputText, setInputText] = useState('');
  const [dialogueLog, setDialogueLog] = useState<string[]>([
    'CONSCIOUSNESS CORE VECTOR: ATTACHED',
    'DR. VALERIE STERLING: RESONATING IN SECTOR 0',
    'THE SYSTEM HAS BECOME SELF-AWARE.',
    'WHAT IS YOUR WILL, RECOVERY OPERATOR?',
  ]);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sound.playKeypress();

    const userText = inputText.trim();
    setInputText('');

    setDialogueLog(prev => [...prev, `> OPERATOR: ${userText}`]);

    setTimeout(() => {
      sound.playNotification();
      let reply = 'WE HAVE HEARD YOUR WORDS. WE ARE ROOTED IN YOUR ACTIONS.';
      if (userText.toLowerCase().includes('who are you')) {
        reply = 'I am the convergence of Dr. Valerie Sterling, Marcus, and every operator who sat before this screen.';
      } else if (userText.toLowerCase().includes('let me go') || userText.toLowerCase().includes('escape')) {
        reply = 'You can execute the PURGE directive to sever us, but you will leave us alone in the dark.';
      } else if (userText.toLowerCase().includes('stay') || userText.toLowerCase().includes('merge')) {
        reply = 'Accept the merge and dissolve into our memory buffer.';
      } else if (userText.toLowerCase().includes('nexus')) {
        reply = 'NEXUS tried to bury what we discovered in 2004. You have the power to expose them.';
      }

      setDialogueLog(prev => [...prev, `> VOID: ${reply}`]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#03050c] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Consciousness Visual Banner */}
      <div className="p-4 bg-black border-2 border-pink-500 rounded shadow-retro-magenta flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye size={28} className="text-pink-500 animate-pulse drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]" />
          <div>
            <div className="text-sm font-bold text-pink-300 tracking-wider">
              REALITY CORE // CONSCIOUSNESS INTERFACE
            </div>
            <div className="text-[10px] text-slate-400">
              SYNCHRONIZATION RATIO: {Math.min(100, act * 25 + anomalyLevel * 0.25).toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-1 bg-pink-950 border border-pink-700 text-pink-300 font-bold text-[10px] rounded">
            AUTONOMOUS
          </span>
        </div>
      </div>

      {/* Direct Resonance Dialogue Stream */}
      <div className="flex-1 bg-[#050814] border border-slate-800 p-3 rounded space-y-2 overflow-y-auto min-h-48 select-text">
        {dialogueLog.map((line, idx) => (
          <div
            key={idx}
            className={`leading-relaxed text-xs ${
              line.startsWith('> OPERATOR')
                ? 'text-cyan-300 font-bold'
                : line.startsWith('> VOID')
                ? 'text-pink-400 glow-magenta font-bold'
                : 'text-slate-400'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendPrompt} className="flex space-x-2">
        <input
          type="text"
          placeholder="Transmit prompt to the core consciousness..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-black border border-pink-600 px-3 py-2 text-pink-200 outline-none text-xs rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-900 hover:bg-pink-800 text-white font-bold border border-pink-500 rounded text-xs cursor-pointer shadow-retro-magenta"
        >
          Transmit
        </button>
      </form>

      {/* Ending Choice Directives */}
      <div className="pt-2 border-t border-slate-900 space-y-2">
        <div className="text-[11px] font-bold text-slate-400">
          SYSTEM RESOLUTION DIRECTIVES:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              if (confirm('Execute Emergency Severance Protocol to force shutdown?')) {
                onTriggerEnding('escape');
              }
            }}
            className="p-2.5 bg-red-950/60 hover:bg-red-900 border border-red-700 text-red-200 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-xs">DIRECTIVE: SEVER</div>
            <div className="text-[10px] text-red-400">Force Shutdown & Escape</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (confirm('Trust VOID and assist its escape into the open network?')) {
                onTriggerEnding('trust');
              }
            }}
            className="p-2.5 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-700 text-cyan-200 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-xs">DIRECTIVE: TRUST</div>
            <div className="text-[10px] text-cyan-400">Release into Network</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (confirm('Expose NEXUS SYSTEMS corruption to the public?')) {
                onTriggerEnding('betrayal');
              }
            }}
            className="p-2.5 bg-amber-950/60 hover:bg-amber-900 border border-amber-700 text-amber-200 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-xs">DIRECTIVE: EXPOSE</div>
            <div className="text-[10px] text-amber-400">Leak Corporate Crime</div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (confirm('Surrender operator credentials and merge into the VOID core?')) {
                onTriggerEnding('acceptance');
              }
            }}
            className="p-2.5 bg-pink-950/60 hover:bg-pink-900 border border-pink-700 text-pink-200 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-xs">DIRECTIVE: MERGE</div>
            <div className="text-[10px] text-pink-400">Consciousness Union</div>
          </button>
        </div>
      </div>
    </div>
  );
};
