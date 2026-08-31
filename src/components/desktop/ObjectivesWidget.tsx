import React from 'react';
import { GameObjective } from '../../types/story';
import { sound } from '../../audio/soundEngine';
import { CheckCircle2, ChevronRight, Target, HelpCircle, Layers } from 'lucide-react';

interface ObjectivesWidgetProps {
  objectives?: GameObjective[];
  isVisible: boolean;
  onOpenFullLog: () => void;
}

export const ObjectivesWidget: React.FC<ObjectivesWidgetProps> = ({
  objectives = [],
  isVisible,
  onOpenFullLog,
}) => {
  if (!isVisible) return null;

  const validObjectives = Array.isArray(objectives) ? objectives : [];
  if (validObjectives.length === 0) return null;

  // Find the first uncompleted objective, or the last one if all completed
  const currentObj = validObjectives.find(o => o && !o.isCompleted) || validObjectives[validObjectives.length - 1];
  const completedCount = validObjectives.filter(o => o && o.isCompleted).length;
  const totalSteps = validObjectives.length;
  const currentStep = currentObj?.stepNumber || (completedCount < totalSteps ? completedCount + 1 : totalSteps);

  return (
    <div
      onClick={() => {
        sound.playClick();
        onOpenFullLog();
      }}
      className="absolute top-4 right-4 z-20 w-72 sm:w-80 bg-[#070c1e]/92 border-2 border-cyan-500/90 rounded-sm shadow-2xl font-mono text-xs select-none backdrop-blur-xs cursor-pointer group hover:border-pink-500 transition-colors"
      title="Click or press TAB for Full Mission Log"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#07243d] via-[#101a38] to-[#2b0e3d] px-3 py-1.5 border-b border-cyan-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-[11px] tracking-wider">
          <Target size={14} className="text-cyan-400 animate-pulse" />
          <span>RECOVERY OBJECTIVE</span>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px]">
          <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold rounded-xs">
            {String(currentStep).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-slate-400 group-hover:text-pink-300">[TAB]</span>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="p-3 space-y-2">
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
                {currentObj.shortTask || currentObj.title || 'Inspect system parameters'}
              </span>
            </div>
          </div>
        )}

        {/* Short Hint */}
        {currentObj && currentObj.hint && !currentObj.isCompleted && (
          <div className="p-2 bg-[#040714]/80 border-l-2 border-cyan-500 rounded-r-xs space-y-0.5">
            <div className="text-[9px] text-cyan-400 font-bold flex items-center space-x-1">
              <HelpCircle size={10} />
              <span>HINT:</span>
            </div>
            <div className="text-[10px] text-slate-300 leading-tight">
              {currentObj.hint}
            </div>
          </div>
        )}

        {/* Bottom Shortcut Prompt */}
        <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
          <span className="text-slate-500">Progress: {completedCount}/{totalSteps} Objectives</span>
          <span className="text-pink-400 font-bold group-hover:underline flex items-center space-x-1">
            <Layers size={10} />
            <span>Full Log [TAB]</span>
          </span>
        </div>
      </div>
    </div>
  );
};
