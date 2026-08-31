import React, { useState, useRef } from 'react';
import { DesktopIconItem, AppId } from '../../types/os';
import { GameObjective } from '../../types/story';
import { DesktopIcon } from './DesktopIcon';
import { ObjectivesWidget } from './ObjectivesWidget';
import { sound } from '../../audio/soundEngine';
import { RefreshCw, Cpu, Terminal, Image, Briefcase, FolderPlus, Target, FileText } from 'lucide-react';

import { StoryState } from '../../types/story';

interface DesktopProps {
  icons: DesktopIconItem[];
  selectedIconIds: string[];
  onSelectIcon: (id: string, multi?: boolean) => void;
  onOpenApp: (appId: AppId, customData?: any) => void;
  onCreateNote?: () => void;
  onClearSelection: () => void;
  act: number;
  anomalyLevel: number;
  wallpaperTheme: string;
  storyState?: StoryState;
  showObjectives: boolean;
  onToggleObjectives: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  icons,
  selectedIconIds,
  onSelectIcon,
  onOpenApp,
  onCreateNote,
  onClearSelection,
  act,
  anomalyLevel,
  wallpaperTheme,
  storyState,
  showObjectives,
  onToggleObjectives,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (contextMenu) setContextMenu(null);
    if (e.target !== desktopRef.current && !(e.target as HTMLElement).classList.contains('desktop-grid-bg')) {
      return;
    }
    onClearSelection();
    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectionBox) {
      setSelectionBox({
        ...selectionBox,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    if (selectionBox) {
      setSelectionBox(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      ref={desktopRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      className="desktop-grid-bg relative flex-1 w-full overflow-hidden select-none"
      style={{
        backgroundColor: '#03050c',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(13, 27, 54, 0.5) 0%, rgba(2, 3, 7, 0.95) 100%),
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 32px 32px, 32px 32px',
      }}
    >
      {/* Desktop Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
        <div className="text-6xl sm:text-8xl font-black tracking-widest font-mono text-cyan-500/30">
          VOID//OS
        </div>
        <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-pink-500/40 mt-2">
          RECOVERY WORKSTATION // 2004 NEXUS SYSTEMS
        </div>
        {act >= 3 && (
          <div className="text-xs font-mono text-pink-500/60 mt-2 animate-pulse">
            CONSCIOUSNESS CORE ACTIVE
          </div>
        )}
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-4 grid grid-flow-col grid-rows-6 gap-y-4 gap-x-2 w-max max-h-[calc(100vh-48px)]">
        {icons.filter(i => !i.hidden).map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            appId={icon.appId}
            title={icon.title}
            isSelected={selectedIconIds.includes(icon.id)}
            isCorrupted={icon.corrupted || (act >= 3 && icon.appId === 'realitycore')}
            onSelect={(id) => onSelectIcon(id)}
            onOpen={(appId) => onOpenApp(appId)}
          />
        ))}
      </div>

      {/* Recovery Objectives Top-Right HUD Widget */}
      <ObjectivesWidget
        storyState={storyState}
        isVisible={showObjectives}
        onOpenFullLog={() => onOpenApp('objectives')}
      />

      {/* Marquee Drag Selection Box */}
      {selectionBox && (
        <div
          className="absolute border border-cyan-400 bg-cyan-500/15 pointer-events-none z-20"
          style={{
            left: Math.min(selectionBox.startX, selectionBox.currentX),
            top: Math.min(selectionBox.startY, selectionBox.currentY),
            width: Math.abs(selectionBox.currentX - selectionBox.startX),
            height: Math.abs(selectionBox.currentY - selectionBox.startY),
          }}
        />
      )}

      {/* Right Click Desktop Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bg-[#090e1f] border-2 border-cyan-500 py-1 w-56 shadow-2xl rounded-sm z-[9980] font-mono text-xs text-slate-200 select-none"
          style={{
            left: Math.min(window.innerWidth - 240, contextMenu.x),
            top: Math.min(window.innerHeight - 280, contextMenu.y),
          }}
        >
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('objectives');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Target size={13} className="text-cyan-400" />
            <span>Mission Objectives [TAB]</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('casefile');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Briefcase size={13} className="text-pink-400" />
            <span>Open Case File</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('files');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <FolderPlus size={13} />
            <span>Open File Explorer</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('terminal');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Terminal size={13} />
            <span>Open Terminal</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              if (onCreateNote) {
                onCreateNote();
              } else {
                onOpenApp('notes');
              }
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2 font-bold text-pink-400"
          >
            <FileText size={13} className="text-pink-400" />
            <span>+ New Personal Note</span>
          </button>
          <div className="h-[1px] bg-slate-800 my-1" />
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('systeminfo');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Cpu size={13} />
            <span>System Diagnostics</span>
          </button>
          <div className="h-[1px] bg-slate-800 my-1" />
          <button
            onClick={() => {
              sound.playClick();
              window.location.reload();
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <RefreshCw size={13} />
            <span>Refresh Desktop</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('settings');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Image size={13} />
            <span>Display Settings...</span>
          </button>
        </div>
      )}
    </div>
  );
};
