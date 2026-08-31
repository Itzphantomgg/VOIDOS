import React from 'react';
import { AppId } from '../../types/os';
import { 
  Folder, 
  Terminal as TerminalIcon, 
  Globe, 
  MessageSquare, 
  Mail, 
  Activity, 
  FileText, 
  Music, 
  Settings as SettingsIcon, 
  Trash2, 
  Cpu, 
  ShieldAlert, 
  Eye, 
  Lock,
  Binary
} from 'lucide-react';

interface AppIconProps {
  appId: AppId | string;
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ appId, className = '', size = 28 }) => {
  switch (appId) {
    case 'files':
      return <Folder className={`text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] ${className}`} size={size} />;
    case 'terminal':
      return <TerminalIcon className={`text-green-400 drop-shadow-[0_0_8px_rgba(0,255,102,0.4)] ${className}`} size={size} />;
    case 'browser':
      return <Globe className={`text-blue-400 drop-shadow-[0_0_8px_rgba(0,128,255,0.4)] ${className}`} size={size} />;
    case 'messages':
      return <MessageSquare className={`text-pink-400 drop-shadow-[0_0_8px_rgba(255,0,127,0.4)] ${className}`} size={size} />;
    case 'mail':
      return <Mail className={`text-yellow-400 drop-shadow-[0_0_8px_rgba(255,200,0,0.4)] ${className}`} size={size} />;
    case 'taskmanager':
      return <Activity className={`text-red-400 drop-shadow-[0_0_8px_rgba(255,51,102,0.4)] ${className}`} size={size} />;
    case 'notes':
      return <FileText className={`text-purple-300 drop-shadow-[0_0_8px_rgba(178,75,243,0.4)] ${className}`} size={size} />;
    case 'mediaplayer':
      return <Music className={`text-purple-400 drop-shadow-[0_0_8px_rgba(178,75,243,0.4)] ${className}`} size={size} />;
    case 'settings':
      return <SettingsIcon className={`text-slate-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${className}`} size={size} />;
    case 'trash':
      return <Trash2 className={`text-slate-400 drop-shadow-[0_0_6px_rgba(200,200,200,0.3)] ${className}`} size={size} />;
    case 'systeminfo':
      return <Cpu className={`text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] ${className}`} size={size} />;
    case 'systemlogs':
      return <ShieldAlert className={`text-amber-400 drop-shadow-[0_0_8px_rgba(255,170,0,0.4)] ${className}`} size={size} />;
    case 'realitycore':
      return <Eye className={`text-pink-500 animate-pulse drop-shadow-[0_0_12px_rgba(255,0,127,0.8)] ${className}`} size={size} />;
    case 'locked':
      return <Lock className={`text-pink-500 ${className}`} size={size} />;
    default:
      return <Binary className={`text-cyan-400 ${className}`} size={size} />;
  }
};
