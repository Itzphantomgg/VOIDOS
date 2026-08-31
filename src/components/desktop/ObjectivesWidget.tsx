import React, { useState } from 'react';
import { GameObjective } from '../../types/story';
import { sound } from '../../audio/soundEngine';
import { Target, HelpCircle, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ObjectivesWidgetProps {
  objectives?: GameObjective[];
  isVisible: boolean;
  onOpenFullLog: () => void;
  act?: number;
}

export const ObjectivesWidget: React.FC<ObjectivesWidgetProps> = ({
  objectives = [],
  isVisible,
  onOpenFullLog,
  act = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  const validObjectives = Array.isArray(objectives) ? objectives : [];
  if (validObjectives.length === 0) return null;

  const currentObj = validObjectives.find(o => o && !o.isCompleted) || validObjectives[validObjectives.length - 1];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        try {
          sound.playClick();
        } catch {}
        onOpenFullLog();
      }}
      className={`absolute top-2.5 right-4 z-20 font-mono text-xs select-none backdrop-blur-md cursor-pointer transition-all duration-200 rounded border shadow-lg ${
        isHovered
          ? 'w-72 bg-[#050816]/95 border-cyan-500'
          : 'w-auto px-2.5 py-1 bg-[#050816]/80 border-slate-700 hover:border-cyan-500'
      }`}
      title="Hover to view directive // Click or press TAB for Full Mission Log"
    >
      {/* Compact Default State: Just [◎] OBJ */}
      {!isHovered ? (
        <div className="flex items-center space-x-1.5 text-cyan-300 font-bold text-[11px]">
          <Target size={12} className="text-cyan-400 animate-pulse shrink-0" />
          <span>OBJ</span>
          <span className="text-[9px] text-slate-500 font-normal">[TAB]</span>
        </div>
      ) : (
        /* Smooth Expanded State on Hover */
        <div className="p-3 space-y-2 animate-fadeIn">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px]">
            <div className="flex items-center space-x-1.5 text-cyan-300 font-bold">
              <Target size={12} className="text-cyan-400 shrink-0" />
              <span>RECOVERY OBJECTIVE</span>
            </div>
            <span className="text-pink-400 font-bold">ACT {act}</span>
          </div>

          {/* Current Task */}
          {currentObj && (
            <div className="space-y-1">
              <div className="text-[9px] text-slate-400 font-bold tracking-wider">
                CURRENT TASK:
              </div>
              <div className="text-[11px] font-bold text-slate-100 flex items-start space-x-1 leading-snug">
                <ChevronRight size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                <span className={currentObj.isCompleted ? 'line-through text-slate-500' : 'text-cyan-200'}>
                  {currentObj.title || 'Inspect system parameters'}
                </span>
              </div>
            </div>
          )}

          {/* Hint */}
          {currentObj && currentObj.hint && !currentObj.isCompleted && (
            <div className="p-1.5 bg-[#030612] border-l border-cyan-500 rounded-r text-[10px] space-y-0.5">
              <div className="text-cyan-400 font-bold flex items-center space-x-1 text-[9px]">
                <HelpCircle size={9} />
                <span>HINT:</span>
              </div>
              <div className="text-slate-300 leading-tight">
                {currentObj.hint}
              </div>
            </div>
          )}

          {/* Footer Shortcut */}
          <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
            <span className="text-slate-500">Click or press [TAB]</span>
            <span className="text-pink-400 font-bold flex items-center space-x-1">
              <Layers size={9} />
              <span>Full Log</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
