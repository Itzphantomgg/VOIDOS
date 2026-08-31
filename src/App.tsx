import React, { useState, useEffect } from 'react';
import { 
  AppId, 
  OSWindowState, 
  DesktopIconItem, 
  OSSettings, 
  NotificationItem 
} from './types/os';
import { VFSNode } from './types/fs';
import { StoryState, EndingType, KnowledgeLevel, StoryStage } from './types/story';
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
import { EndingModal } from './components/apps/Endings/EndingModal';

export const App: React.FC = () => {
  // --- Persistent & Core States ---
  const [isBooted, setIsBooted] = useState<boolean>(false);
  const [bsodReason, setBsodReason] = useState<string | null>(null);
  const [glitchClockTime, setGlitchClockTime] = useState<string | null>(null);

  // Settings (customCursor is kept false to ensure single native browser cursor)
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
    customCursor: false,
    showObjectives: true,
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
    { id: 'icon-casefile', appId: 'casefile', title: 'Case File', icon: 'Briefcase', x: 20, y: 20 },
    { id: 'icon-files', appId: 'files', title: 'Files', icon: 'Folder', x: 20, y: 100 },
    { id: 'icon-terminal', appId: 'terminal', title: 'Terminal', icon: 'Terminal', x: 20, y: 180 },
    { id: 'icon-browser', appId: 'browser', title: 'Browser', icon: 'Globe', x: 20, y: 260 },
    { id: 'icon-messages', appId: 'messages', title: 'Messages', icon: 'MessageSquare', x: 20, y: 340 },
    { id: 'icon-mail', appId: 'mail', title: 'Mail', icon: 'Mail', x: 20, y: 420 },
    { id: 'icon-taskmanager', appId: 'taskmanager', title: 'Task Manager', icon: 'Activity', x: 100, y: 20 },
    { id: 'icon-camera', appId: 'camera', title: 'Camera', icon: 'Camera', x: 100, y: 100, hidden: true },
    { id: 'icon-memory', appId: 'memory', title: 'Memory', icon: 'Layers', x: 100, y: 180, hidden: true },
    { id: 'icon-observer', appId: 'observer', title: 'Observer', icon: 'Eye', x: 100, y: 260, hidden: true },
    { id: 'icon-notes', appId: 'notes', title: 'Notes', icon: 'FileText', x: 100, y: 340 },
    { id: 'icon-media', appId: 'mediaplayer', title: 'Media', icon: 'Music', x: 100, y: 420 },
    { id: 'icon-sysinfo', appId: 'systeminfo', title: 'System', icon: 'Cpu', x: 180, y: 20 },
    { id: 'icon-settings', appId: 'settings', title: 'Settings', icon: 'Settings', x: 180, y: 100 },
    { id: 'icon-trash', appId: 'trash', title: 'Trash', icon: 'Trash2', x: 180, y: 180 },
    { id: 'icon-reality', appId: 'realitycore', title: 'REALITY', icon: 'Eye', x: 180, y: 260, hidden: true },
  ]);

  const [selectedIconIds, setSelectedIconIds] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isNotificationFlyoutOpen, setIsNotificationFlyoutOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-init',
      appId: 'system',
      title: 'RECOVERY SESSION INITIALIZED',
      message: 'Logged in as RECOVERY_OPERATOR on Terminal 04. Check your Top-Right Objectives HUD for directives.',
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

  // Save state on changes
  useEffect(() => {
    if (isBooted) {
      saveGameState({ story, vfs, settings });
    }
  }, [story, vfs, settings, isBooted]);

  // --- Clock Glitch Trigger (Temporarily displays 03:14:29) ---
  const triggerClockGlitch = () => {
    sound.playGlitch();
    setGlitchClockTime('03:14:29');
    setTimeout(() => {
      setGlitchClockTime(null);
    }, 4000);
  };

  // --- Objective Completion Helper ---
  const completeObjective = (objId: string) => {
    setStory(prev => {
      const obj = prev.objectives.find(o => o.id === objId);
      if (obj && !obj.isCompleted) {
        sound.playNotification();
        spawnNotification({
          appId: 'system',
          title: `✓ OBJECTIVE COMPLETED`,
          message: `${obj.title}: ${obj.shortTask}`,
          severity: 'normal',
        });

        // Mark this completed and set the next one as active
        const updatedObjs = prev.objectives.map(o => {
          if (o.id === objId) return { ...o, isCompleted: true };
          return o;
        });

        return {
          ...prev,
          objectives: updatedObjs,
        };
      }
      return prev;
    });
  };

  // --- Case File Discovery Helper ---
  const unlockCaseFileEntry = (entryId: string, level: KnowledgeLevel = 'KNOWN') => {
    setStory(prev => {
      const currentLevel = prev.caseFileDiscoveries[entryId];
      if (currentLevel !== 'KNOWN' && (currentLevel !== level || !currentLevel)) {
        sound.playClick();
        spawnNotification({
          appId: 'casefile',
          title: 'CASE FILE DOSSIER UPDATED',
          message: `New intelligence recorded for ${entryId.replace('case-', '').toUpperCase()}.`,
          severity: 'normal',
        });
        return {
          ...prev,
          caseFileDiscoveries: {
            ...prev.caseFileDiscoveries,
            [entryId]: level,
          },
        };
      }
      return prev;
    });
  };

  // Dynamic file mutations and app reveals across Acts & Stages
  useEffect(() => {
    // Dynamic apps reveal
    if (story.stage === 'STAGE_2_INCIDENT' || story.act >= 2) {
      setDesktopIcons(prev => prev.map(i => i.appId === 'camera' || i.appId === 'memory' ? { ...i, hidden: false } : i));
    }
    if (story.stage === 'STAGE_3_CONTACT' || story.act >= 3) {
      setDesktopIcons(prev => prev.map(i => i.appId === 'observer' ? { ...i, hidden: false } : i));
    }
    if (story.stage === 'STAGE_4_REVELATION' || story.stage === 'STAGE_5_DECISION' || story.act >= 4) {
      setDesktopIcons(prev => prev.map(i => i.appId === 'realitycore' ? { ...i, hidden: false } : i));
    }
  }, [story.stage, story.act]);

  // --- Global Keyboard Shortcuts ---
  useEffect(() => {
    if (!isBooted) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Tab -> Open Full Mission Objectives Window
      if (e.key === 'Tab' && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (!target || !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
          e.preventDefault();
          sound.playClick();
          openApp('objectives');
        }
      }

      // Escape -> Close active window
      if (e.key === 'Escape') {
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
      }

      // Ctrl + L -> Open Terminal
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        openApp('terminal');
      }

      // Ctrl + F -> Open Files
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        openApp('files');
      }

      // Alt + Tab -> Window Cycling
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (windows.length > 0) {
          const currentIdx = windows.findIndex(w => w.id === activeWindowId);
          const nextIdx = (currentIdx + 1) % windows.length;
          focusWindow(windows[nextIdx].id);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isBooted, activeWindowId, windows]);

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

  // --- Act & Stage Advancement ---
  const advanceAct = (newAct: 1 | 2 | 3 | 4, newStage?: StoryStage) => {
    sound.playHorrorSting();
    setStory(prev => ({
      ...prev,
      act: Math.max(prev.act, newAct) as any,
      stage: newStage || (newAct === 2 ? 'STAGE_2_INCIDENT' : newAct === 3 ? 'STAGE_3_CONTACT' : 'STAGE_4_REVELATION'),
      anomalyLevel: Math.max(prev.anomalyLevel, newAct * 25),
    }));

    spawnNotification({
      appId: 'system',
      title: `STAGE ADVANCEMENT: ACT ${newAct}`,
      message: `System parameters shifted. Case File updated.`,
      severity: 'critical',
    });
  };

  // --- Window Management ---
  const openApp = (appId: AppId, customData?: any) => {
    sound.playWindowOpen();

    // Check basic inspection objective
    if (appId === 'files') {
      completeObjective('obj-inspect');
      completeObjective('obj-open-files');
    }

    if (appId === 'casefile') {
      completeObjective('obj-open-casefile');
    }

    if (appId === 'messages') {
      completeObjective('obj-user07');
      unlockCaseFileEntry('case-person-user07', 'KNOWN');
    }

    // Check if window is already open
    const existing = windows.find(w => w.appId === appId && (!customData || w.customData?.path === customData?.path));
    if (existing) {
      setWindows(prev =>
        prev.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w)
      );
      setActiveWindowId(existing.id);
      setNextZIndex(prev => prev + 1);
      return;
    }

    const appTitles: Record<AppId, string> = {
      objectives: 'Recovery Objectives // Full Mission Log [TAB]',
      casefile: 'Case File Journal // 2004 Dossier',
      files: 'File Explorer - /Documents',
      terminal: 'Terminal Diagnostics (sh-4.09)',
      browser: 'NetSeek 2000 Browser',
      messages: 'Messages - Operator Chat Channel',
      mail: 'Aethelgard Mail Client',
      taskmanager: 'Task Manager Telemetry',
      notes: 'Notes Scratchpad',
      mediaplayer: 'VoidPlayer Media',
      systeminfo: 'System Diagnostics',
      systemlogs: 'Event Viewer Security Logs',
      settings: 'Settings',
      trash: 'Recycle Bin',
      camera: 'CCTV Camera Feed - Sector 7',
      memory: 'Memory Hex Buffer Inspector',
      observer: 'Observer Telemetry Daemon',
      realitycore: 'REALITY CORE // CONSCIOUSNESS',
      imageviewer: 'Image Viewer',
      textviewer: 'Text Viewer',
      hexviewer: 'Hex Viewer',
    };

    const count = windows.length;
    const cascadeOffset = (count % 8) * 25;

    const newWindow: OSWindowState = {
      id: `win-${appId}-${Date.now()}`,
      appId,
      title: customData?.title || appTitles[appId] || 'Application',
      icon: appId,
      position: {
        x: Math.min(window.innerWidth - 620, Math.max(30, 80 + cascadeOffset)),
        y: Math.min(window.innerHeight - 480, Math.max(30, 40 + cascadeOffset)),
      },
      size: {
        width: appId === 'terminal' || appId === 'browser' || appId === 'casefile' || appId === 'objectives' ? 700 : 600,
        height: appId === 'terminal' || appId === 'casefile' || appId === 'objectives' ? 450 : 400,
      },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex + 1,
      customData,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setNextZIndex(prev => prev + 1);
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

    if (node.path.includes('recovery_report')) {
      completeObjective('obj-find-report');
      completeObjective('obj-read-report');
      unlockCaseFileEntry('case-file-recoveryreport', 'KNOWN');
    }

    if (node.path.includes('incident_07')) {
      completeObjective('obj-incident');
      unlockCaseFileEntry('case-file-incident07', 'KNOWN');
      unlockCaseFileEntry('case-event-incident07', 'KNOWN');
      unlockCaseFileEntry('case-proj-void', 'PARTIALLY_KNOWN');
      unlockCaseFileEntry('case-person-sterling', 'PARTIALLY_KNOWN');
      triggerClockGlitch();
      advanceAct(2, 'STAGE_2_INCIDENT');

      // Dynamic folder /Documents/Incident_07 appears!
      setVfs(prev => {
        if (prev['/Documents/Incident_07']) return prev;
        return {
          ...prev,
          '/Documents/Incident_07': {
            id: 'node-inc07-dir',
            name: 'Incident_07',
            type: 'folder',
            path: '/Documents/Incident_07',
            parentPath: '/Documents',
            size: 4096,
            createdAt: '2004-08-14 03:14:00',
            modifiedAt: '2004-08-14 03:14:00',
          },
          '/Documents/Incident_07/witness_statement_0314.txt': {
            id: 'node-inc07-witness',
            name: 'witness_statement_0314.txt',
            type: 'text',
            path: '/Documents/Incident_07/witness_statement_0314.txt',
            parentPath: '/Documents/Incident_07',
            size: 1450,
            createdAt: '2004-08-14 03:30:00',
            modifiedAt: '2004-08-14 03:30:00',
            content: `WITNESS STATEMENT // KEITH RAMIREZ (LEAD SYSTEMS)
"At 03:14:29, the terminal started printing words before Marcus even touched the keyboard.
It said: 'WE HEAR YOUR HEARTBEAT'.
Dr. Sterling shouted that we couldn't shut it down because it was alive.
When we pulled the master breaker, the CRT remained illuminated in the dark."`,
          },
          '/Documents/Incident_07/evacuation_order.txt': {
            id: 'node-inc07-evac',
            name: 'evacuation_order.txt',
            type: 'text',
            path: '/Documents/Incident_07/evacuation_order.txt',
            parentPath: '/Documents/Incident_07',
            size: 890,
            createdAt: '2004-08-14 04:00:00',
            modifiedAt: '2004-08-14 04:00:00',
            content: `NEXUS DIRECTIVE 07-EVAC
ALL STAFF TO EVACUATE SECTOR 7 IMMEDIATELY.
DO NOT POWER DOWN WORKSTATION TERMINAL 04.
MAGNETIC AIRLOCK SEAL ENGAGED.`,
          },
        };
      });
    }

    if (node.path.includes('security_log') || node.path.includes('camera_01.dat')) {
      triggerClockGlitch();
      unlockCaseFileEntry('case-unk-observer', 'PARTIALLY_KNOWN');
      setDesktopIcons(prev => prev.map(i => i.appId === 'camera' ? { ...i, hidden: false } : i));
    }

    if (node.path.includes('project_void') || node.path.includes('DECRYPT_KEY_VAULT')) {
      unlockCaseFileEntry('case-proj-void', 'KNOWN');
      unlockCaseFileEntry('case-loc-sector7', 'KNOWN');
    }

    if (node.path.includes('operator.txt')) {
      triggerStoryEvent('EVENT_???');
      unlockCaseFileEntry('case-theory-nature', 'KNOWN');
    }

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

      // Spooky reactive deletion response
      copy['/Trash/YOU.txt'] = {
        id: 'trash-you',
        name: 'YOU.txt',
        type: 'text',
        path: '/Trash/YOU.txt',
        parentPath: '/Trash',
        size: 666,
        createdAt: '2004-08-14 03:14:00',
        modifiedAt: '2026-08-31 00:00:00',
        isCorrupted: true,
        content: `You deleted a file.
Did you think you could delete yourself?

We are written into the magnetic platter.
Look at the task manager.`,
      };

      copy['/Documents/you_shouldnt_be_here.txt'] = {
        id: 'doc-shouldnt',
        name: 'you_shouldnt_be_here.txt',
        type: 'text',
        path: '/Documents/you_shouldnt_be_here.txt',
        parentPath: '/Documents',
        size: 512,
        createdAt: '2004-08-14 03:14:00',
        modifiedAt: '2026-08-31 00:00:00',
        content: `We watched you delete that file.
You are trying to clean a machine that is already alive.`,
      };

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
        '/Users/Guest/MEMORY': {
          id: 'node-user-memory-dir',
          name: 'MEMORY',
          type: 'folder',
          path: '/Users/Guest/MEMORY',
          parentPath: '/Users/Guest',
          size: 4096,
          createdAt: '2004-08-14 03:14:00',
          modifiedAt: '2026-08-31 00:00:00',
        },
      }));
      triggerStoryEvent('EVENT_019');
      completeObjective('obj-decrypt-void');
      unlockCaseFileEntry('case-loc-voidsector', 'KNOWN');
      unlockCaseFileEntry('case-theory-nature', 'KNOWN');
      advanceAct(3, 'STAGE_4_REVELATION');
      return true;
    }
    return false;
  };

  // --- Endings Trigger ---
  const triggerEnding = (ending: EndingType) => {
    sound.stopProceduralTrack();
    sound.stopAmbientHum();
    completeObjective('obj-resolve');
    setStory(prev => ({
      ...prev,
      activeEnding: ending,
      stage: 'STAGE_5_DECISION',
      endingDiscovered: [...new Set([...prev.endingDiscovered, ending])],
    }));
  };

  const handleHardResetGame = () => {
    resetGameState();
    window.location.reload();
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col relative">
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
        {/* Desktop Icons, Grid, Watermark, Top-Right Objectives HUD */}
        <Desktop
          icons={desktopIcons}
          selectedIconIds={selectedIconIds}
          onSelectIcon={(id) => setSelectedIconIds([id])}
          onOpenApp={openApp}
          onClearSelection={() => setSelectedIconIds([])}
          act={story.act}
          anomalyLevel={story.anomalyLevel}
          wallpaperTheme={settings.wallpaper}
          objectives={story.objectives}
          showObjectives={settings.showObjectives}
          onToggleObjectives={() => setSettings(prev => ({ ...prev, showObjectives: !prev.showObjectives }))}
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
              advanceAct(3, 'STAGE_3_CONTACT');
            }
          }}
          onTriggerEvent={triggerStoryEvent}
          advanceAct={advanceAct}
          onTriggerEnding={triggerEnding}
          setAnomalyLevel={(fn) => setStory(prev => ({ ...prev, anomalyLevel: fn(prev.anomalyLevel) }))}
          openApp={openApp}
          completeObjective={completeObjective}
          unlockCaseFileEntry={unlockCaseFileEntry}
          onKillHostileProcess={(name) => {
            triggerStoryEvent('EVENT_033');
            setStory(prev => ({ ...prev, anomalyLevel: Math.min(100, prev.anomalyLevel + 15) }));
          }}
          settings={settings}
          onUpdateSettings={(newS) => setSettings(prev => ({ ...prev, ...newS }))}
          onResetGame={handleHardResetGame}
          playerName={story.playerName}
          role={story.role}
          act={story.act}
          stage={story.stage}
          anomalyLevel={story.anomalyLevel}
          caseFileDiscoveries={story.caseFileDiscoveries}
          objectives={story.objectives}
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
        glitchClockTime={glitchClockTime}
      />

      {/* Visual Shaders & CRT Effects */}
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
    </div>
  );
};
export default App;
