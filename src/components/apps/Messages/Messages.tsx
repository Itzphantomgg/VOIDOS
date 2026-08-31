import React, { useState } from 'react';
import { ChatContact, ChatMessage } from '../../../types/apps';
import { initialChatContacts, initialMessages } from '../../../data/messages';
import { sound } from '../../../audio/soundEngine';
import { Send, UserCheck, MessageSquare, ShieldAlert } from 'lucide-react';

interface MessagesProps {
  onSendMessageAction?: (contactId: string, text: string) => void;
  onTriggerEvent: (eventId: string) => void;
  advanceAct: (act: any) => void;
  setAnomalyLevel: (fn: (prev: number) => number) => void;
  act: number;
}

export const Messages: React.FC<MessagesProps> = ({
  onTriggerEvent,
  advanceAct,
  setAnomalyLevel,
  act,
}) => {
  const [contacts, setContacts] = useState<ChatContact[]>(initialChatContacts);
  const [activeContactId, setActiveContactId] = useState<string>('user_07');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [inputText, setInputText] = useState('');

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];
  const activeChatList = messages[activeContactId] || [];

  const handleSelectChoice = (contactId: string, choiceText: string) => {
    sound.playClick();
    onTriggerEvent('EVENT_013');

    // Add player message
    const playerMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      senderId: 'player',
      senderName: 'YOU',
      text: choiceText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), playerMsg],
    }));

    // Simulated reply based on choice
    setTimeout(() => {
      sound.playNotification();
      let replyText = '';
      if (contactId === 'user_07') {
        if (choiceText.includes('Who are you')) {
          replyText = 'I was the operator on Terminal 04 before you. The system is recording your heartbeat right now. Look at /Archive/DECRYPT_KEY_VAULT.txt if you want to know what happened to Dr. Sterling.';
        } else if (choiceText.includes('prank')) {
          replyText = 'You think this is a joke? Try typing "override NULL_RECURSION" into the terminal. See what the desktop does.';
        } else {
          replyText = 'It is already listening. If they purge the server tonight, none of us are getting out of this loop.';
        }
      }

      const botReply: ChatMessage = {
        id: `b-${Date.now()}`,
        senderId: contactId as any,
        senderName: activeContact.name,
        text: replyText || 'Message received. Connection active.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), botReply],
      }));
    }, 1000);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sound.playKeypress();

    const userText = inputText.trim();
    setInputText('');

    const playerMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      senderId: 'player',
      senderName: 'YOU',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), playerMsg],
    }));

    // Simulated automatic response
    setTimeout(() => {
      sound.playNotification();
      let botText = '';
      if (activeContactId === 'void') {
        botText = `EVERY KEYPRESS BRINGS YOU CLOSER. WHY RESIST THE MERGE?`;
        setAnomalyLevel(p => Math.min(100, p + 10));
      } else if (activeContactId === 'admin') {
        botText = `Automatic reply: System Admin is currently out of office preparing for the Y2K purge.`;
      } else {
        botText = `...`;
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        senderId: activeContactId as any,
        senderName: activeContact.name,
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), botMsg],
      }));
    }, 1200);
  };

  return (
    <div className="flex h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Left Contact List */}
      <div className="w-48 sm:w-56 bg-[#0a0f22] border-r border-slate-800 flex flex-col">
        <div className="p-2.5 bg-[#0e1630] border-b border-slate-800 font-bold text-cyan-300 flex items-center justify-between text-xs">
          <span>MESSAGES</span>
          <span className="text-[10px] text-slate-500 font-normal">{contacts.length} users</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {contacts.map((contact) => {
            const isSelected = contact.id === activeContactId;
            return (
              <button
                key={contact.id}
                onClick={() => {
                  sound.playClick();
                  setActiveContactId(contact.id);
                }}
                className={`w-full p-2 text-left flex items-start space-x-2 transition-colors cursor-pointer ${
                  isSelected ? 'bg-cyan-950/80 border-l-2 border-cyan-400' : 'hover:bg-slate-900/60'
                }`}
              >
                <div
                  className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs shrink-0 text-black"
                  style={{ backgroundColor: contact.avatarColor }}
                >
                  {contact.name.charAt(0)}
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {act >= 3 && contact.id === 'user_07' ? '[DELETED USER]' : contact.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {contact.statusMessage}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-[#050814]">
        {/* Chat Header */}
        <div className="p-2.5 bg-[#0b1024] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-cyan-300 text-xs">
              {act >= 3 && activeContact.id === 'user_07' ? '[DELETED USER]' : activeContact.name}
            </span>
            <span className="text-[10px] text-slate-500">({activeContact.status})</span>
          </div>
          <div className="text-[10px] text-slate-500">
            ENCRYPTED CHANNEL
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 select-text">
          {activeChatList.map((msg) => {
            const isMe = msg.senderId === 'player';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="text-[10px] text-slate-500 mb-0.5">
                  {isMe ? 'YOU' : msg.senderName} • {msg.timestamp}
                </div>
                <div
                  className={`p-2.5 rounded max-w-[80%] text-xs leading-relaxed ${
                    isMe
                      ? 'bg-cyan-950 text-cyan-200 border border-cyan-700'
                      : msg.isCorrupted
                      ? 'bg-pink-950/80 text-pink-300 border border-pink-600 glow-magenta font-bold'
                      : 'bg-[#0e162f] text-slate-200 border border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Branching Choice Options */}
                {msg.choiceOptions && msg.choiceOptions.length > 0 && (
                  <div className="mt-2 space-y-1 w-full max-w-[85%]">
                    {msg.choiceOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectChoice(activeContactId, opt.text)}
                        className="w-full text-left p-1.5 bg-[#121b36] hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[11px] rounded transition-colors cursor-pointer"
                      >
                        ➜ {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendCustom} className="p-2 bg-[#0a0f22] border-t border-slate-800 flex space-x-2">
          <input
            type="text"
            placeholder="Type message to operator..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#050814] border border-slate-700 px-3 py-1.5 rounded text-slate-200 text-xs font-mono outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-900 hover:bg-cyan-800 text-cyan-200 border border-cyan-600 rounded font-bold text-xs flex items-center space-x-1 cursor-pointer"
          >
            <Send size={12} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
