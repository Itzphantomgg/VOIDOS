import React, { useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { CheckSquare, Square, ChevronDown, ChevronUp, ShieldCheck, Target } from 'lucide-react';

interface ObjectivesWidgetProps {
  objectives: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
  }[];
  isVisible: boolean;
  onToggle: () => void;
}

export const ObjectivesWidget: React.FC<ObjectivesWidgetProps> = ({
  objectives,
  isVisible,
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isVisible) return null;

  const completedCount = objectives.filter(o => o.isCompleted).length;

  return (
    <div className="absolute top-4 right-4 z-20 w-72 sm:w-80 bg-[#070b1c]/90 border-2 border-cyan-500/80 rounded-sm shadow-2xl font-mono text-xs select-none backdrop-blur-xs">
      {/* Titlebar */}
      <div
        onClick={() => {
          sound.playClick();
          setIsCollapsed(!isCollapsed);
        }}
        className="bg-gradient-to-r from-[#07243d] to-[#1e0f33] p-2 border-b border-cyan-800 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-[11px] truncate">
          <Target size={14} className="text-cyan-400" />
          <span>RECOVERY OBJECTIVES ({completedCount}/{objectives.length})</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-[9px] text-slate-400 hidden sm:inline">[TAB]</span>
          <button className="text-slate-400 hover:text-cyan-300">
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {/* List */}
      {!isCollapsed && (
        <div className="p-2 space-y-2 max-h-72 overflow-y-auto divide-y divide-slate-800/60">
          {objectives.map((obj) => (
            <div key={obj.id} className="pt-1.5 first:pt-0">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 shrink-0 text-cyan-400">
                  {obj.isCompleted ? (
                    <CheckSquare size={14} className="text-green-400 drop-shadow-[0_0_6px_rgba(0,255,102,0.6)]" />
                  ) : (
                    <Square size={14} className="text-slate-500" />
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <div
                    className={`font-bold text-[11px] truncate ${
                      obj.isCompleted
                        ? 'text-slate-500 line-through'
                        : 'text-cyan-200'
                    }`}
                  >
                    {obj.title}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {obj.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
