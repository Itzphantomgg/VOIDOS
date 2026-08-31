import React, { useState } from 'react';
import { VFSNode } from '../../../types/fs';
import { sound } from '../../../audio/soundEngine';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Folder,
  FileText,
  Image as ImageIcon,
  Music,
  Lock,
  Search,
  Plus,
  Trash2,
  Copy,
  FolderPlus,
  Info,
  Binary,
  FileCode
} from 'lucide-react';

interface FileExplorerProps {
  vfs: Record<string, VFSNode>;
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenFile: (node: VFSNode) => void;
  onCreateFile: (parentPath: string, name: string, content?: string) => void;
  onCreateFolder: (parentPath: string, name: string) => void;
  onDeleteFile: (path: string) => void;
  onUnlockVoid: (password: string) => boolean;
  act: number;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  vfs,
  currentPath,
  onNavigate,
  onOpenFile,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
  onUnlockVoid,
  act,
}) => {
  const [history, setHistory] = useState<string[]>([currentPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedNodePath, setSelectedNodePath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHidden, setShowHidden] = useState(true);
  const [propertiesNode, setPropertiesNode] = useState<VFSNode | null>(null);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const navigateTo = (path: string) => {
    if (path === '/VOID' && vfs['/VOID']?.isLocked) {
      setUnlockModalOpen(true);
      return;
    }
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedNodePath(null);
    onNavigate(path);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const target = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSelectedNodePath(null);
      onNavigate(target);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const target = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSelectedNodePath(null);
      onNavigate(target);
    }
  };

  const handleUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const upPath = '/' + parts.join('/');
    navigateTo(upPath || '/');
  };

  // Get children nodes of current directory
  let items = Object.values(vfs).filter((node) => {
    if (node.parentPath !== currentPath) return false;
    if (node.isHidden && !showHidden) return false;
    if (searchQuery) {
      return node.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getFileIcon = (node: VFSNode) => {
    if (node.isLocked) return <Lock size={16} className="text-pink-400" />;
    if (node.type === 'folder') return <Folder size={16} className="text-cyan-400" />;
    if (node.type === 'image') return <ImageIcon size={16} className="text-pink-400" />;
    if (node.type === 'audio') return <Music size={16} className="text-purple-400" />;
    if (node.type === 'hex') return <Binary size={16} className="text-amber-400" />;
    if (node.type === 'log') return <FileCode size={16} className="text-green-400" />;
    return <FileText size={16} className="text-slate-300" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Top Toolbar */}
      <div className="bg-[#0c1226] p-1.5 border-b border-slate-800 flex items-center justify-between space-x-2">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              sound.playClick();
              handleBack();
            }}
            disabled={historyIndex === 0}
            className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              handleForward();
            }}
            disabled={historyIndex >= history.length - 1}
            className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 cursor-pointer"
            title="Forward"
          >
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              handleUp();
            }}
            disabled={currentPath === '/'}
            className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 cursor-pointer"
            title="Up one folder"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex items-center bg-[#050814] border border-slate-700 px-2 py-0.5 rounded text-cyan-300 text-xs truncate">
          <span className="text-slate-500 mr-1">PATH:</span>
          <span className="truncate">{currentPath}</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#050814] border border-slate-700 px-2 py-0.5 rounded w-36 sm:w-48">
          <Search size={12} className="text-slate-500 mr-1" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-mono placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-[#0a0f22] px-2 py-1 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playClick();
              const name = prompt('Enter new text file name:', 'note.txt');
              if (name) onCreateFile(currentPath, name, 'Empty note');
            }}
            className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer"
          >
            <Plus size={12} />
            <span>New File</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              const name = prompt('Enter new folder name:', 'New_Folder');
              if (name) onCreateFolder(currentPath, name);
            }}
            className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer"
          >
            <FolderPlus size={12} />
            <span>New Folder</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {selectedNodePath && (
            <>
              <button
                onClick={() => {
                  sound.playClick();
                  setPropertiesNode(vfs[selectedNodePath]);
                }}
                className="flex items-center space-x-1 text-slate-300 hover:text-cyan-300"
              >
                <Info size={12} />
                <span>Properties</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  if (confirm(`Delete '${vfs[selectedNodePath]?.name}'?`)) {
                    onDeleteFile(selectedNodePath);
                    setSelectedNodePath(null);
                  }
                }}
                className="flex items-center space-x-1 text-pink-400 hover:text-pink-300"
              >
                <Trash2 size={12} />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main File Table View */}
      <div className="flex-1 overflow-y-auto p-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500">
              <th className="pb-1.5 pl-2 font-bold">NAME</th>
              <th className="pb-1.5 font-bold w-20">TYPE</th>
              <th className="pb-1.5 font-bold w-24">SIZE</th>
              <th className="pb-1.5 font-bold w-36 hidden sm:table-cell">MODIFIED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-[11px]">
            {items.map((node) => {
              const isSelected = selectedNodePath === node.path;
              return (
                <tr
                  key={node.path}
                  onClick={() => {
                    sound.playClick();
                    setSelectedNodePath(node.path);
                  }}
                  onDoubleClick={() => {
                    sound.playClick();
                    if (node.type === 'folder') {
                      navigateTo(node.path);
                    } else {
                      onOpenFile(node);
                    }
                  }}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/80 text-cyan-300 font-bold border-l-2 border-cyan-400'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <td className="py-1.5 pl-2 flex items-center space-x-2 truncate">
                    {getFileIcon(node)}
                    <span className="truncate">{node.name}</span>
                    {node.isLocked && (
                      <span className="text-[9px] px-1 bg-pink-950 border border-pink-700 text-pink-400 rounded">
                        LOCKED
                      </span>
                    )}
                  </td>
                  <td className="py-1.5 uppercase text-slate-500">{node.type}</td>
                  <td className="py-1.5 text-slate-400">
                    {node.type === 'folder' ? '--' : `${node.size} B`}
                  </td>
                  <td className="py-1.5 text-slate-500 hidden sm:table-cell">
                    {node.modifiedAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="py-12 text-center text-slate-600">This directory is empty.</div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#050814] px-3 py-1 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>{items.length} item(s)</span>
        <span>
          {selectedNodePath ? `Selected: ${vfs[selectedNodePath]?.name}` : 'Free: 498.2 GB'}
        </span>
      </div>

      {/* Unlock / Decrypt Modal for /VOID */}
      {unlockModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9990] p-4">
          <div className="bg-[#0d1226] border-2 border-pink-500 p-4 max-w-sm w-full rounded shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
              <Lock size={18} />
              <span>SECTOR /VOID LOCKED</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              This partition is protected by Level-4 neural recursion encryption. Enter the master override key to decrypt:
            </p>
            <input
              type="text"
              placeholder="Enter cipher key..."
              value={unlockPassword}
              onChange={(e) => {
                setUnlockPassword(e.target.value);
                setUnlockError('');
              }}
              className="w-full bg-black border border-pink-600 px-2 py-1 text-pink-300 outline-none uppercase font-bold"
              autoFocus
            />
            {unlockError && <div className="text-red-400 text-[10px]">{unlockError}</div>}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setUnlockModalOpen(false);
                  setUnlockPassword('');
                  setUnlockError('');
                }}
                className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  const ok = onUnlockVoid(unlockPassword);
                  if (ok) {
                    setUnlockModalOpen(false);
                    navigateTo('/VOID');
                  } else {
                    setUnlockError('INVALID CIPHER KEY. ACCESS DENIED.');
                  }
                }}
                className="px-3 py-1 bg-pink-900 hover:bg-pink-800 text-white font-bold rounded border border-pink-500"
              >
                Decrypt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Properties Dialog Modal */}
      {propertiesNode && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9990] p-4">
          <div className="bg-[#0c1226] border border-cyan-500 p-4 max-w-sm w-full rounded shadow-2xl space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-cyan-300 font-bold">
              <span>FILE PROPERTIES</span>
              <button onClick={() => setPropertiesNode(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-1.5 text-slate-300 text-[11px]">
              <div><strong>Name:</strong> {propertiesNode.name}</div>
              <div><strong>Path:</strong> {propertiesNode.path}</div>
              <div><strong>Type:</strong> {propertiesNode.type}</div>
              <div><strong>Size:</strong> {propertiesNode.size} bytes</div>
              <div><strong>Created:</strong> {propertiesNode.createdAt}</div>
              <div><strong>Modified:</strong> {propertiesNode.modifiedAt}</div>
              {propertiesNode.isLocked && (
                <div className="text-pink-400 font-bold">Encrypted with NULL_RECURSION cipher</div>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setPropertiesNode(null)}
                className="px-4 py-1 bg-cyan-900 hover:bg-cyan-800 text-cyan-200 rounded border border-cyan-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
