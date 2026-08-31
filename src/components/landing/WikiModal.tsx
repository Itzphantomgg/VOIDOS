import React from 'react';
import { sound } from '../../audio/soundEngine';
import { BookOpen, X } from 'lucide-react';
import { WikiApp } from '../apps/Wiki/WikiApp';

interface WikiModalProps {
  act?: number;
  onClose: () => void;
}

export const WikiModal: React.FC<WikiModalProps> = ({ act = 1, onClose }) => {
  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 flex items-center justify-center p-4 select-none font-mono text-xs text-slate-200">
      <div className="bg-[#060a18] border border-slate-700 max-w-4xl w-full h-[85vh] rounded shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#090e24] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-cyan-300 font-bold text-sm">
            <BookOpen size={18} className="text-cyan-400" />
            <span>PROJECT VOID // LORE ARCHIVE & WIKI</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wiki Content Body */}
        <div className="flex-1 overflow-hidden">
          <WikiApp act={act} />
        </div>
      </div>
    </div>
  );
};
