import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  enabled: boolean;
  act: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled, act }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'grab'>('default');
  const [isGhostGlitching, setIsGhostGlitching] = useState(false);
  const [ghostOffset, setGhostOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Determine element type under cursor
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest('button, a, [role="button"], input[type="button"], .cursor-pointer');
      const isTextInput = target.closest('input[type="text"], textarea, .cursor-text');

      if (isTextInput) {
        setCursorType('text');
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  // Rare simulated cursor ghost movement in Act 3/4
  useEffect(() => {
    if (act < 3) return;

    const ghostInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        setIsGhostGlitching(true);
        setGhostOffset({
          x: (Math.random() - 0.5) * 40,
          y: (Math.random() - 0.5) * 40,
        });

        setTimeout(() => {
          setIsGhostGlitching(false);
        }, 300);
      }
    }, 15000);

    return () => clearInterval(ghostInterval);
  }, [act]);

  if (!enabled || pos.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden">
      {/* Ghost lag cursor during high anomalies */}
      {isGhostGlitching && (
        <div
          className="absolute transition-transform duration-75 ease-out opacity-40 text-pink-500"
          style={{
            transform: `translate3d(${pos.x + ghostOffset.x}px, ${pos.y + ghostOffset.y}px, 0)`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 2L9 18L12 11L18 8L2 2Z" fill="#ff007f" stroke="#000" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* Main Cursor */}
      <div
        className="absolute"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        {cursorType === 'pointer' ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <path
              d="M7 2V12H9V5H11V12H13V7H15V12H17V9H19V19C19 21.7614 16.7614 24 14 24H8C5.23858 24 3 21.7614 3 19V8H7V2Z"
              fill="#00f0ff"
              stroke="#000"
              strokeWidth="1.5"
            />
          </svg>
        ) : cursorType === 'text' ? (
          <div className="w-1.5 h-4 bg-cyan-400 border border-black shadow-retro-cyan animate-pulse" />
        ) : (
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <path d="M2 2L9 18L12 11L18 8L2 2Z" fill="#00f0ff" stroke="#000" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
};
