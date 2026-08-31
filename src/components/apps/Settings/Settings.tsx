import React, { useState } from 'react';
import { OSSettings, ThemeName } from '../../../types/os';
import { sound } from '../../../audio/soundEngine';
import { Palette, Monitor, Volume2, Shield, Eye, RotateCcw, AlertTriangle, Cpu, Info, CheckCircle2 } from 'lucide-react';

interface SettingsProps {
  settings: OSSettings;
  onUpdateSettings: (newSettings: Partial<OSSettings>) => void;
  onResetGame: () => void;
  act: number;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onUpdateSettings,
  onResetGame,
  act,
}) => {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const themes: { id: ThemeName; title: string; color: string }[] = [
    { id: 'void-cyan', title: 'Void Cyber (Default)', color: '#00f0ff' },
    { id: 'neon-magenta', title: 'Corrupted Magenta', color: '#ff007f' },
    { id: 'amber-crt', title: 'Amber Terminal 1984', color: '#ffaa00' },
    { id: 'matrix-green', title: 'Phosphor Green', color: '#00ff66' },
    { id: 'y2k-purple', title: 'Y2K Cyber Violet', color: '#b24bf3' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none p-4 overflow-y-auto space-y-6 relative">
      {/* SYSTEM INFORMATION / BUILD VERSION HEADER */}
      <div className="p-3.5 bg-[#090e24] border-2 border-cyan-500/70 rounded space-y-2 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cyan-800 pb-2">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
            <Cpu size={16} className="text-cyan-400" />
            <span>SYSTEM INFORMATION // ABOUT SYSTEM</span>
          </div>
          <span className="px-2 py-0.5 bg-pink-950 border border-pink-700 text-pink-300 font-bold text-[10px] rounded">
            STABLE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div><strong>SYSTEM:</strong> VOID//OS</div>
          <div><strong>BUILD:</strong> <span className="text-pink-400 font-bold">v1.3.0</span></div>
          <div><strong>ENVIRONMENT:</strong> Browser WebEngine</div>
          <div><strong>MODE:</strong> Interactive Recovery Workstation</div>
          <div><strong>CLEARANCE:</strong> LEVEL 4 RESTRICTED</div>
          <div><strong>KERNEL:</strong> SH-4.09.2a (2004 Recovery)</div>
        </div>
      </div>

      {/* Visual Themes */}
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Palette size={16} />
          <span>APPEARANCE & THEMES</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                onUpdateSettings({ theme: t.id });
              }}
              className={`p-2 rounded border text-left flex items-center space-x-2 transition-all cursor-pointer ${
                settings.theme === t.id
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-retro-cyan text-cyan-300 font-bold'
                  : 'bg-[#0a0f22] border-slate-800 hover:border-slate-600 text-slate-300'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="truncate text-xs">{t.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Display & CRT Effects */}
      <div className="space-y-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Monitor size={16} />
          <span>CRT PHOSPHOR & ANOMALY RENDERING</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center space-x-2.5 p-2 bg-[#0a0f22] border border-slate-800 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={settings.crtScanlines}
              onChange={(e) => {
                sound.playClick();
                onUpdateSettings({ crtScanlines: e.target.checked });
              }}
              className="accent-cyan-400 w-4 h-4 cursor-pointer"
            />
            <span>CRT Scanline Overlay</span>
          </label>

          <label className="flex items-center space-x-2.5 p-2 bg-[#0a0f22] border border-slate-800 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={settings.crtCurvature}
              onChange={(e) => {
                sound.playClick();
                onUpdateSettings({ crtCurvature: e.target.checked });
              }}
              className="accent-cyan-400 w-4 h-4 cursor-pointer"
            />
            <span>CRT Screen Vignette</span>
          </label>
        </div>

        {/* Glitch Intensity Slider */}
        <div className="p-3 bg-[#0a0f22] border border-slate-800 rounded space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">GLITCH FREQUENCY / ANOMALY SHIFT:</span>
            <span className="text-pink-400 font-bold">
              {['Disabled', 'Subtle (Default)', 'Intense', 'Corrupted'][settings.glitchIntensity]}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={settings.glitchIntensity}
            onChange={(e) => onUpdateSettings({ glitchIntensity: parseInt(e.target.value) })}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Audio Engine */}
      <div className="space-y-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Volume2 size={16} />
          <span>AUDIO & PROCEDURAL SYNTHESIS</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2.5 p-2 bg-[#0a0f22] border border-slate-800 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={settings.ambientHum}
              onChange={(e) => {
                sound.playClick();
                const enabled = e.target.checked;
                onUpdateSettings({ ambientHum: enabled });
                if (enabled) sound.startAmbientHum();
                else sound.stopAmbientHum();
              }}
              className="accent-cyan-400 w-4 h-4 cursor-pointer"
            />
            <span>Continuous CRT & Drive Ambient Hum</span>
          </label>
        </div>
      </div>

      {/* Advanced & Reset System */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
          <Eye size={16} />
          <span>ADVANCED OPERATOR CONTROLS</span>
        </div>

        <div className="p-3 bg-[#0f0a1c] border border-pink-700/60 rounded space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-pink-300">REALITY MODE</div>
              <div className="text-[10px] text-slate-400">
                Removes procedural containment filters and unlocks deep VOID synchronization.
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpdateSettings({ realityMode: !settings.realityMode });
              }}
              className={`px-3 py-1 text-xs font-bold rounded border transition-colors cursor-pointer ${
                settings.realityMode
                  ? 'bg-pink-900 border-pink-400 text-white glow-magenta'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              {settings.realityMode ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              setIsResetConfirmOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700 rounded font-bold transition-colors cursor-pointer shadow-2xl"
          >
            <RotateCcw size={14} />
            <span>RESET SYSTEM (WIPE ALL RECOVERY DATA)</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0b0818] border-2 border-red-500 p-5 rounded-sm max-w-sm w-full space-y-4 shadow-2xl font-mono text-xs text-slate-200">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
              <AlertTriangle size={18} className="animate-pulse" />
              <span>RESET VOID//OS?</span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              ALL RECOVERY DATA, CASE FILE DISCOVERIES, UNLOCKED FILES, AND OBJECTIVES WILL BE LOST.
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsResetConfirmOpen(false);
                  onResetGame();
                }}
                className="px-4 py-1.5 bg-red-800 hover:bg-red-700 text-white font-bold rounded border border-red-500 cursor-pointer shadow-retro-magenta"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
