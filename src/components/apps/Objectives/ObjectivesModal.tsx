import React from 'react';
import { GameObjective } from '../../../types/story';
import { Target, CheckCircle2, Lock, HelpCircle, ChevronRight } from 'lucide-react';

interface ObjectivesModalProps {
  objectives?: GameObjective[];
  onClose?: () => void;
}

export const ObjectivesModal: React.FC<ObjectivesModalProps> = ({ objectives = [] }) => {
  const validObjectives = Array.isArray(objectives) ? objectives : [];
  const currentObj = validObjectives.find(o => o && !o.isCompleted);
  const completedObjs = validObjectives.filter(o => o && o.isCompleted);
  const lockedObjs = validObjectives.filter(o => o && !o.isCompleted && o.id !== currentObj?.id);

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0a2540] via-[#141b38] to-[#300e40] p-3.5 border border-cyan-500 rounded flex items-center justify-between shadow-retro-cyan">
        <div className="flex items-center space-x-2.5">
          <Target size={20} className="text-cyan-400 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-cyan-300 tracking-wider">
              NEXUS RECOVERY MISSION DIRECTIVES
            </div>
            <div className="text-[10px] text-slate-400">
              WORKSTATION TERMINAL 04 // UNIT 4 RECOVERY LOG
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-0.5 bg-pink-950 border border-pink-700 text-pink-300 font-bold text-xs rounded">
            {completedObjs.length} / {validObjectives.length} COMPLETED
          </span>
        </div>
      </div>

      {/* 1. CURRENT OBJECTIVE */}
      {currentObj ? (
        <div className="p-3.5 bg-[#091024] border-2 border-cyan-400 rounded space-y-2 shadow-2xl">
          <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase flex items-center space-x-1.5">
            <Target size={12} className="text-pink-400" />
            <span>CURRENT PRIORITY OBJECTIVE [{String(currentObj.stepNumber || 1).padStart(2, '0')}]</span>
          </div>
          <div className="text-sm font-bold text-cyan-200 glow-cyan flex items-start space-x-2">
            <ChevronRight size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <span>{currentObj.title}</span>
          </div>
          <p className="text-xs text-slate-300 pl-6 leading-relaxed">
            {currentObj.description}
          </p>
          {currentObj.hint && (
            <div className="ml-6 p-2 bg-black/60 border border-cyan-800/80 rounded text-[11px] text-cyan-300 flex items-start space-x-1.5">
              <HelpCircle size={13} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>HINT:</strong> {currentObj.hint}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-[#091024] border border-green-500 rounded text-center text-green-300 font-bold">
          ✓ ALL MISSION RECOVERY OBJECTIVES COMPLETED
        </div>
      )}

      {/* 2. COMPLETED OBJECTIVES */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-green-400 tracking-wider flex items-center space-x-1.5 border-b border-slate-800 pb-1">
          <CheckCircle2 size={14} />
          <span>COMPLETED RECOVERY DIRECTIVES ({completedObjs.length})</span>
        </div>

        {completedObjs.length === 0 ? (
          <div className="text-slate-500 text-xs italic pl-2">No directives completed yet.</div>
        ) : (
          <div className="space-y-1.5">
            {completedObjs.map((obj) => (
              <div
                key={obj.id}
                className="p-2 bg-[#080d1e] border border-green-900/60 rounded flex items-start space-x-2.5 text-xs text-slate-300"
              >
                <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-slate-400 line-through">
                    [{String(obj.stepNumber || 1).padStart(2, '0')}] {obj.title}
                  </div>
                  <div className="text-[10px] text-slate-500">{obj.shortTask}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. LOCKED FUTURE OBJECTIVES */}
      {lockedObjs.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider flex items-center space-x-1.5 border-b border-slate-800 pb-1">
            <Lock size={14} className="text-slate-500" />
            <span>LOCKED / FUTURE DIRECTIVES ({lockedObjs.length})</span>
          </div>

          <div className="space-y-1.5">
            {lockedObjs.map((obj) => (
              <div
                key={obj.id}
                className="p-2 bg-[#050711] border border-slate-900 rounded flex items-center space-x-2.5 text-xs text-slate-600"
              >
                <Lock size={13} className="text-slate-700 shrink-0" />
                <div className="flex-1 truncate">
                  <span className="font-bold">[{String(obj.stepNumber || '?').padStart(2, '0')}] ?</span>
                  <span className="text-[10px] ml-2 text-slate-700">Investigation required to unlock parameters</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
