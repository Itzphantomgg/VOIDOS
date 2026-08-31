import React, { useState } from 'react';
import { EmailItem } from '../../../types/apps';
import { initialEmails } from '../../../data/emails';
import { sound } from '../../../audio/soundEngine';
import { Inbox, Send, FileText, AlertOctagon, Archive, Trash2, Mail as MailIcon, Paperclip } from 'lucide-react';

interface MailProps {
  onOpenAttachment?: (path: string) => void;
  onTriggerEvent: (eventId: string) => void;
  act: number;
}

export const Mail: React.FC<MailProps> = ({ onOpenAttachment, onTriggerEvent, act }) => {
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'drafts' | 'spam' | 'archive' | 'trash'>('inbox');
  const [selectedMailId, setSelectedMailId] = useState<string | null>('mail-01');

  const folderEmails = emails.filter(m => m.folder === currentFolder);
  const selectedEmail = emails.find(m => m.id === selectedMailId);

  const handleSelectMail = (mail: EmailItem) => {
    sound.playClick();
    setSelectedMailId(mail.id);
    if (!mail.isRead) {
      setEmails(prev => prev.map(m => m.id === mail.id ? { ...m, isRead: true } : m));
    }
  };

  const unreadInboxCount = emails.filter(m => m.folder === 'inbox' && !m.isRead).length;

  return (
    <div className="flex h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Folder sidebar */}
      <div className="w-36 sm:w-44 bg-[#0a0f22] border-r border-slate-800 flex flex-col p-2 space-y-1">
        <div className="font-bold text-cyan-300 px-2 py-1 mb-1 text-xs">MAILBOXES</div>
        
        <button
          onClick={() => {
            sound.playClick();
            setCurrentFolder('inbox');
          }}
          className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors ${
            currentFolder === 'inbox' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Inbox size={14} />
            <span>Inbox</span>
          </div>
          {unreadInboxCount > 0 && (
            <span className="bg-pink-600 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {unreadInboxCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentFolder('sent');
          }}
          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition-colors ${
            currentFolder === 'sent' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
          }`}
        >
          <Send size={14} />
          <span>Sent</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentFolder('archive');
          }}
          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition-colors ${
            currentFolder === 'archive' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
          }`}
        >
          <Archive size={14} />
          <span>Archive</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentFolder('spam');
          }}
          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition-colors ${
            currentFolder === 'spam' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
          }`}
        >
          <AlertOctagon size={14} />
          <span>Spam</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentFolder('trash');
          }}
          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition-colors ${
            currentFolder === 'trash' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:bg-slate-900 text-slate-300'
          }`}
        >
          <Trash2 size={14} />
          <span>Trash</span>
        </button>
      </div>

      {/* Middle mail list */}
      <div className="w-56 sm:w-72 bg-[#090d20] border-r border-slate-800 flex flex-col overflow-hidden">
        <div className="p-2 bg-[#0e1630] border-b border-slate-800 font-bold text-slate-300 text-[11px] flex justify-between">
          <span className="uppercase">{currentFolder} ({folderEmails.length})</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {folderEmails.map(mail => {
            const isSelected = mail.id === selectedMailId;
            return (
              <div
                key={mail.id}
                onClick={() => handleSelectMail(mail)}
                className={`p-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cyan-950/80 border-l-2 border-cyan-400'
                    : !mail.isRead
                    ? 'bg-[#101833] font-bold text-white'
                    : 'hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className={`truncate ${!mail.isRead ? 'text-cyan-300 font-bold' : 'text-slate-300'}`}>
                    {mail.senderName}
                  </span>
                  <span className="text-[9px] text-slate-500">{mail.timestamp.split(' ')[0]}</span>
                </div>
                <div className={`text-xs truncate ${mail.isCorrupted ? 'text-pink-400 glow-magenta font-bold' : 'text-slate-200'}`}>
                  {mail.subject}
                </div>
              </div>
            );
          })}
          {folderEmails.length === 0 && (
            <div className="py-8 text-center text-slate-600 text-[11px]">Folder is empty.</div>
          )}
        </div>
      </div>

      {/* Right mail preview body */}
      <div className="flex-1 flex flex-col bg-[#050814] overflow-y-auto p-4 select-text">
        {selectedEmail ? (
          <div className="space-y-4 max-w-3xl">
            {/* Header */}
            <div className="border-b border-slate-800 pb-3 space-y-1.5">
              <h1 className={`text-base font-bold ${selectedEmail.isCorrupted ? 'text-pink-400 glow-magenta' : 'text-cyan-300'}`}>
                {selectedEmail.subject}
              </h1>
              <div className="text-xs text-slate-400">
                <strong>From:</strong> {selectedEmail.senderName} &lt;{selectedEmail.sender}&gt;
              </div>
              <div className="text-xs text-slate-400">
                <strong>To:</strong> {selectedEmail.recipient}
              </div>
              <div className="text-[10px] text-slate-500">
                <strong>Date:</strong> {selectedEmail.timestamp}
              </div>
            </div>

            {/* Email Body */}
            <div className="text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-mono">
              {selectedEmail.body}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            Select an email to view its contents.
          </div>
        )}
      </div>
    </div>
  );
};
