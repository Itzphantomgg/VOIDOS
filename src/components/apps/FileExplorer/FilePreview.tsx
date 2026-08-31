import React from 'react';
import { VFSNode } from '../../../types/fs';
import { FileText, Binary, FileCode, Image as ImageIcon, Music } from 'lucide-react';

interface FilePreviewProps {
  node: VFSNode;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ node, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none">
      {/* File Info Bar */}
      <div className="bg-[#0b1024] p-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-cyan-300 font-bold truncate">{node.name}</span>
          <span>({node.size} bytes)</span>
        </div>
        <span className="uppercase text-slate-500">{node.type}</span>
      </div>

      {/* Content Rendering */}
      <div className="flex-1 overflow-y-auto p-4 select-text">
        {node.type === 'image' && node.imageUrl ? (
          <div className="flex items-center justify-center p-4 bg-black/60 rounded border border-slate-800">
            <div dangerouslySetInnerHTML={{ __html: node.imageUrl }} className="max-w-md w-full" />
          </div>
        ) : node.type === 'hex' ? (
          <pre className="text-amber-300 bg-black/80 p-3 rounded border border-amber-900/50 font-mono text-xs overflow-x-auto whitespace-pre">
            {node.content}
          </pre>
        ) : node.type === 'log' ? (
          <pre className="text-green-300 bg-black/80 p-3 rounded border border-green-900/50 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
            {node.content}
          </pre>
        ) : (
          <div className="text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {node.content || '[File is empty or binary]'}
          </div>
        )}
      </div>
    </div>
  );
};
