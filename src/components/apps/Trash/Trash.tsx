import React, { useState, useEffect } from 'react';
import { VFSNode } from '../../../types/fs';
import { sound } from '../../../audio/soundEngine';
import { Trash2, RotateCcw, AlertTriangle, FileText, Lock } from 'lucide-react';

interface TrashProps {
  vfs: Record<string, VFSNode>;
  onRestoreFile: (path: string) => void;
  onPermanentDelete: (path: string) => void;
  onEmptyTrash: () => void;
  onOpenFile: (node: VFSNode) => void;
  act: number;
}

export const Trash: React.FC<TrashProps> = ({
  vfs,
  onRestoreFile,
  onPermanentDelete,
  onEmptyTrash,
  onOpenFile,
  act,
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Files in Trash
  const trashItems = Object.values(vfs).filter(node => node.parentPath === '/Trash');

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Action Bar */}
      <div className="bg-[#0a0f22] p-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playClick();
              if (selectedPath) {
                onRestoreFile(selectedPath);
                setSelectedPath(null);
              }
            }}
            disabled={!selectedPath}
            className="flex items-center space-x-1 px-2 py-1 bg-[#141d3b] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 rounded cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Restore</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (confirm('Permanently purge all files from Trash?')) {
                onEmptyTrash();
                setSelectedPath(null);
              }
            }}
            disabled={trashItems.length === 0}
            className="flex items-center space-x-1 px-2 py-1 bg-red-950/70 hover:bg-red-900 disabled:opacity-40 text-red-300 border border-red-800 rounded cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Empty Trash</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-500">
          {trashItems.length} deleted file(s)
        </div>
      </div>

      {/* Trash File List */}
      <div className="flex-1 overflow-y-auto p-2 bg-[#040612]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500">
              <th className="py-1 px-2 font-bold">ORIGINAL NAME</th>
              <th className="py-1 px-2 font-bold w-20">TYPE</th>
              <th className="py-1 px-2 font-bold w-24">SIZE</th>
              <th className="py-1 px-2 font-bold">DELETED AT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-[11px]">
            {trashItems.map((node) => {
              const isSelected = selectedPath === node.path;
              return (
                <tr
                  key={node.path}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPath(node.path);
                  }}
                  onDoubleClick={() => {
                    sound.playClick();
                    onOpenFile(node);
                  }}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/80 text-cyan-300 font-bold border-l-2 border-cyan-400'
                      : node.isCorrupted
                      ? 'bg-pink-950/20 text-pink-400 font-bold'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <td className="py-1.5 px-2 flex items-center space-x-2 truncate">
                    <FileText size={14} className={node.isCorrupted ? 'text-pink-500' : 'text-slate-500'} />
                    <span className="truncate">{node.name}</span>
                  </td>
                  <td className="py-1.5 px-2 uppercase text-slate-500">{node.type}</td>
                  <td className="py-1.5 px-2 text-slate-400">{node.size} B</td>
                  <td className="py-1.5 px-2 text-slate-500">{node.modifiedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {trashItems.length === 0 && (
          <div className="py-16 text-center text-slate-600 space-y-1">
            <Trash2 size={24} className="mx-auto opacity-30 mb-2" />
            <div>Recycle Bin is empty.</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#050814] px-3 py-1 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>Files in trash can be restored or inspected.</span>
        <span>TRASH SECTOR: MOUNTED</span>
      </div>
    </div>
  );
};
