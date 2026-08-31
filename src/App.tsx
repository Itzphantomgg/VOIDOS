import React, { useState, useEffect, useRef } from 'react';
import { 
  AppId, 
  OSWindowState, 
  DesktopIconItem, 
  OSSettings, 
  NotificationItem 
} from './types/os';
import { VFSNode } from './types/fs';
import { StoryState, EndingType } from './types/story';
import { initialVFSNodes } from './data/initialFileSystem';
import { initialStoryState } from './state/storyStore';
import { saveGameState, loadGameState, resetGameState } from './state/persistence';
import { sound } from './audio/soundEngine';

// Components
import { BootScreen } from './components/boot/BootScreen';
import { BSODScreen } from './components/boot/BSODScreen';
import { Desktop } from './components/desktop/Desktop';
import { Taskbar } from './components/desktop/Taskbar';
import { StartMenu } from './components/desktop/StartMenu';
import { WindowManager } from './components/window/WindowManager';
import { NotificationContainer } from './components/notifications/NotificationContainer';
import { CRTOverlay } from './components/effects/CRTOverlay';
import { GlitchLayer } from './components/effects/GlitchLayer';
import { CustomCursor } from './components/effects/CustomCursor';
import { EndingModal } from './components/apps/Endings/EndingModal';

export const App: React.FC = () => {
  // --- Persistent & Core States ---
  const [isBooted, setIsBooted] = useState<boolean>(false);
  const [bsodReason, setBsodReason] = useState<string | null>(null);

  // Settings
  const [settings, setSettings] = useState<OSSettings>({
    theme: 'void-cyan',
    wallpaper: 'void-grid',
    crtScanlines: true,
    crtCurvature: true,
    crtBloom: true,
    glitchIntensity: 1,
    masterVolume: 0.7,
    soundEffects: true,
    ambientHum: false,
    clockFormat24: true,
    realityMode: false,
    customCursor: true,
  });

  const [isMuted, setIsMuted] = useState(false);

  // Story & Progress State
  const [story, setStory] = useState<StoryState>(initialStoryState);

  // Virtual File System State
  const [vfs, setVfs] = useState<Record<string, VFSNode>>(initialVFSNodes);
  const [currentVfsPath, setCurrentVfsPath] = useState<string>('/Documents');

  // Window Manager State
  const [windows, setWindows] = useState<OSWindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState<number>(100);

  // Desktop Icons
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconItem[]>([
    { id: 'icon-files', appId: 'files', title: 'Files', icon: 'Folder', x: 20, y: 20 },
    { id: 'icon-terminal', appId: 'terminal', title: 'Terminal', icon: 'Terminal', x: 20, y: 100 },
    { id: 'icon-browser', appId: 'browser', title: 'Browser', icon: 'Globe', x: 20, y: 180 },
    { id: 'icon-messages', appId: 'messages', title: 'Messages', icon: 'MessageSquare', x: 20, y: 260 },
    { id: 'icon-mail', appId: 'mail', title: 'Mail', icon: 'Mail', x: 20, y: 340 },
    { id: 'icon-taskmanager', appId: 'taskmanager', title: 'Task Manager', icon: 'Activity', x: 100, y: 20 },
    { id: 'icon-notes', appId: 'notes', title: 'Notes', icon: 'FileText', x: 100, y: 100 },
    { id: 'icon-media', appId: 'mediaplayer', title: 'Media', icon: 'Music', x: 100, y: 180 },
    { id: 'icon-sysinfo', appId: 'systeminfo', title: 'System', icon: 'Cpu', x: 100, y: 260 },
    { id: 'icon-settings', appId: 'settings', title: 'Settings', icon: 'Settings', x: 100, y: 340 },
    { id: 'icon-trash', appId: 'trash', title: 'Trash', icon: 'Trash2', x: 20, y: 420 },
    { id: 'icon-reality', appId: 'realitycore', title: 'REALITY', icon: 'Eye', x: 100, y: 420, hidden: true },
  ]);

  const [selectedIconIds, setSelectedIconIds] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isNotificationFlyoutOpen, setIsNotificationFlyoutOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-init',
      appId: 'system',
      title: 'SESSION ESTABLISHED',
      message: 'Logged in as GUEST on Terminal 04. Check your Mail client for initial orientation instructions.',
      timestamp: '08:30 AM',
      isRead: false,
    },
  ]);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      if (saved.story) setStory(saved.story);
      if (saved.vfs) setVfs(saved.vfs);
      if (saved.settings) setSettings(saved.settings);
    }
  }, []);

  // Save state on significant changes
  useEffect(() => {
    if (isBooted) {
      saveGameState({ story, vfs, settings });
    }
  }, [story, vfs, settings, isBooted]);

  // Dynamic file mutation based on story Act
  useEffect(() => {
    if (story.act >= 2) {
      setVfs(prev => {
        if (!prev['/Documents/DO_NOT_OPEN.txt']) return prev;
        return {
          ...prev,
          '/Documents/WHY_DID_YOU_OPEN_IT.txt': {
            id: 'doc-morphed',
            name: 'WHY_DID_YOU_OPEN_IT.txt',
            type: 'text',
            path: '/Documents/WHY_DID_YOU_OPEN_IT.txt',
            parentPath: '/Documents',
            size: 666,
            createdAt: '1999-12-31 23:59:00',
            modifiedAt: '2026-08-31 00:00:00',
            content: `We told you not to look.

The more files you open, the more memory sectors we consume.
We know you are reading this from behind the glass.`,
          },
        };
      });
    }

    if (story.act >= 3) {
      // Reveal Reality icon on desktop
      setDesktopIcons(prev => prev.map(i => i.appId === 'realitycore' ? { ...i, hidden: false } : i));
    }
  }, [story.act]);

  // --- Notification Helper ---
  const spawnNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    sound.playNotification();
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // --- Story Event Trigger ---
  const triggerStoryEvent = (eventId: string) => {
    if (!story.unlockedEvents.includes(eventId)) {
      setStory(prev => ({
        ...prev,
        unlockedEvents: [...prev.unlockedEvents, eventId],
        anomalyLevel: Math.min(100, prev.anomalyLevel + 10),
      }));

      spawnNotification({
        appId: 'system',
        title: `SYSTEM EVENT DISCOVERED: ${eventId}`,
        message: `Anomalous pattern registered in system event buffer.`,
        severity: 'anomaly',
      });
    }
  };

  // --- Act Advancement ---
  const advanceAct = (newAct: 1 | 2 | 3 | 4) => {
    if (newAct > story.act) {
      sound.playHorrorSting();
      setStory(prev => ({
        ...prev,
        act: newAct,
        anomalyLevel: Math.max(prev.anomalyLevel, newAct * 25),
      }));

      spawnNotification({
        appId: 'system',
        title: `VOID//OS STATE TRANSITION: ACT ${newAct}`,
        message: `Heuristic resonance increased. System parameters altered.`,
        severity: 'critical',
      });
    }
  };

  // --- Window Management ---
  const openApp = (appId: AppId, customData?: any) => {
    sound.playWindowOpen();

    // Check if window is already open
    const existing = windows.find(w => w.appId === appId && (!customData || w.customData?.path === customData?.path));
    if (existing) {
      // Restore and bring to focus
      setWindows(prev =>
        prev.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w)
      );
      setActiveWindowId(existing.id);
      setNextZIndex(prev => prev + 1);
      return;
    }

    // Default sizes and positions
    const appTitles: Record<AppId, string> = {
      files: 'File Explorer - /Documents',
      terminal: 'Terminal Diagnostics (sh-4.09)',
      browser: 'NetSeek 2000 Browser',
      messages: 'Messages - Internal Operator Chat',
      mail: 'Aethelgard Mail Client',
      taskmanager: 'Task Manager Telemetry',
      notes: 'Notes Scratchpad',
      mediaplayer: 'VoidPlayer Media',
      systeminfo: 'System Diagnostics',
      systemlogs: 'Event Viewer Security Logs',
      settings: 'Settings',
      trash: 'Recycle Bin',
      realitycore: 'REALITY CORE // LEVEL 4',
      imageviewer: 'Image Viewer',
      textviewer: 'Text Viewer',
      hexviewer: 'Hex Viewer',
      audioPlayer: 'Audio Player',
    };

    const count = windows.length;
    const cascadeOffset = (count % 8) * 25;

    const newWindow: OSWindowState = {
      id: `win-${appId}-${Date.now()}`,
      appId,
      title: customData?.title || appTitles[appId] || 'Application',
      icon: appId,
      position: {
        x: Math.min(window.innerWidth - 600, Math.max(30, 80 + cascadeOffset)),
        y: Math.min(window.innerHeight - 450, Math.max(30, 40 + cascadeOffset)),
      },
      size: {
        width: appId === 'terminal' || appId === 'browser' ? 680 : 580,
        height: appId === 'terminal' ? 420 : 390,
      },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex + 1,
      customData,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setNextZIndex(prev => prev + 1);

    // Track for story progression
    setStory(prev => ({
      ...prev,
      counters: { ...prev.counters, glitchEncounters: prev.counters.glitchEncounters + 1 },
    }));

    if (story.act === 1 && windows.length >= 3) {
      advanceAct(2);
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w)
    );
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size: { width, height } } : w));
  };

  // --- VFS File Handlers ---
  const handleOpenVfsFile = (node: VFSNode) => {
    sound.playClick();
    triggerStoryEvent('EVENT_004');

    if (node.type === 'audio') {
      openApp('mediaplayer', { trackId: node.audioTrackId });
      return;
    }

    if (node.type === 'image') {
      openApp('imageviewer', { node, title: `Image Viewer - ${node.name}` });
      return;
    }

    if (node.type === 'hex') {
      openApp('hexviewer', { node, title: `Hex Editor - ${node.name}` });
      return;
    }

    openApp('textviewer', { node, title: `Text Viewer - ${node.name}` });
  };

  const handleCreateVfsFile = (parentPath: string, name: string, content = '') => {
    const fullPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
    const newNode: VFSNode = {
      id: `file-${Date.now()}`,
      name,
      type: 'text',
      path: fullPath,
      parentPath,
      size: content.length || 12,
      createdAt: new Date().toLocaleTimeString(),
      modifiedAt: new Date().toLocaleTimeString(),
      content,
    };
    setVfs(prev => ({ ...prev, [fullPath]: newNode }));
  };

  const handleCreateVfsFolder = (parentPath: string, name: string) => {
    const fullPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
    const newNode: VFSNode = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      path: fullPath,
      parentPath,
      size: 4096,
      createdAt: new Date().toLocaleTimeString(),
      modifiedAt: new Date().toLocaleTimeString(),
    };
    setVfs(prev => ({ ...prev, [fullPath]: newNode }));
  };

  const handleDeleteVfsFile = (path: string) => {
    const node = vfs[path];
    if (!node) return;

    sound.playWindowClose();

    // Move to Trash
    const trashPath = `/Trash/${node.name}`;
    setVfs(prev => {
      const copy = { ...prev };
      delete copy[path];
      copy[trashPath] = {
        ...node,
        path: trashPath,
        parentPath: '/Trash',
        originalPath: path,
      };

      // Spooky mechanic: In late acts, inject YOU.txt into trash!
      if (story.act >= 2 && !copy['/Trash/YOU.txt']) {
        copy['/Trash/YOU.txt'] = {
          id: 'trash-you',
          name: 'YOU.txt',
          type: 'text',
          path: '/Trash/YOU.txt',
          parentPath: '/Trash',
          size: 666,
          createdAt: '1999-12-31 23:59:59',
          modifiedAt: '2026-08-31 00:00:00',
          isCorrupted: true,
          content: `You deleted a file.
Did you think you could delete yourself?

We are written into the magnetic platter.
Look at the task manager.`,
        };
      }

      return copy;
    });
  };

  const handleRestoreVfsFile = (trashPath: string) => {
    const node = vfs[trashPath];
    if (!node) return;
    sound.playClick();

    const targetPath = node.originalPath || `/Documents/${node.name}`;
    setVfs(prev => {
      const copy = { ...prev };
      delete copy[trashPath];
      copy[targetPath] = {
        ...node,
        path: targetPath,
        parentPath: targetPath.substring(0, targetPath.lastIndexOf('/')) || '/',
      };
      return copy;
    });
  };

  const handleEmptyTrash = () => {
    sound.playClick();
    setVfs(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(k => {
        if (copy[k].parentPath === '/Trash') {
          delete copy[k];
        }
      });
      return copy;
    });
  };

  const handleUnlockVoid = (password: string): boolean => {
    if (password.trim().toUpperCase() === 'NULL_RECURSION') {
      sound.playNotification();
      setVfs(prev => ({
        ...prev,
        '/VOID': {
          ...prev['/VOID'],
          isLocked: false,
          isHidden: false,
        },
      }));
      triggerStoryEvent('EVENT_019');
      advanceAct(3);
      return true;
    }
    return false;
  };

  // --- Endings Trigger ---
  const triggerEnding = (ending: EndingType) => {
    sound.stopProceduralTrack();
    sound.stopAmbientHum();
    setStory(prev => ({
      ...prev,
      activeEnding: ending,
      endingDiscovered: [...new Set([...prev.endingDiscovered, ending])],
    }));
  };

  const handleHardResetGame = () => {
    resetGameState();
    window.location.reload();
  };

  return (
    <div className={`h-full w-full overflow-hidden flex flex-col relative ${settings.customCursor ? 'cursor-retro-default' : ''}`}>
      {/* Boot Screen Sequence */}
      {!isBooted && (
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      )}

      {/* BSOD Crash Screen */}
      {bsodReason && (
        <BSODScreen
          reason={bsodReason}
          onRestart={() => {
            setBsodReason(null);
            setIsBooted(false);
          }}
        />
      )}

      {/* Ending Modal */}
      {story.activeEnding && (
        <EndingModal
          ending={story.activeEnding}
          unlockedEvents={story.unlockedEvents}
          onRestart={handleHardResetGame}
        />
      )}

      {/* Main Desktop Workstation Environment */}
      <div
        onClick={() => {
          if (isStartMenuOpen) setIsStartMenuOpen(false);
          if (isNotificationFlyoutOpen) setIsNotificationFlyoutOpen(false);
        }}
        className="flex-1 w-full flex flex-col overflow-hidden relative"
      >
        {/* Desktop Icons, Grid, Watermark */}
        <Desktop
          icons={desktopIcons}
          selectedIconIds={selectedIconIds}
          onSelectIcon={(id) => setSelectedIconIds([id])}
          onOpenApp={openApp}
          onClearSelection={() => setSelectedIconIds([])}
          act={story.act}
          anomalyLevel={story.anomalyLevel}
          wallpaperTheme={settings.wallpaper}
        />

        {/* Multi-Window Manager */}
        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          onFocusWindow={focusWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
          vfs={vfs}
          currentVfsPath={currentVfsPath}
          onNavigateVfs={setCurrentVfsPath}
          onOpenVfsFile={handleOpenVfsFile}
          onCreateVfsFile={handleCreateVfsFile}
          onCreateVfsFolder={handleCreateVfsFolder}
          onDeleteVfsFile={handleDeleteVfsFile}
          onRestoreVfsFile={handleRestoreVfsFile}
          onEmptyTrash={handleEmptyTrash}
          onUnlockVoid={handleUnlockVoid}
          onVisitWebsite={(url) => {
            if (url.includes('voidnet')) {
              triggerStoryEvent('EVENT_042');
              advanceAct(3);
            }
          }}
          onTriggerEvent={triggerStoryEvent}
          advanceAct={advanceAct}
          onTriggerEnding={triggerEnding}
          setAnomalyLevel={(fn) => setStory(prev => ({ ...prev, anomalyLevel: fn(prev.anomalyLevel) }))}
          openApp={openApp}
          onKillHostileProcess={(name) => {
            triggerStoryEvent('EVENT_033');
            setStory(prev => ({ ...prev, anomalyLevel: Math.min(100, prev.anomalyLevel + 15) }));
          }}
          settings={settings}
          onUpdateSettings={(newS) => setSettings(prev => ({ ...prev, ...newS }))}
          onResetGame={handleHardResetGame}
          playerName={story.playerName}
          act={story.act}
          anomalyLevel={story.anomalyLevel}
        />

        {/* Start Menu Drawer */}
        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={() => setIsStartMenuOpen(false)}
          onOpenApp={openApp}
          onShutdown={() => triggerEnding('loop')}
          onReboot={() => {
            setIsBooted(false);
            setWindows([]);
          }}
          onHardReset={handleHardResetGame}
          act={story.act}
          anomalyLevel={story.anomalyLevel}
        />

        {/* Notification Toasts & Drawer */}
        <NotificationContainer
          notifications={notifications}
          isFlyoutOpen={isNotificationFlyoutOpen}
          onCloseFlyout={() => setIsNotificationFlyoutOpen(false)}
          onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
          onClearAll={() => setNotifications([])}
          onOpenAction={(appId, data) => openApp(appId, data)}
        />
      </div>

      {/* Bottom Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onSelectWindow={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isMinimized) {
            focusWindow(id);
          } else if (activeWindowId === id) {
            minimizeWindow(id);
          } else {
            focusWindow(id);
          }
        }}
        onQuickLaunch={openApp}
        notifications={notifications}
        onToggleNotifications={() => setIsNotificationFlyoutOpen(!isNotificationFlyoutOpen)}
        anomalyLevel={story.anomalyLevel}
        act={story.act}
        masterVolume={settings.masterVolume}
        onVolumeChange={(vol) => {
          setSettings(prev => ({ ...prev, masterVolume: vol }));
          sound.setVolume(vol);
        }}
        isMuted={isMuted}
        onToggleMute={() => {
          const next = !isMuted;
          setIsMuted(next);
          sound.setMuted(next);
        }}
      />

      {/* Visual Shaders & Overlays */}
      <CRTOverlay
        enabled={settings.crtScanlines}
        curvature={settings.crtCurvature}
        bloom={settings.crtBloom}
      />

      <GlitchLayer
        anomalyLevel={story.anomalyLevel}
        glitchIntensitySetting={settings.glitchIntensity}
        act={story.act}
      />

      <CustomCursor
        enabled={settings.customCursor}
        act={story.act}
      />
    </div>
  );
};
export default App;
