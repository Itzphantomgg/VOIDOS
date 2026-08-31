import React, { useState, useEffect } from 'react';
import { NoteItem } from '../../../types/apps';
import { sound } from '../../../audio/soundEngine';
import { Plus, Trash2, FileText, AlertCircle } from 'lucide-react';

interface NotesProps {
  act: number;
  initialNotes?: NoteItem[];
  onSaveNotes?: (notes: NoteItem[]) => void;
  initialActiveNoteId?: string;
}

const defaultNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Terminal Commands',
    content: `- 'whoami' to check access privileges
- 'scan' for checking hardware and memory buffers
- 'decrypt <key>'
- 'override <key>'`,
    createdAt: '2004-08-14 08:30',
    updatedAt: '2004-08-14 08:30',
  },
  {
    id: 'note-2',
    title: 'Cipher Key Clues',
    content: `Recurring timestamp: 03:14:29 AM
Master cipher phrase: NULL_RECURSION
Target partition: /VOID`,
    createdAt: '2004-08-14 08:35',
    updatedAt: '2004-08-14 08:35',
  },
];

export const Notes: React.FC<NotesProps> = ({
  act,
  initialNotes,
  onSaveNotes,
  initialActiveNoteId,
}) => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    if (initialNotes && initialNotes.length > 0) return initialNotes;
    return defaultNotes;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(() => {
    if (initialActiveNoteId && notes.some(n => n.id === initialActiveNoteId)) {
      return initialActiveNoteId;
    }
    return notes[0]?.id || 'note-1';
  });

  // Inject phantom note on high act
  useEffect(() => {
    if (act >= 3) {
      setNotes(prev => {
        if (prev.some(n => n.id === 'phantom-note')) return prev;
        const updated = [
          {
            id: 'phantom-note',
            title: 'REMEMBER',
            content: `You did not write this note.

You have played this sequence before.
Every time you reach the core, you think you are discovering it for the first time.

Dr. Valerie Sterling is waiting for you in /VOID.`,
            createdAt: '2004-08-14 03:14',
            updatedAt: '2026-08-31 00:00',
            isSystemInjected: true,
          },
          ...prev,
        ];
        if (onSaveNotes) onSaveNotes(updated);
        return updated;
      });
    }
  }, [act, onSaveNotes]);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const handleAddNote = () => {
    try {
      sound.playClick();
    } catch {}
    const noteCount = notes.filter(n => !n.isSystemInjected).length + 1;
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: `NOTE_${String(noteCount).padStart(2, '0')}.txt`,
      content: '',
      createdAt: new Date().toLocaleTimeString(),
      updatedAt: new Date().toLocaleTimeString(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setActiveNoteId(newNote.id);
    if (onSaveNotes) onSaveNotes(updated);
  };

  const handleDeleteNote = (id: string) => {
    try {
      sound.playClick();
    } catch {}
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (updated.length > 0) {
      setActiveNoteId(updated[0].id);
    }
    if (onSaveNotes) onSaveNotes(updated);
  };

  const handleUpdateContent = (text: string) => {
    const updated = notes.map(n => {
      if (n.id === activeNoteId) {
        const lines = text.split('\n');
        const firstLine = lines[0]?.trim();
        const title = firstLine ? firstLine.slice(0, 24) : n.title || 'Untitled Note';
        return { ...n, title, content: text, updatedAt: new Date().toLocaleTimeString() };
      }
      return n;
    });
    setNotes(updated);
    if (onSaveNotes) onSaveNotes(updated);
  };

  return (
    <div className="flex h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Sidebar List */}
      <div className="w-48 sm:w-56 bg-[#0a0f22] border-r border-slate-800 flex flex-col">
        <div className="p-2.5 bg-[#0e1630] border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-cyan-300 tracking-wider">
            OPERATOR NOTES ({notes.length})
          </span>
          <button
            onClick={handleAddNote}
            className="p-1 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer transition-colors"
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
                  try {
                    sound.playClick();
                  } catch {}
                  setActiveNoteId(note.id);
                }}
                className={`p-2.5 cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-300'
                    : 'hover:bg-slate-900/60 text-slate-300'
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
                    title="Delete Note"
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
              <span className="font-bold text-slate-400">
                {activeNote.isSystemInjected ? '[SYSTEM INJECTED ENTRY]' : '[OPERATOR PERSONAL SCRATCHPAD]'}
              </span>
              <span>Updated: {activeNote.updatedAt}</span>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              readOnly={activeNote.isSystemInjected}
              className={`flex-1 bg-transparent border-none outline-none resize-none font-mono text-xs leading-relaxed ${
                activeNote.isSystemInjected ? 'text-pink-300 glow-magenta font-bold' : 'text-slate-200'
              }`}
              placeholder="Write personal notes, passwords, clues, coordinates, and investigation theories..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            No note selected. Click + to create a new personal note.
          </div>
        )}
      </div>
    </div>
  );
};
