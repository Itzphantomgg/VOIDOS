import React, { useState } from 'react';
import { AppId } from '../../types/os';
import { AppIcon } from './AppIcon';
import { sound } from '../../audio/soundEngine';
import { Power, RotateCcw, Search, ShieldAlert, Target } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onShutdown: () => void;
  onReboot: () => void;
  onHardReset: () => void;
  act: number;
  anomalyLevel: number;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onShutdown,
  onReboot,
  onHardReset,
  act,
  anomalyLevel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const appItems: { id: AppId; title: string; desc: string }[] = [
    { id: 'objectives', title: 'Recovery Objectives', desc: 'Mission Directives & Tasks [TAB]' },
    { id: 'casefile', title: 'Case File Journal', desc: 'Story Dossier & Investigation' },
    { id: 'files', title: 'File Explorer', desc: 'Browse Virtual File System' },
    { id: 'terminal', title: 'Terminal Diagnostics', desc: 'Monospace Command Line' },
    { id: 'browser', title: 'NetSeek Browser', desc: 'Intranet & Web Archive' },
    { id: 'messages', title: 'Messages', desc: 'Operator Chat Channel' },
    { id: 'mail', title: 'Mail Client', desc: 'Aethelgard Email' },
    { id: 'taskmanager', title: 'Task Manager', desc: 'Process Telemetry' },
    { id: 'notes', title: 'Notes', desc: 'Technician Scratchpad' },
    { id: 'mediaplayer', title: 'VoidPlayer Media', desc: 'Audio & Synth Visualizer' },
    { id: 'systeminfo', title: 'System Diagnostics', desc: 'Hardware & Neural Metrics' },
    { id: 'systemlogs', title: 'Event Viewer Logs', desc: 'Real-time Security Telemetry' },
    { id: 'settings', title: 'Settings', desc: 'Themes, Display & Audio' },
    { id: 'trash', title: 'Recycle Bin', desc: 'Deleted File Staging' },
  ];

  if (act >= 3) {
    appItems.unshift({
      id: 'realitycore',
      title: 'REALITY CORE',
      desc: 'Consciousness Interface',
    });
  }

  const filteredApps = appItems.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-11 left-1 w-80 sm:w-96 bg-[#0a0e20] border-2 border-[#00f0ff] shadow-2xl shadow-cyan-950 z-[9990] flex flex-col font-mono text-xs select-none rounded-t-sm"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#00385c] via-[#10193d] to-[#3b0d4d] p-3 border-b border-cyan-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-cyan-400 text-black flex items-center justify-center font-bold text-xs rounded-sm">
            V//O
          </div>
          <div>
            <div className="text-cyan-300 font-bold text-sm tracking-wider">VOID//OS</div>
            <div className="text-[10px] text-slate-400">RECOVERY UNIT // TERMINAL 04</div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-1.5 py-0.5 bg-pink-950 border border-pink-700 text-pink-400 text-[10px] font-bold">
            ACT {act}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-slate-800 bg-[#070b1a] flex items-center space-x-2">
        <Search size={14} className="text-cyan-400" />
        <input
          type="text"
          placeholder="Search programs and files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-mono placeholder:text-slate-600"
          autoFocus
        />
      </div>

      {/* Main Body */}
      <div className="flex h-72">
        {/* Left Side: App List */}
        <div className="flex-1 overflow-y-auto p-1 space-y-0.5 bg-[#090d1f]">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                sound.playClick();
                onOpenApp(app.id);
                onClose();
              }}
              className="w-full flex items-center space-x-2.5 p-1.5 hover:bg-cyan-950/60 hover:border-cyan-500/50 border border-transparent rounded text-left transition-colors cursor-pointer group"
            >
              <AppIcon appId={app.id} size={20} />
              <div className="overflow-hidden">
                <div className="text-slate-200 group-hover:text-cyan-300 font-bold text-xs truncate">
                  {app.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{app.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Quick Stats & Lore Box */}
        <div className="w-32 bg-[#050814] border-l border-slate-800 p-2 flex flex-col justify-between text-[10px] text-slate-400">
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
              STATUS
            </div>
            <div>
              <div className="text-slate-500">ANOMALY:</div>
              <div className="text-pink-400 font-bold">{anomalyLevel}%</div>
              <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden mt-0.5">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-pink-500 h-full"
                  style={{ width: `${anomalyLevel}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-slate-500">ASSIGNMENT:</div>
              <div className="text-cyan-300 font-bold">RECOVERY</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1">
            <div className="text-[9px] text-slate-600 text-center">
              NEXUS SYSTEMS
            </div>
          </div>
        </div>
      </div>

      {/* Footer Power Controls */}
      <div className="bg-[#060917] p-2 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onHardReset();
          }}
          className="flex items-center space-x-1 px-2 py-1 bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 text-[10px] rounded transition-colors cursor-pointer"
          title="Reset game state"
        >
          <ShieldAlert size={12} />
          <span>RESET SYSTEM</span>
        </button>

        <div className="flex space-x-1.5">
          <button
            onClick={() => {
              sound.playClick();
              onReboot();
            }}
            className="flex items-center space-x-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] rounded border border-slate-700 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>RESTART</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onShutdown();
            }}
            className="flex items-center space-x-1 px-2 py-1 bg-pink-950/80 hover:bg-pink-900 text-pink-300 text-[10px] rounded border border-pink-700 cursor-pointer"
          >
            <Power size={12} />
            <span>SHUTDOWN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
