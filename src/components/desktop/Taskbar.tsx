import React from 'react';
import { OSWindowState, AppId } from '../../types/os';
import { AppIcon } from './AppIcon';
import { SystemTray } from './SystemTray';
import { sound } from '../../audio/soundEngine';

interface TaskbarProps {
  windows: OSWindowState[];
  activeWindowId: string | null;
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onSelectWindow: (windowId: string) => void;
  onQuickLaunch: (appId: AppId) => void;
  notifications: any[];
  onToggleNotifications: () => void;
  anomalyLevel: number;
  act: number;
  masterVolume: number;
  onVolumeChange: (v: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  isStartMenuOpen,
  onToggleStartMenu,
  onSelectWindow,
  onQuickLaunch,
  notifications,
  onToggleNotifications,
  anomalyLevel,
  act,
  masterVolume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="h-10 bg-[#080d1e] border-t-2 border-[#1c2747] flex items-center justify-between z-[9900] select-none text-xs font-mono shadow-2xl relative">
      {/* Left side: Start Button & Quick Launch */}
      <div className="flex items-center space-x-1 px-1 h-full">
        {/* Retro Start Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onToggleStartMenu();
          }}
          className={`flex items-center space-x-2 px-3 py-1 font-bold text-xs rounded-sm transition-all cursor-pointer border ${
            isStartMenuOpen
              ? 'bg-cyan-500 text-black border-cyan-300 shadow-retro-cyan'
              : 'bg-gradient-to-r from-[#0d2238] to-[#1a1236] text-cyan-300 border-cyan-600/60 hover:border-cyan-400 hover:text-white'
          }`}
        >
          <div className="w-4 h-4 bg-cyan-400 text-black flex items-center justify-center font-bold text-[10px] rounded-xs">
            V
          </div>
          <span className="tracking-wider">START</span>
        </button>

        {/* Quick Launch Separator */}
        <div className="h-5 w-[1px] bg-slate-700 mx-1" />

        {/* Quick Launch Icons */}
        <div className="hidden sm:flex items-center space-x-1">
          <button
            onClick={() => onQuickLaunch('files')}
            className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400"
            title="File Explorer"
          >
            <AppIcon appId="files" size={16} />
          </button>
          <button
            onClick={() => onQuickLaunch('terminal')}
            className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-green-400"
            title="Terminal Diagnostics"
          >
            <AppIcon appId="terminal" size={16} />
          </button>
          <button
            onClick={() => onQuickLaunch('browser')}
            className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-blue-400"
            title="NetSeek Browser"
          >
            <AppIcon appId="browser" size={16} />
          </button>
          <button
            onClick={() => onQuickLaunch('messages')}
            className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-pink-400"
            title="Messages"
          >
            <AppIcon appId="messages" size={16} />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-slate-700 mx-1 hidden sm:block" />

        {/* Window Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-[45vw] no-scrollbar">
          {windows.map((win) => {
            const isActive = win.id === activeWindowId && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => {
                  sound.playClick();
                  onSelectWindow(win.id);
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-sm border max-w-[140px] sm:max-w-[180px] truncate text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#152345] border-cyan-400 text-cyan-300 shadow-retro-cyan font-bold'
                    : win.isMinimized
                    ? 'bg-[#080d1a] border-slate-800 text-slate-500 opacity-60 hover:opacity-100'
                    : 'bg-[#0b1226] border-slate-700 text-slate-300 hover:bg-[#101b38] hover:border-slate-500'
                }`}
              >
                <AppIcon appId={win.appId} size={14} />
                <span className="truncate text-[11px]">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: System Tray */}
      <SystemTray
        notifications={notifications}
        onToggleNotifications={onToggleNotifications}
        anomalyLevel={anomalyLevel}
        act={act}
        masterVolume={masterVolume}
        onVolumeChange={onVolumeChange}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />
    </div>
  );
};
