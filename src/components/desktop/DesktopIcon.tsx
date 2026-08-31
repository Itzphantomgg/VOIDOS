import React from 'react';
import { AppId } from '../../types/os';
import { AppIcon } from './AppIcon';
import { sound } from '../../audio/soundEngine';

interface DesktopIconProps {
  id: string;
  appId: AppId;
  title: string;
  isSelected: boolean;
  isCorrupted?: boolean;
  onSelect: (id: string) => void;
  onOpen: (appId: AppId) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  appId,
  title,
  isSelected,
  isCorrupted,
  onSelect,
  onOpen,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        sound.playClick();
        onSelect(id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        sound.playClick();
        onOpen(appId);
      }}
      className={`group flex flex-col items-center justify-center p-2 rounded w-20 sm:w-24 text-center cursor-pointer transition-all duration-75 select-none ${
        isSelected
          ? 'bg-cyan-500/20 border border-cyan-400/80 shadow-retro-cyan'
          : 'hover:bg-slate-800/40 border border-transparent'
      }`}
    >
      <div className="relative mb-1 flex items-center justify-center">
        <AppIcon appId={appId} size={36} className="transform group-hover:scale-105 transition-transform" />
        {isCorrupted && (
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
        )}
      </div>
      <span
        className={`text-[11px] font-mono leading-tight px-1 py-0.5 rounded tracking-wide ${
          isSelected
            ? 'bg-cyan-500 text-black font-bold'
            : isCorrupted
            ? 'text-pink-400 glow-magenta'
            : 'text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
