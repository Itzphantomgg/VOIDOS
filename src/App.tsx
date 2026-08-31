import React, { useState, useEffect, useCallback } from 'react';
import { 
  AppId, 
  OSWindowState, 
  DesktopIconItem, 
  OSSettings, 
  NotificationItem 
} from './types/os';
import { VFSNode } from './types/fs';
import { StoryState, EndingType, KnowledgeLevel, StoryStage, StoryAct } from './types/story';
import { initialVFSNodes } from './data/initialFileSystem';
import { initialStoryState } from './state/storyStore';
import { StoryEngine } from './state/storyEngine';
import { masterStoryActs } from './data/storyActs';
import { saveGameState, loadGameState, resetGameState } from './state/persistence';
import { eventQueue } from './state/eventQueue';
import { sound } from './audio/soundEngine';

// Components & Error Boundaries
import { RootErrorBoundary } from './components/common/ErrorBoundary';
import { LandingPage } from './components/landing/LandingPage';
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
import { AppInstallerModal } from './components/common/AppInstallerModal';
import { ActTransitionModal } from './components/common/ActTransitionModal';
import { StoryDebugPanel } from './components/common/StoryDebugPanel';
import { Maximize2, Minimize2 } from 'lucide-react';

export const AppContent: React.FC = () => {
  // --- View Modes: Landing Page -> Boot Terminal -> Desktop OS ---
  const [viewMode, setViewMode] = useState<'landing' | 'boot' | 'desktop'>('landing');
  const [bsodReason, setBsodReason] = useState<string | null>(null);
  const [glitchClockTime, setGlitchClockTime] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFailingSequence, setIsFailingSequence] = useState<boolean>(false);

  // In-Universe App Installer Modal State
  const [pendingInstall, setPendingInstall] = useState<{ appId: AppId; appName: string } | null>(null);

  // In-Universe Act Transition Modal State
  const [pendingActTransition, setPendingActTransition] = useState<{
    fromAct: StoryAct;
    toAct: StoryAct;
    unlockedPackageName: string;
  } | null>(null);

  // Story Progression Debugger Overlay State (F2 or Ctrl+Shift+D)
  const [isStoryDebugOpen, setIsStoryDebugOpen] = useState<boolean>(false);

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

  // Master Desktop Icons Registry
  const masterDesktopIcons: DesktopIconItem[] = [
    { id: 'icon-casefile', appId: 'casefile', title: 'Case File', icon: 'Briefcase', x: 20, y: 20 },
    { id: 'icon-files', appId: 'files', title: 'Files', icon: 'Folder', x: 20, y: 100 },
    { id: 'icon-terminal', appId: 'terminal', title: 'Terminal', icon: 'Terminal', x: 20, y: 180 },
    { id: 'icon-sysinfo', appId: 'systeminfo', title: 'System', icon: 'Cpu', x: 20, y: 260 },
    { id: 'icon-trash', appId: 'trash', title: 'Trash', icon: 'Trash2', x: 20, y: 340 },
    // Progressive Discovery Unlocks:
    { id: 'icon-wiki', appId: 'wiki', title: 'Wiki Archive', icon: 'BookOpen', x: 100, y: 20 },
    { id: 'icon-achievements', appId: 'achievements', title: 'Events', icon: 'Award', x: 100, y: 100 },
    { id: 'icon-mail', appId: 'mail', title: 'Mail', icon: 'Mail', x: 100, y: 180 },
    { id: 'icon-browser', appId: 'browser', title: 'Browser', icon: 'Globe', x: 100, y: 260 },
    { id: 'icon-messages', appId: 'messages', title: 'Messages', icon: 'MessageSquare', x: 100, y: 340 },
    { id: 'icon-notes', appId: 'notes', title: 'Notes', icon: 'FileText', x: 180, y: 20 },
    { id: 'icon-media', appId: 'mediaplayer', title: 'Media', icon: 'Music', x: 180, y: 100 },
    { id: 'icon-camera', appId: 'camera', title: 'CCTV Camera', icon: 'Camera', x: 180, y: 180 },
    { id: 'icon-taskmanager', appId: 'taskmanager', title: 'Task Manager', icon: 'Activity', x: 180, y: 260 },
    { id: 'icon-observer', appId: 'observer', title: 'Observer', icon: 'Eye', x: 180, y: 340 },
    { id: 'icon-diagnostics', appId: 'diagnostics', title: 'Diagnostics', icon: 'Zap', x: 260, y: 20 },
    { id: 'icon-security', appId: 'security', title: 'Security', icon: 'ShieldCheck', x: 260, y: 100 },
    { id: 'icon-memory', appId: 'memory', title: 'Memory', icon: 'Layers', x: 260, y: 180 },
    { id: 'icon-settings', appId: 'settings', title: 'Settings', icon: 'Settings', x: 260, y: 260 },
    { id: 'icon-reality', appId: 'realitycore', title: 'REALITY', icon: 'Eye', x: 260, y: 340 },
  ];

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

  // Load saved state safely on mount
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
    if (viewMode === 'desktop') {
      saveGameState({ story, vfs, settings });
    }
  }, [story, vfs, settings, viewMode]);

  // Listen to browser Fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    try {
      sound.playClick();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}
  };

  // --- Clock Glitch Trigger (Temporarily displays 03:14:29) ---
  const triggerClockGlitch = useCallback(() => {
    try {
      sound.playGlitch();
    } catch {}
    setGlitchClockTime('03:14:29');
    setFlashMessage('03:14');
    setTimeout(() => {
      setGlitchClockTime(null);
    }, 4000);
  }, []);

  // --- Notification Helper with Event Queue Protection ---
  const spawnNotification = useCallback((notif: Omit<NotificationItem, 'id' | 'timestamp'>, priority = 'MEDIUM') => {
    const isEnqueued = eventQueue.enqueue({
      id: `notif-${notif.title}`,
      type: 'notification',
      priority: priority as any,
      payload: notif,
    }, 1200);

    if (!isEnqueued) return;

    try {
      sound.playNotification();
    } catch {}
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  // --- In-Universe Progressive Application Unlock Trigger ---
  const triggerAppInstallation = useCallback((appId: AppId, appName: string) => {
    setStory(prev => {
      const unlocked = Array.isArray(prev.unlockedApps) ? prev.unlockedApps : [];
      if (!unlocked.includes(appId)) {
        setPendingInstall({ appId, appName });
      }
      return prev;
    });
  }, []);

  const completeAppInstallation = useCallback(() => {
    if (!pendingInstall) return;
    const { appId, appName } = pendingInstall;

    setStory(prev => {
      const unlocked = Array.isArray(prev.unlockedApps) ? prev.unlockedApps : [];
      if (!unlocked.includes(appId)) {
        spawnNotification({
          appId: 'system',
          title: 'APPLICATION INSTALLED',
          message: `Workstation successfully installed "${appName}". Available on Desktop & Start Menu.`,
          severity: 'normal',
        }, 'HIGH');
        return {
          ...prev,
          unlockedApps: [...unlocked, appId],
        };
      }
      return prev;
    });
  }, [pendingInstall, spawnNotification]);

  // --- Story Flag & Objective Progression Engine ---
  const triggerStoryFlag = useCallback((flag: string) => {
    if (!flag) return;

    setStory(prev => {
      if (prev.flags?.[flag]) return prev; // Already recorded

      const updatedFlags = { ...(prev.flags || {}), [flag]: true };

      // Check if this flag satisfied an objective in the current act
      const currentActObjectives = masterStoryActs[prev.act] || [];
      const completedObj = currentActObjectives.find(o => o.onCompleteFlag === flag);

      if (completedObj) {
        try {
          sound.playNotification();
        } catch {}

        spawnNotification({
          appId: 'system',
          title: `✓ OBJECTIVE COMPLETED`,
          message: `${completedObj.title}: ${completedObj.task}`,
          severity: 'normal',
        }, 'HIGH');
      }

      // Check if current Act is now 100% complete!
      const isActNowComplete = StoryEngine.isActComplete(prev.act, updatedFlags);

      if (isActNowComplete && prev.act < 5) {
        const nextActNum = (prev.act + 1) as StoryAct;
        const packageNames: Record<StoryAct, string> = {
          1: 'Archive Classified Vault',
          2: 'Archive Classified Vault',
          3: 'Observer Biometric Telemetry & Daemon Controls',
          4: 'Memory Connectome & Communication Relays',
          5: 'REALITY CORE Master Consciousness Interface',
        };

        // Schedule transition modal
        setTimeout(() => {
          setPendingActTransition({
            fromAct: prev.act,
            toAct: nextActNum,
            unlockedPackageName: packageNames[nextActNum] || 'System Upgrade Package',
          });
        }, 500);
      }

      return {
        ...prev,
        flags: updatedFlags,
      };
    });
  }, [spawnNotification]);

  // --- In-Universe Act Transition Completion ---
  const handleCompleteActTransition = useCallback(() => {
    if (!pendingActTransition) return;
    const { toAct } = pendingActTransition;

    setStory(prev => {
      const unlocked = Array.isArray(prev.unlockedApps) ? [...prev.unlockedApps] : [];
      const unlockedDirs = Array.isArray(prev.unlockedFolders) ? [...prev.unlockedFolders] : [];

      if (toAct === 2) {
        if (!unlockedDirs.includes('/Archive')) unlockedDirs.push('/Archive');
        if (!unlocked.includes('taskmanager')) unlocked.push('taskmanager');
        if (!unlocked.includes('wiki')) unlocked.push('wiki');
        if (!unlocked.includes('achievements')) unlocked.push('achievements');
      } else if (toAct === 3) {
        if (!unlocked.includes('observer')) unlocked.push('observer');
        if (!unlocked.includes('diagnostics')) unlocked.push('diagnostics');
        if (!unlocked.includes('security')) unlocked.push('security');
      } else if (toAct === 4) {
        if (!unlocked.includes('memory')) unlocked.push('memory');
        if (!unlocked.includes('messages')) unlocked.push('messages');
      } else if (toAct === 5) {
        if (!unlocked.includes('realitycore')) unlocked.push('realitycore');
      }

      return {
        ...prev,
        act: toAct,
        stage: (toAct === 2 ? 'STAGE_2_INCIDENT' : toAct === 3 ? 'STAGE_3_CONTACT' : toAct === 4 ? 'STAGE_4_REVELATION' : 'STAGE_5_DECISION') as StoryStage,
        anomalyLevel: Math.max(prev.anomalyLevel, (toAct - 1) * 20),
        isObservationActive: toAct >= 3,
        unlockedApps: unlocked,
        unlockedFolders: unlockedDirs,
      };
    });

    setPendingActTransition(null);
  }, [pendingActTransition]);

  // Global Keyboard Listener for Story Debugger (F2 or Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2' || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        setIsStoryDebugOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Objective Completion Helper ---
  const completeObjective = useCallback((objId: string) => {
    setStory(prev => {
      const objs = Array.isArray(prev.objectives) ? prev.objectives : [];
      const obj = objs.find(o => o && o.id === objId);
      if (obj && !obj.isCompleted) {
        try {
          sound.playNotification();
        } catch {}
        spawnNotification({
          appId: 'system',
          title: `✓ OBJECTIVE COMPLETED`,
          message: `${obj.title}: ${obj.shortTask || obj.title}`,
          severity: 'normal',
        }, 'HIGH');

        const updatedObjs = objs.map(o => {
          if (o && o.id === objId) return { ...o, isCompleted: true };
          return o;
        });

        return {
          ...prev,
          objectives: updatedObjs,
        };
      }
      return prev;
    });
  }, [spawnNotification]);

  // --- Case File Discovery Helper ---
  const unlockCaseFileEntry = useCallback((entryId: string, level: KnowledgeLevel = 'KNOWN') => {
    setStory(prev => {
      const discoveries = prev.caseFileDiscoveries && typeof prev.caseFileDiscoveries === 'object' && !Array.isArray(prev.caseFileDiscoveries)
        ? prev.caseFileDiscoveries
        : {};

      const currentLevel = discoveries[entryId];
      if (currentLevel !== 'KNOWN' && (currentLevel !== level || !currentLevel)) {
        try {
          sound.playClick();
        } catch {}
        spawnNotification({
          appId: 'casefile',
          title: 'CASE FILE DOSSIER UPDATED',
          message: `New intelligence recorded for ${entryId.replace('case-', '').toUpperCase()}.`,
          severity: 'normal',
        }, 'LOW');
        return {
          ...prev,
          caseFileDiscoveries: {
            ...discoveries,
            [entryId]: level,
          },
        };
      }
      return prev;
    });
  }, [spawnNotification]);

  // --- Story Event Trigger ---
  const triggerStoryEvent = useCallback((eventId: string) => {
    setStory(prev => {
      const events = Array.isArray(prev.unlockedEvents) ? prev.unlockedEvents : [];
      if (!events.includes(eventId)) {
        spawnNotification({
          appId: 'system',
          title: `SYSTEM EVENT DISCOVERED: ${eventId}`,
          message: `Anomalous pattern registered in system event buffer.`,
          severity: 'anomaly',
        }, 'HIGH');

        return {
          ...prev,
          unlockedEvents: [...events, eventId],
          anomalyLevel: Math.min(100, prev.anomalyLevel + 8),
        };
      }
      return prev;
    });
  }, [spawnNotification]);

  // --- Act & Stage Advancement ---
  const advanceAct = useCallback((newAct: 1 | 2 | 3 | 4 | 5, newStage?: StoryStage) => {
    try {
      sound.playHorrorSting();
    } catch {}
    setStory(prev => ({
      ...prev,
      act: Math.max(prev.act, newAct) as any,
      stage: newStage || (newAct === 2 ? 'STAGE_2_INCIDENT' : newAct === 3 ? 'STAGE_3_CONTACT' : 'STAGE_4_REVELATION'),
      anomalyLevel: Math.max(prev.anomalyLevel, newAct * 20),
      isObservationActive: newAct >= 3,
    }));

    if (newAct >= 2) {
      triggerAppInstallation('taskmanager', 'Task Manager');
      triggerAppInstallation('wiki', 'Lore Archive & Wiki');
      triggerAppInstallation('achievements', 'System Events');
    }

    spawnNotification({
      appId: 'system',
      title: `STAGE ADVANCEMENT: ACT ${newAct}`,
      message: `System parameters shifted. Investigation stage updated.`,
      severity: 'critical',
    }, 'CRITICAL');
  }, [spawnNotification, triggerAppInstallation]);

  // --- Observation Duty Stability Drain Loop ---
  useEffect(() => {
    if (viewMode !== 'desktop' || (!story.isObservationActive && story.act < 2)) return;

    const interval = setInterval(() => {
      setStory(prev => {
        if (prev.anomalyStability <= 0) return prev;
        const drain = prev.act >= 4 ? 2 : 1;
        const nextStability = Math.max(0, prev.anomalyStability - drain);

        // Warning alerts at low stability
        if (nextStability === 30) {
          setFlashMessage('DO NOT LOOK AWAY.');
        } else if (nextStability === 15) {
          setFlashMessage('WARNING: ANOMALY ACTIVE');
          try {
            sound.playGlitch();
          } catch {}
        } else if (nextStability === 0) {
          // Failure sequence trigger
          setIsFailingSequence(true);
        }

        return {
          ...prev,
          anomalyStability: nextStability,
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [viewMode, story.isObservationActive, story.act]);

  // Handle Safe Failure Sequence (Restarts to Checkpoint without wiping save)
  useEffect(() => {
    if (isFailingSequence) {
      try {
        sound.playHorrorSting();
      } catch {}
      const timer = setTimeout(() => {
        setIsFailingSequence(false);
        setStory(prev => ({
          ...prev,
          anomalyStability: 75,
        }));
        spawnNotification({
          appId: 'system',
          title: 'SYSTEM RECOVERY INITIALIZED',
          message: 'Checkpoint restored. Observation duty stabilized.',
          severity: 'warning',
        }, 'CRITICAL');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isFailingSequence, spawnNotification]);

  // Counterplay actions
  const handleStabilizePulse = () => {
    triggerStoryFlag('first_stabilization_done');
    triggerStoryFlag('biometrics_verified');
    setStory(prev => ({
      ...prev,
      anomalyStability: Math.min(100, prev.anomalyStability + 35),
      counters: {
        ...prev.counters,
        stabilizationsDone: (prev.counters?.stabilizationsDone || 0) + 1,
      },
    }));
  };

  const handleRunDiagnosticSweep = () => {
    setStory(prev => ({
      ...prev,
      anomalyStability: Math.min(100, prev.anomalyStability + 20),
    }));
  };

  const handleVerifyIntegrity = () => {
    setStory(prev => ({
      ...prev,
      anomalyStability: Math.min(100, prev.anomalyStability + 15),
    }));
  };

  // --- Window Management ---
  const openApp = useCallback((appId: AppId, customData?: any) => {
    try {
      sound.playWindowOpen();
    } catch {}

    if (appId === 'files') {
      triggerStoryFlag('recovery_folder_located');
    }

    if (appId === 'systeminfo') {
      triggerStoryFlag('sysinfo_checked');
      triggerStoryFlag('clearance_checked');
    }

    if (appId === 'casefile') {
      triggerStoryFlag('act1_casefile_synced');
    }

    if (appId === 'camera') {
      triggerStoryFlag('camera_app_installed');
      triggerStoryFlag('camera03_reviewed');
    }

    if (appId === 'observer') {
      triggerStoryFlag('observer_opened');
    }

    if (appId === 'taskmanager') {
      triggerStoryFlag('rogue_daemon_detected');
    }

    if (appId === 'memory') {
      triggerStoryFlag('memory_app_opened');
      triggerStoryFlag('marcus_signature_found');
    }

    if (appId === 'messages') {
      triggerStoryFlag('messages_app_installed');
      triggerStoryFlag('void_communication_received');
      unlockCaseFileEntry('case-person-user07', 'KNOWN');
    }

    if (appId === 'realitycore') {
      triggerStoryFlag('realitycore_opened');
      triggerStoryFlag('ancient_origin_discovered');
    }

    // Check if window is already open
    const existing = windows.find(w => w && w.appId === appId && (!customData || w.customData?.path === customData?.path));
    if (existing) {
      setWindows(prev =>
        prev.map(w => w && w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w)
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
      wiki: 'Lore Archive & Wiki // Project VOID',
      achievements: 'System Events & Milestones',
      security: 'Security Matrix & Access Control',
      diagnostics: 'Hardware Bus Diagnostics',
      quarantine: 'Process & Binary Quarantine',
      imageviewer: 'Image Viewer',
      textviewer: 'Text Viewer',
      hexviewer: 'Hex Viewer',
    };

    const count = windows.length;
    const cascadeOffset = (count % 8) * 25;

    const newWindow: OSWindowState = {
      id: `win-${appId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appId,
      title: customData?.title || appTitles[appId] || 'Application',
      icon: appId,
      position: {
        x: Math.min(window.innerWidth - 620, Math.max(30, 80 + cascadeOffset)),
        y: Math.min(window.innerHeight - 480, Math.max(30, 40 + cascadeOffset)),
      },
      size: {
        width: appId === 'terminal' || appId === 'browser' || appId === 'casefile' || appId === 'objectives' || appId === 'wiki' ? 700 : 600,
        height: appId === 'terminal' || appId === 'casefile' || appId === 'objectives' || appId === 'wiki' ? 460 : 400,
      },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex + 1,
      customData,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex, completeObjective, unlockCaseFileEntry]);

  const focusWindow = (id: string) => {
    if (!id) return;
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => w && w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w)
    );
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    if (!id) return;
    setWindows(prev => prev.filter(w => w && w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    if (!id) return;
    setWindows(prev => prev.map(w => w && w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: string) => {
    if (!id) return;
    setWindows(prev => prev.map(w => w && w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    if (!id) return;
    setWindows(prev => prev.map(w => w && w.id === id ? { ...w, position: { x, y } } : w));
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    if (!id) return;
    setWindows(prev => prev.map(w => w && w.id === id ? { ...w, size: { width, height } } : w));
  };

  // --- VFS File Handlers ---
  const handleOpenVfsFile = (node: VFSNode) => {
    if (!node) return;
    try {
      sound.playClick();
    } catch {}
    triggerStoryEvent('EVENT_004');

    // Act I Narrative Triggers
    if (node.path && node.path.includes('recovery_report')) {
      triggerStoryFlag('recovery_report_read');
      unlockCaseFileEntry('case-file-recoveryreport', 'KNOWN');
    }

    if (node.path && node.path.includes('config.dat')) {
      triggerStoryFlag('credentials_recovered');
    }

    if (node.path && (node.path.includes('operator_07') || node.path.includes('operator.txt'))) {
      triggerStoryFlag('user07_identified');
      triggerStoryFlag('timestamp_0314_found');
      unlockCaseFileEntry('case-person-user07', 'KNOWN');
    }

    if (node.path && node.path.includes('system_0314.log')) {
      triggerStoryFlag('system_log_0314_viewed');
      triggerStoryFlag('timestamp_0314_found');
      unlockCaseFileEntry('case-event-incident07', 'KNOWN');
    }

    if (node.path && node.path.includes('corrupted_buffer.dat')) {
      triggerStoryFlag('log_line_recovered');
    }

    if (node.path && node.path.includes('recovered_entry.txt')) {
      triggerStoryFlag('recovered_line_read');
      unlockCaseFileEntry('case-theory-nature', 'KNOWN');
    }

    if (node.path && (node.path.includes('Incident_07') || node.path.includes('incident_07'))) {
      triggerStoryFlag('incident07_discovered');
    }

    // Act II Narrative Triggers
    if (node.path && node.path.includes('marcus_record')) {
      triggerStoryFlag('marcus_record_read');
      unlockCaseFileEntry('case-person-user07', 'KNOWN');
    }

    if (node.path && node.path.includes('marcus_journal')) {
      triggerStoryFlag('marcus_journal_read');
      unlockCaseFileEntry('case-proj-void', 'KNOWN');
    }

    if (node.path && node.path.includes('security_report_0814')) {
      triggerStoryFlag('security_report_read');
      unlockCaseFileEntry('case-loc-sector7', 'KNOWN');
    }

    if (node.path && node.path.includes('camera_03.dat')) {
      triggerStoryFlag('camera03_located');
      triggerAppInstallation('camera', 'CCTV Camera Feed');
    }

    if (node.path && node.path.includes('witness_statement_0314')) {
      triggerStoryFlag('witness_statement_read');
      unlockCaseFileEntry('case-event-incident07', 'KNOWN');
    }

    if (node.path && node.path.includes('user07_contact.dat')) {
      triggerStoryFlag('messages_app_installed');
      triggerAppInstallation('messages', 'Messages Communication Relay');
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

    try {
      sound.playWindowClose();
    } catch {}

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

      return copy;
    });
  };

  const handleRestoreVfsFile = (trashPath: string) => {
    const node = vfs[trashPath];
    if (!node) return;
    try {
      sound.playClick();
    } catch {}

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
    try {
      sound.playClick();
    } catch {}
    setVfs(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(k => {
        if (copy[k]?.parentPath === '/Trash') {
          delete copy[k];
        }
      });
      return copy;
    });
  };

  const handleUnlockVoid = (password: string): boolean => {
    if (password && password.trim().toUpperCase() === 'NULL_RECURSION') {
      try {
        sound.playNotification();
      } catch {}
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
      triggerStoryFlag('cipher_discovered');
      triggerStoryFlag('void_partition_decrypted');
      unlockCaseFileEntry('case-loc-voidsector', 'KNOWN');
      unlockCaseFileEntry('case-theory-nature', 'KNOWN');
      return true;
    }
    return false;
  };

  // --- Endings Trigger ---
  const triggerEnding = (ending: EndingType) => {
    try {
      sound.stopProceduralTrack();
      sound.stopAmbientHum();
    } catch {}
    triggerStoryFlag('ending_resolved');
    setStory(prev => ({
      ...prev,
      activeEnding: ending,
      stage: 'STAGE_5_DECISION',
      endingDiscovered: [...new Set([...(Array.isArray(prev.endingDiscovered) ? prev.endingDiscovered : []), ending])],
    }));
  };

  const handleHardResetGame = () => {
    resetGameState();
    window.location.reload();
  };

  // Filter visible icons based on progressive unlocks
  const visibleDesktopIcons = masterDesktopIcons.filter(icon => 
    (story.unlockedApps || []).includes(icon.appId)
  );

  return (
    <div className="h-full w-full overflow-hidden flex flex-col relative">
      {/* 1. Landing Page View */}
      {viewMode === 'landing' && (
        <LandingPage onLaunchGame={() => setViewMode('boot')} storyState={story} />
      )}

      {/* 2. Boot Screen Sequence */}
      {viewMode === 'boot' && (
        <BootScreen
          onBootComplete={() => {
            triggerStoryFlag('boot_completed');
            setViewMode('desktop');
          }}
        />
      )}

      {/* 3. In-Universe Application Installer Modal */}
      {pendingInstall && (
        <AppInstallerModal
          appId={pendingInstall.appId}
          appName={pendingInstall.appName}
          onComplete={completeAppInstallation}
          onLaunchNow={() => {
            completeAppInstallation();
            openApp(pendingInstall.appId);
            setPendingInstall(null);
          }}
        />
      )}

      {/* 4. In-Universe Act Transition Modal */}
      {pendingActTransition && (
        <ActTransitionModal
          completedAct={pendingActTransition.fromAct}
          nextAct={pendingActTransition.toAct}
          unlockedPackageName={pendingActTransition.unlockedPackageName}
          onComplete={handleCompleteActTransition}
        />
      )}

      {/* 5. Story Progression Debugger Overlay (F2 or Ctrl+Shift+D) */}
      {isStoryDebugOpen && (
        <StoryDebugPanel
          storyState={story}
          onClose={() => setIsStoryDebugOpen(false)}
          onForceAdvanceAct={(actNum) => advanceAct(actNum)}
          onTriggerFlag={(flag) => triggerStoryFlag(flag)}
        />
      )}

      {/* 6. Safe Failure Sequence Overlay (03:14 Blackout recovery) */}
      {isFailingSequence && (
        <div className="fixed inset-0 z-[999999] bg-black text-red-500 font-mono text-sm flex flex-col items-center justify-center p-6 select-none">
          <div className="space-y-3 text-center max-w-md">
            <div className="text-4xl font-black tracking-widest text-red-500 animate-pulse glow-red">
              03:14:29
            </div>
            <div className="text-xs font-bold text-slate-300">
              [ ANOMALY STABILITY COLLAPSE // HOST RECURSION ]
            </div>
            <div className="text-[11px] text-pink-400">
              RECOVERING WORKSTATION TO LAST OPERATIONAL CHECKPOINT...
            </div>
          </div>
        </div>
      )}

      {/* 7. BSOD Crash Screen */}
      {bsodReason && (
        <BSODScreen
          reason={bsodReason}
          onRestart={() => {
            setBsodReason(null);
            setViewMode('boot');
          }}
        />
      )}

      {/* 8. Ending Modal */}
      {story.activeEnding && (
        <EndingModal
          ending={story.activeEnding}
          unlockedEvents={story.unlockedEvents || []}
          onRestart={handleHardResetGame}
        />
      )}

      {/* 9. Main Desktop Workstation Environment */}
      {viewMode === 'desktop' && (
        <div
          onClick={() => {
            if (isStartMenuOpen) setIsStartMenuOpen(false);
            if (isNotificationFlyoutOpen) setIsNotificationFlyoutOpen(false);
          }}
          className="flex-1 w-full flex flex-col overflow-hidden relative"
        >
          {/* Subtle Bottom-Right Fullscreen Symbol Control (Quiet corner, no overlap) */}
          <div className="absolute bottom-11 right-2 z-[9970]">
            <button
              onClick={toggleFullscreen}
              className="p-1 bg-[#060a18]/90 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-cyan-300 text-[10px] font-mono rounded flex items-center justify-center cursor-pointer transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          </div>

          {/* Desktop Icons, Grid, Watermark, Top-Right Objectives HUD */}
          <Desktop
            icons={visibleDesktopIcons}
            selectedIconIds={selectedIconIds}
            onSelectIcon={(id) => setSelectedIconIds([id])}
            onOpenApp={openApp}
            onClearSelection={() => setSelectedIconIds([])}
            act={story.act}
            anomalyLevel={story.anomalyLevel}
            wallpaperTheme={settings.wallpaper}
            storyState={story}
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
              if (url && url.includes('voidnet')) {
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
            storyState={story}
            anomalyLevel={story.anomalyLevel}
            anomalyStability={story.anomalyStability}
            onStabilizePulse={handleStabilizePulse}
            onRunDiagnosticSweep={handleRunDiagnosticSweep}
            onVerifyIntegrity={handleVerifyIntegrity}
            caseFileDiscoveries={story.caseFileDiscoveries || {}}
            objectives={story.objectives || []}
            unlockedEvents={story.unlockedEvents || []}
          />

          {/* Start Menu Drawer */}
          <StartMenu
            isOpen={isStartMenuOpen}
            onClose={() => setIsStartMenuOpen(false)}
            onOpenApp={openApp}
            onShutdown={() => triggerEnding('loop')}
            onReboot={() => {
              setViewMode('boot');
              setWindows([]);
            }}
            onHardReset={handleHardResetGame}
            act={story.act}
            anomalyLevel={story.anomalyLevel}
            unlockedApps={story.unlockedApps || []}
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

          {/* Bottom Taskbar */}
          <Taskbar
            windows={windows}
            activeWindowId={activeWindowId}
            isStartMenuOpen={isStartMenuOpen}
            onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
            onSelectWindow={(id) => {
              const win = windows.find(w => w && w.id === id);
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
              try {
                sound.setVolume(vol);
              } catch {}
            }}
            isMuted={isMuted}
            onToggleMute={() => {
              const next = !isMuted;
              setIsMuted(next);
              try {
                sound.setMuted(next);
              } catch {}
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
            flashMessage={flashMessage}
          />
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <RootErrorBoundary>
      <AppContent />
    </RootErrorBoundary>
  );
};

export default App;
