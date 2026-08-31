import React from 'react';
import { StoryState } from '../../types/story';
import { StoryEngine } from '../../state/storyEngine';
import { X, Bug, CheckCircle2, ShieldAlert } from 'lucide-react';
import { masterStoryActs } from '../../data/storyActs';

interface StoryDebugPanelProps {
  storyState: StoryState;
  onClose: () => void;
  onForceAdvanceAct: (act: any) => void;
  onTriggerFlag: (flag: string) => void;
}

export const StoryDebugPanel: React.FC<StoryDebugPanelProps> = ({
  storyState,
  onClose,
  onForceAdvanceAct,
  onTriggerFlag,
}) => {
  const activeObj = StoryEngine.getActiveObjective(storyState);
  const currentActObjectives = masterStoryActs[storyState.act] || [];

  return (
    <div className="fixed bottom-12 left-4 z-[999999] bg-[#050816]/95 border-2 border-yellow-500/80 p-4 rounded max-w-md w-full shadow-2xl font-mono text-xs text-slate-200 select-none max-h-[75vh] overflow-y-auto space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-yellow-500/50 pb-2 text-yellow-300 font-bold">
        <div className="flex items-center space-x-1.5">
          <Bug size={14} />
          <span>VOID//OS STORY PROGRESSION DEBUGGER</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
          <X size={14} />
        </button>
      </div>

      {/* Act & State */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 bg-[#080d22] rounded border border-slate-800">
          <div className="text-slate-500 text-[10px]">CURRENT ACT:</div>
          <div className="text-pink-400 font-bold">ACT {storyState.act}</div>
        </div>
        <div className="p-2 bg-[#080d22] rounded border border-slate-800">
          <div className="text-slate-500 text-[10px]">ANOMALY STABILITY:</div>
          <div className="text-cyan-300 font-bold">{storyState.anomalyStability}%</div>
        </div>
      </div>

      {/* Active Objective */}
      <div className="p-2.5 bg-[#040714] border border-cyan-900 rounded space-y-1">
        <div className="text-[10px] text-cyan-400 font-bold">ACTIVE OBJECTIVE:</div>
        <div className="text-xs font-bold text-slate-100">
          {activeObj?.title || 'None'}
        </div>
        <div className="text-[10px] text-slate-400">
          {activeObj?.task}
        </div>
        <div className="text-[9px] text-pink-400">
          Flag: {activeObj?.onCompleteFlag}
        </div>
      </div>

      {/* Act Objectives Checklist */}
      <div className="space-y-1">
        <div className="text-[10px] text-yellow-400 font-bold">ACT {storyState.act} CHECKLIST:</div>
        <div className="space-y-0.5 max-h-36 overflow-y-auto pr-1 text-[10px]">
          {currentActObjectives.map((obj) => {
            const isDone = Boolean(storyState.flags?.[obj.onCompleteFlag]);
            return (
              <div
                key={obj.id}
                onClick={() => onTriggerFlag(obj.onCompleteFlag)}
                className={`p-1 rounded flex items-center justify-between cursor-pointer ${
                  isDone ? 'bg-green-950/40 text-green-300' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>{obj.stepNumber}. {obj.title}</span>
                {isDone && <CheckCircle2 size={10} className="text-green-400 shrink-0 ml-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlocked Applications */}
      <div className="space-y-1">
        <div className="text-[10px] text-slate-400 font-bold">UNLOCKED APPS:</div>
        <div className="text-[10px] text-cyan-300">
          {(storyState.unlockedApps || []).join(', ')}
        </div>
      </div>

      {/* Quick Force Jump Buttons */}
      <div className="pt-2 border-t border-slate-800 flex space-x-1">
        {[1, 2, 3, 4, 5].map((actNum) => (
          <button
            key={actNum}
            onClick={() => onForceAdvanceAct(actNum)}
            className={`flex-1 py-1 rounded text-[10px] font-bold cursor-pointer ${
              storyState.act === actNum ? 'bg-pink-900 text-pink-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            ACT {actNum}
          </button>
        ))}
      </div>
    </div>
  );
};
