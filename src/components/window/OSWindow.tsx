import React, { useState, useRef, useEffect } from 'react';
import { OSWindowState } from '../../types/os';
import { AppIcon } from '../desktop/AppIcon';
import { Minus, Square, Copy, X } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface OSWindowProps {
  window: OSWindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateSize: (w: number, h: number) => void;
  children: React.ReactNode;
}

export const OSWindow: React.FC<OSWindowProps> = ({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onUpdateSize,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0, posX: 0, posY: 0 });

  // Dragging logic
  const handleTitlebarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    });
  };

  // Resizing logic
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (win.isMaximized) return;
    onFocus();
    setIsResizing(handle);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: win.size.width,
      height: win.size.height,
      posX: win.position.x,
      posY: win.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(-win.size.width + 100, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
        onUpdatePosition(newX, newY);
      } else if (isResizing) {
        const start = resizeStartRef.current;
        const deltaX = e.clientX - start.mouseX;
        const deltaY = e.clientY - start.mouseY;
        const minW = win.minSize?.width || 320;
        const minH = win.minSize?.height || 220;

        let newW = start.width;
        let newH = start.height;
        let newX = start.posX;
        let newY = start.posY;

        if (isResizing.includes('e')) {
          newW = Math.max(minW, start.width + deltaX);
        }
        if (isResizing.includes('s')) {
          newH = Math.max(minH, start.height + deltaY);
        }
        if (isResizing.includes('w')) {
          const possibleW = start.width - deltaX;
          if (possibleW >= minW) {
            newW = possibleW;
            newX = start.posX + deltaX;
          }
        }
        if (isResizing.includes('n')) {
          const possibleH = start.height - deltaY;
          if (possibleH >= minH) {
            newH = possibleH;
            newY = start.posY + deltaY;
          }
        }

        onUpdateSize(newW, newH);
        if (newX !== start.posX || newY !== start.posY) {
          onUpdatePosition(newX, newY);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
      if (isResizing) setIsResizing(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, win]);

  if (win.isMinimized) return null;

  return (
    <div
      onClick={onFocus}
      className={`fixed select-none flex flex-col font-sans transition-shadow ${
        isActive ? 'retro-window-frame retro-window-active' : 'retro-window-frame opacity-90'
      }`}
      style={{
        zIndex: win.zIndex,
        left: win.isMaximized ? 0 : win.position.x,
        top: win.isMaximized ? 0 : win.position.y,
        width: win.isMaximized ? '100vw' : `${win.size.width}px`,
        height: win.isMaximized ? 'calc(100vh - 40px)' : `${win.size.height}px`,
      }}
    >
      {/* Window Titlebar */}
      <div
        onMouseDown={handleTitlebarMouseDown}
        onDoubleClick={onMaximize}
        className={`h-7 px-2 flex items-center justify-between cursor-move select-none ${
          isActive ? 'retro-titlebar-active' : 'retro-titlebar-inactive'
        }`}
      >
        {/* Title & Icon */}
        <div className="flex items-center space-x-2 truncate">
          <AppIcon appId={win.appId} size={15} />
          <span
            className={`text-xs font-mono font-bold tracking-wide truncate ${
              isActive ? 'text-cyan-200' : 'text-slate-400'
            }`}
          >
            {win.title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center space-x-1 pl-2">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMinimize();
            }}
            className="w-5 h-5 bg-[#121a30] hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-600 flex items-center justify-center rounded-xs transition-colors"
            title="Minimize"
          >
            <Minus size={11} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMaximize();
            }}
            className="w-5 h-5 bg-[#121a30] hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-600 flex items-center justify-center rounded-xs transition-colors"
            title={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            {win.isMaximized ? <Copy size={10} /> : <Square size={10} />}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowClose();
              onClose();
            }}
            className="w-5 h-5 bg-[#250d18] hover:bg-pink-800 text-pink-300 hover:text-white border border-pink-700 flex items-center justify-center rounded-xs transition-colors"
            title="Close"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden relative bg-[#070b1a] flex flex-col">
        {children}
      </div>

      {/* Resize Handles (Only when not maximized) */}
      {!win.isMaximized && (
        <>
          <div
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            className="absolute left-0 top-0 bottom-0 w-2 cursor-w-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            className="absolute top-0 left-0 right-0 h-2 cursor-n-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute right-0 bottom-0 w-3 h-3 cursor-se-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute left-0 bottom-0 w-3 h-3 cursor-sw-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute right-0 top-0 w-3 h-3 cursor-ne-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute left-0 top-0 w-3 h-3 cursor-nw-resize"
          />
        </>
      )}
    </div>
  );
};
