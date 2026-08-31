export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'glitch' | 'ascii';
  text: string;
  timestamp: string;
}

export interface ProcessItem {
  pid: number;
  name: string;
  cpu: number; // percentage
  memory: number; // in KB/MB
  user: string;
  status: 'RUNNING' | 'SLEEPING' | 'ZOMBIE' | 'LOCKED' | 'ANOMALOUS' | 'IMMORTAL';
  description: string;
  isHostile?: boolean;
  canTerminate: boolean;
  resistanceCount?: number;
}

export interface EmailItem {
  id: string;
  folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'archive' | 'trash';
  sender: string;
  senderName: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentPath?: string;
  isCorrupted?: boolean;
  unlockAct?: number;
}

export interface ChatMessage {
  id: string;
  senderId: 'player' | 'user_07' | 'admin' | 'void' | 'system' | 'dr_sterling';
  senderName: string;
  text: string;
  timestamp: string;
  isCorrupted?: boolean;
  choiceOptions?: {
    id: string;
    text: string;
    actionTag?: string;
  }[];
}

export interface ChatContact {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away' | 'busy' | 'deleted' | 'corrupted';
  statusMessage: string;
  avatarColor: string;
  unreadCount: number;
  lastMessageTime: string;
  dialogueState: number;
}

export interface WebSitePage {
  url: string;
  title: string;
  contentTitle: string;
  lastUpdated: string;
  category: string;
  htmlContent: string; // rich markdown/html simulated
  isSecret?: boolean;
  isCorrupted?: boolean;
  unlockRequirement?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isSystemInjected?: boolean;
  isLocked?: boolean;
}

export interface MediaTrack {
  id: string;
  title: string;
  artist: string;
  duration: string; // mm:ss
  type: 'synth-track' | 'audio-log' | 'drone' | 'corrupted-recording';
  synthPreset: string; // for web audio player
  notes?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'ANOMALY' | 'VOID';
  source: string;
  message: string;
  details?: string;
}
