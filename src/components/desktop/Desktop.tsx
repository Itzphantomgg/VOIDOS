import React, { useState, useRef } from 'react';
import { DesktopIconItem, AppId } from '../../types/os';
import { DesktopIcon } from './DesktopIcon';
import { sound } from '../../audio/soundEngine';
import { RefreshCw, FileText, Cpu, Terminal, Image, Eye } from 'lucide-react';

interface DesktopProps {
  icons: DesktopIconItem[];
  selectedIconIds: string[];
  onSelectIcon: (id: string, multi?: boolean) => void;
  onOpenApp: (appId: AppId, customData?: any) => void;
  onClearSelection: () => void;
  act: number;
  anomalyLevel: number;
  wallpaperTheme: string;
}

export const Desktop: React.FC<DesktopProps> = ({
  icons,
  selectedIconIds,
  onSelectIcon,
  onOpenApp,
  onClearSelection,
  act,
  anomalyLevel,
  wallpaperTheme,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Marquee selection
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
      {/* Desktop Watermark / Cyber Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
        <div className="text-6xl sm:text-8xl font-black tracking-widest font-mono text-cyan-500/30">
          VOID//OS
        </div>
        <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-pink-500/40 mt-2">
          REVISION 4.09.2a // AETHELGARD COGNITIVE MATRIX
        </div>
        {act >= 3 && (
          <div className="text-xs font-mono text-red-500/60 mt-2 animate-pulse">
            CONSCIOUSNESS CORE SYNCHRONIZED
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

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bg-[#090e1f] border-2 border-cyan-500 py-1 w-48 shadow-2xl rounded-sm z-[9980] font-mono text-xs text-slate-200 select-none"
          style={{
            left: Math.min(window.innerWidth - 200, contextMenu.x),
            top: Math.min(window.innerHeight - 220, contextMenu.y),
          }}
        >
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
              onOpenApp('notes');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <FileText size={13} />
            <span>New Note</span>
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
              onOpenApp('settings');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 hover:bg-cyan-950 hover:text-cyan-300 text-left flex items-center space-x-2"
          >
            <Image size={13} />
            <span>Personalize...</span>
          </button>
        </div>
      )}
    </div>
  );
};
