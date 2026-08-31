import React from 'react';
import { StoryState, StoryAct } from '../../../types/story';
import { StoryEngine } from '../../../state/storyEngine';
import { masterStoryActs } from '../../../data/storyActs';
import { Target, CheckCircle2, Lock, HelpCircle, ChevronRight, MapPin, Info } from 'lucide-react';

interface ObjectivesModalProps {
  storyState?: StoryState;
  onClose?: () => void;
}

export const ObjectivesModal: React.FC<ObjectivesModalProps> = ({ storyState }) => {
  const currentAct = storyState?.act || 1;
  const flags = storyState?.flags || {};
  const currentActObjectives = masterStoryActs[currentAct] || [];
  const activeObj = storyState ? StoryEngine.getActiveObjective(storyState) : currentActObjectives[0];

  const actTitles: Record<StoryAct, string> = {
    1: 'ACT I: RECOVERY',
    2: 'ACT II: THE INCIDENT',
    3: 'ACT III: OBSERVATION',
    4: 'ACT IV: CONTACT',
    5: 'ACT V: CONTROL',
  };

  const completedCount = currentActObjectives.filter(o => flags[o.onCompleteFlag]).length;
  const totalCount = currentActObjectives.length;

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-[#090e24] p-3.5 border border-cyan-500 rounded flex items-center justify-between shadow-retro-cyan">
        <div className="flex items-center space-x-2.5">
          <Target size={20} className="text-cyan-400 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-cyan-300 tracking-wider">
              NEXUS RECOVERY MISSION DIRECTIVES // {actTitles[currentAct]}
            </div>
            <div className="text-[10px] text-slate-400">
              WORKSTATION TERMINAL 04 // OPERATOR JOURNAL
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-0.5 bg-pink-950 border border-pink-700 text-pink-300 font-bold text-xs rounded">
            {completedCount} / {totalCount} IN {actTitles[currentAct].split(':')[0]}
          </span>
        </div>
      </div>

      {/* 1. CURRENT ACTIVE OBJECTIVE */}
      {activeObj ? (
        <div className="p-3.5 bg-[#091024] border-2 border-cyan-400 rounded space-y-2.5 shadow-2xl">
          <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase flex items-center space-x-1.5">
            <Target size={12} className="text-pink-400" />
            <span>CURRENT PRIORITY OBJECTIVE [{String(activeObj.stepNumber).padStart(2, '0')}]</span>
          </div>

          <div className="text-sm font-bold text-cyan-200 glow-cyan flex items-start space-x-2">
            <ChevronRight size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <span>{activeObj.title}</span>
          </div>

          <p className="text-xs text-slate-200 pl-6 leading-relaxed">
            {activeObj.task}
          </p>

          {/* Where & Why Breakdown */}
          <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2 bg-black/60 border border-slate-800 rounded flex items-start space-x-1.5">
              <MapPin size={13} className="text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300">WHERE:</strong> {activeObj.where}
              </div>
            </div>
            <div className="p-2 bg-black/60 border border-slate-800 rounded flex items-start space-x-1.5">
              <Info size={13} className="text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-purple-300">WHY:</strong> {activeObj.why}
              </div>
            </div>
          </div>

          {/* Hint */}
          {activeObj.hint && (
            <div className="ml-6 p-2 bg-[#040714] border-l-2 border-cyan-500 rounded-r text-[11px] text-cyan-300 flex items-start space-x-1.5">
              <HelpCircle size={13} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>HINT:</strong> {activeObj.hint}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-[#091024] border border-green-500 rounded text-center text-green-300 font-bold">
          ✓ ALL CURRENT DIRECTIVES COMPLETED
        </div>
      )}

      {/* 2. ACT DIRECTIVES CHECKLIST */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-300 tracking-wider flex items-center space-x-1.5 border-b border-slate-800 pb-1">
          <CheckCircle2 size={14} className="text-green-400" />
          <span>{actTitles[currentAct]} DIRECTIVE CHECKLIST ({completedCount}/{totalCount})</span>
        </div>

        <div className="space-y-1.5">
          {currentActObjectives.map((obj) => {
            const isCompleted = Boolean(flags[obj.onCompleteFlag]);
            const isCurrent = activeObj?.id === obj.id;

            return (
              <div
                key={obj.id}
                className={`p-2.5 rounded border flex items-start space-x-2.5 text-xs transition-colors ${
                  isCurrent
                    ? 'bg-[#091432] border-cyan-500 text-cyan-100 shadow-retro-cyan'
                    : isCompleted
                    ? 'bg-[#070b18] border-green-900/60 text-slate-400'
                    : 'bg-[#050711] border-slate-900 text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
                ) : isCurrent ? (
                  <Target size={15} className="text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                ) : (
                  <Lock size={14} className="text-slate-600 shrink-0 mt-0.5" />
                )}

                <div className="flex-1">
                  <div className={`font-bold ${isCompleted ? 'line-through text-slate-500' : isCurrent ? 'text-cyan-300' : 'text-slate-500'}`}>
                    [{String(obj.stepNumber).padStart(2, '0')}] {obj.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {isCompleted ? obj.task : isCurrent ? obj.task : 'Locked directive parameter'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
