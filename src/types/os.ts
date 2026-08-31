export type AppId = 
  | 'files'
  | 'terminal'
  | 'browser'
  | 'messages'
  | 'mail'
  | 'taskmanager'
  | 'systeminfo'
  | 'systemlogs'
  | 'notes'
  | 'mediaplayer'
  | 'settings'
  | 'trash'
  | 'imageviewer'
  | 'textviewer'
  | 'hexviewer'
  | 'audioPlayer'
  | 'realitycore';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface OSWindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  minSize?: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  customData?: any; // e.g. path for file explorer, note id, etc.
}

export type ThemeName = 'void-cyan' | 'neon-magenta' | 'amber-crt' | 'matrix-green' | 'y2k-purple';

export interface OSSettings {
  theme: ThemeName;
  wallpaper: string;
  crtScanlines: boolean;
  crtCurvature: boolean;
  crtBloom: boolean;
  glitchIntensity: number; // 0 (off), 1 (subtle), 2 (medium), 3 (corrupted)
  masterVolume: number; // 0 to 1
  soundEffects: boolean;
  ambientHum: boolean;
  clockFormat24: boolean;
  realityMode: boolean; // secret mode
  customCursor: boolean;
}

export interface NotificationItem {
  id: string;
  appId: AppId | 'system' | 'unknown';
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  actionPayload?: {
    appId: AppId;
    data?: any;
  };
  severity?: 'normal' | 'warning' | 'anomaly' | 'critical';
}

export interface DesktopIconItem {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  x: number;
  y: number;
  hidden?: boolean;
  corrupted?: boolean;
}
