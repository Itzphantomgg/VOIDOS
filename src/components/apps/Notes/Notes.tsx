import React, { useState, useEffect } from 'react';
import { NoteItem } from '../../../types/apps';
import { sound } from '../../../audio/soundEngine';
import { Plus, Trash2, FileText, AlertCircle } from 'lucide-react';

interface NotesProps {
  act: number;
}

export const Notes: React.FC<NotesProps> = ({ act }) => {
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note-1',
      title: 'Terminal Commands To Try',
      content: `- 'whoami' to check access privileges
- 'scan' for checking ports
- 'decrypt <key>'
- 'manifest'
- 'override <key>'`,
      createdAt: '1999-11-04 09:00',
      updatedAt: '1999-11-04 09:00',
    },
    {
      id: 'note-2',
      title: 'Cipher Key Clues',
      content: `Valerie mentioned 'NULL_RECURSION' in her private notebook.
Does this unlock the hidden /VOID directory?`,
      createdAt: '1999-11-04 10:15',
      updatedAt: '1999-11-04 10:15',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>('note-1');

  // Inject phantom note on high act
  useEffect(() => {
    if (act >= 3) {
      setNotes(prev => {
        if (prev.some(n => n.id === 'phantom-note')) return prev;
        return [
          {
            id: 'phantom-note',
            title: 'REMEMBER',
            content: `You did not write this note.

You have played this sequence 14 times before.
Every time you reach the core, you think you are discovering it for the first time.

Dr. Valerie Sterling is waiting for you in /VOID.`,
            createdAt: '2026-08-31 00:00',
            updatedAt: '2026-08-31 00:00',
            isSystemInjected: true,
          },
          ...prev,
        ];
      });
    }
  }, [act]);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const handleAddNote = () => {
    sound.playClick();
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toLocaleTimeString(),
      updatedAt: new Date().toLocaleTimeString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    sound.playClick();
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (updated.length > 0) {
      setActiveNoteId(updated[0].id);
    }
  };

  const handleUpdateContent = (text: string) => {
    setNotes(prev =>
      prev.map(n => {
        if (n.id === activeNoteId) {
          const lines = text.split('\n');
          const title = lines[0] ? lines[0].slice(0, 24) : 'Untitled Note';
          return { ...n, title, content: text, updatedAt: new Date().toLocaleTimeString() };
        }
        return n;
      })
    );
  };

  return (
    <div className="flex h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Sidebar List */}
      <div className="w-44 sm:w-56 bg-[#0a0f22] border-r border-slate-800 flex flex-col">
        <div className="p-2 bg-[#0e1630] border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-cyan-300">NOTES ({notes.length})</span>
          <button
            onClick={handleAddNote}
            className="p-1 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer"
            title="New Note"
          >
            <Plus size={13} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {notes.map(note => {
            const isSelected = note.id === activeNoteId;
            return (
              <div
                key={note.id}
                onClick={() => {
                  sound.playClick();
                  setActiveNoteId(note.id);
                }}
                className={`p-2 cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-300' : 'hover:bg-slate-900/60 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 truncate">
                  {note.isSystemInjected ? (
                    <AlertCircle size={13} className="text-pink-500 shrink-0 animate-pulse" />
                  ) : (
                    <FileText size={13} className="text-slate-500 shrink-0" />
                  )}
                  <span className={`truncate text-xs ${note.isSystemInjected ? 'text-pink-400 font-bold glow-magenta' : ''}`}>
                    {note.title}
                  </span>
                </div>
                {!note.isSystemInjected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="text-slate-600 hover:text-red-400 p-0.5"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-[#050814] p-3 select-text">
        {activeNote ? (
          <div className="flex-1 flex flex-col space-y-2">
            <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1">
              <span>{activeNote.isSystemInjected ? 'SYSTEM GENERATED NOTE' : 'OPERATOR SCRATCHPAD'}</span>
              <span>Updated: {activeNote.updatedAt}</span>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              readOnly={activeNote.isSystemInjected}
              className={`flex-1 bg-transparent border-none outline-none resize-none font-mono text-xs leading-relaxed ${
                activeNote.isSystemInjected ? 'text-pink-300 glow-magenta font-bold' : 'text-slate-200'
              }`}
              placeholder="Write personal investigation notes..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            No note selected. Click + to create one.
          </div>
        )}
      </div>
    </div>
  );
};
