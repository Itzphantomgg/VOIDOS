import React, { useState } from 'react';
import { GameObjective } from '../../types/story';
import { sound } from '../../audio/soundEngine';
import { CheckCircle2, ChevronRight, Target, HelpCircle, Layers, ChevronDown } from 'lucide-react';

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
  const completedCount = validObjectives.filter(o => o && o.isCompleted).length;
  const totalSteps = validObjectives.length;
  const currentStep = currentObj?.stepNumber || (completedCount < totalSteps ? completedCount + 1 : totalSteps);

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
      className={`absolute top-2.5 right-4 z-20 font-mono text-xs select-none backdrop-blur-md cursor-pointer transition-all duration-300 rounded border shadow-2xl ${
        isHovered
          ? 'w-72 sm:w-80 bg-[#070c1e]/95 border-cyan-400 shadow-retro-cyan'
          : 'w-auto max-w-[280px] bg-[#050816]/85 border-cyan-600/60 hover:border-cyan-400'
      }`}
      title="Hover to expand // Click or press TAB for Full Mission Log"
    >
      {/* Header Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-[11px] tracking-wider">
          <Target size={13} className="text-cyan-400 animate-pulse shrink-0" />
          <span className="truncate">
            {isHovered ? 'RECOVERY OBJECTIVES' : `OBJ ${String(currentStep).padStart(2, '0')}: ${currentObj?.shortTask || 'Inspect system'}`}
          </span>
        </div>

        <div className="flex items-center space-x-1 text-[10px] shrink-0">
          <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold rounded-xs">
            {String(currentStep).padStart(2, '0')}/{String(totalSteps).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-pink-400 font-bold">[TAB]</span>
        </div>
      </div>

      {/* Expanded Content View on Hover */}
      {isHovered && (
        <div className="p-3 border-t border-cyan-900/80 space-y-2.5 animate-fadeIn">
          {/* Active Task */}
          {currentObj && (
            <div className="space-y-1">
              <div className="text-[10px] text-pink-400 font-bold tracking-wider flex items-center justify-between">
                <span>CURRENT TASK:</span>
                {currentObj.isCompleted && (
                  <span className="text-green-400 flex items-center space-x-1 text-[9px]">
                    <CheckCircle2 size={11} />
                    <span>COMPLETED</span>
                  </span>
                )}
              </div>

              <div className="text-xs font-bold text-slate-100 flex items-start space-x-1.5 leading-snug">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span className={currentObj.isCompleted ? 'line-through text-slate-400' : 'text-cyan-200 glow-cyan'}>
                  {currentObj.title || 'Inspect system parameters'}
                </span>
              </div>
            </div>
          )}

          {/* Hint */}
          {currentObj && currentObj.hint && !currentObj.isCompleted && (
            <div className="p-2 bg-[#040714]/90 border-l-2 border-cyan-500 rounded-r-xs space-y-0.5">
              <div className="text-[9px] text-cyan-400 font-bold flex items-center space-x-1">
                <HelpCircle size={10} />
                <span>HINT:</span>
              </div>
              <div className="text-[10px] text-slate-300 leading-tight">
                {currentObj.hint}
              </div>
            </div>
          )}

          {/* Footer Stats */}
          <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
            <span className="text-slate-500">Progress: {completedCount}/{totalSteps} Objectives (ACT {act})</span>
            <span className="text-pink-400 font-bold flex items-center space-x-1">
              <Layers size={10} />
              <span>Full Log [TAB]</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
