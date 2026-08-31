import React from 'react';
import { OSWindowState, AppId } from '../../types/os';
import { VFSNode } from '../../types/fs';
import { GameObjective, KnowledgeLevel, StoryStage } from '../../types/story';
import { OSWindow } from './OSWindow';
import { AppErrorBoundary } from '../common/ErrorBoundary';
import { FileExplorer } from '../apps/FileExplorer/FileExplorer';
import { FilePreview } from '../apps/FileExplorer/FilePreview';
import { Terminal } from '../apps/Terminal/Terminal';
import { TaskManager } from '../apps/TaskManager/TaskManager';
import { Browser } from '../apps/Browser/Browser';
import { Messages } from '../apps/Messages/Messages';
import { Mail } from '../apps/Mail/Mail';
import { Notes } from '../apps/Notes/Notes';
import { MediaPlayer } from '../apps/MediaPlayer/MediaPlayer';
import { SystemInfo } from '../apps/SystemInfo/SystemInfo';
import { SystemLogs } from '../apps/SystemLogs/SystemLogs';
import { Settings } from '../apps/Settings/Settings';
import { Trash } from '../apps/Trash/Trash';
import { CaseFile } from '../apps/CaseFile/CaseFile';
import { RealityCore } from '../apps/RealityCore/RealityCore';
import { CameraApp } from '../apps/Camera/CameraApp';
import { MemoryApp } from '../apps/Memory/MemoryApp';
import { ObserverApp } from '../apps/Observer/ObserverApp';
import { ObjectivesModal } from '../apps/Objectives/ObjectivesModal';
import { WikiApp } from '../apps/Wiki/WikiApp';
import { AchievementsApp } from '../apps/Achievements/AchievementsApp';
import { SecurityApp } from '../apps/Security/SecurityApp';
import { DiagnosticsApp } from '../apps/Diagnostics/DiagnosticsApp';

interface WindowManagerProps {
  windows: OSWindowState[];
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateSize: (id: string, w: number, h: number) => void;
  // App Props & Handlers
  vfs: Record<string, VFSNode>;
  currentVfsPath: string;
  onNavigateVfs: (path: string) => void;
  onOpenVfsFile: (node: VFSNode) => void;
  onCreateVfsFile: (parent: string, name: string, content?: string) => void;
  onCreateVfsFolder: (parent: string, name: string) => void;
  onDeleteVfsFile: (path: string) => void;
  onRestoreVfsFile: (path: string) => void;
  onEmptyTrash: () => void;
  onUnlockVoid: (password: string) => boolean;
  onVisitWebsite: (url: string) => void;
  onTriggerEvent: (eventId: string) => void;
  advanceAct: (act: any) => void;
  onTriggerEnding: (ending: any) => void;
  setAnomalyLevel: (fn: (prev: number) => number) => void;
  openApp: (appId: AppId, data?: any) => void;
  completeObjective: (objId: string) => void;
  unlockCaseFileEntry: (entryId: string, level?: KnowledgeLevel) => void;
  onKillHostileProcess: (name: string) => void;
  settings: any;
  onUpdateSettings: (newSettings: any) => void;
  onResetGame: () => void;
  playerName: string;
  role: string;
  act: number;
  stage: StoryStage;
  anomalyLevel: number;
  anomalyStability?: number;
  onStabilizePulse?: () => void;
  onRunDiagnosticSweep?: () => void;
  onVerifyIntegrity?: () => void;
  caseFileDiscoveries: Record<string, KnowledgeLevel>;
  objectives: GameObjective[];
  unlockedEvents?: string[];
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows = [],
  activeWindowId,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onUpdatePosition,
  onUpdateSize,
  vfs = {},
  currentVfsPath = '/Documents',
  onNavigateVfs,
  onOpenVfsFile,
  onCreateVfsFile,
  onCreateVfsFolder,
  onDeleteVfsFile,
  onRestoreVfsFile,
  onEmptyTrash,
  onUnlockVoid,
  onVisitWebsite,
  onTriggerEvent,
  advanceAct,
  onTriggerEnding,
  setAnomalyLevel,
  openApp,
  completeObjective,
  unlockCaseFileEntry,
  onKillHostileProcess,
  settings,
  onUpdateSettings,
  onResetGame,
  playerName,
  role,
  act,
  stage,
  anomalyLevel,
  anomalyStability = 100,
  onStabilizePulse,
  onRunDiagnosticSweep,
  onVerifyIntegrity,
  caseFileDiscoveries = {},
  objectives = [],
  unlockedEvents = [],
}) => {
  const renderAppContent = (win: OSWindowState) => {
    if (!win) return null;

    switch (win.appId) {
      case 'objectives':
        return (
          <ObjectivesModal
            objectives={objectives}
            onClose={() => onCloseWindow(win.id)}
          />
        );

      case 'casefile':
        return (
          <CaseFile
            discoveries={caseFileDiscoveries}
            stage={stage}
            act={act}
          />
        );

      case 'wiki':
        return <WikiApp act={act} />;

      case 'achievements':
        return <AchievementsApp unlockedEvents={unlockedEvents} act={act} />;

      case 'security':
        return <SecurityApp act={act} anomalyLevel={anomalyLevel} />;

      case 'diagnostics':
        return <DiagnosticsApp act={act} anomalyLevel={anomalyLevel} />;

      case 'files':
        return (
          <FileExplorer
            vfs={vfs}
            currentPath={currentVfsPath}
            onNavigate={onNavigateVfs}
            onOpenFile={onOpenVfsFile}
            onCreateFile={onCreateVfsFile}
            onCreateFolder={onCreateVfsFolder}
            onDeleteFile={onDeleteVfsFile}
            onUnlockVoid={onUnlockVoid}
            act={act}
          />
        );

      case 'camera':
        return <CameraApp />;

      case 'memory':
        return <MemoryApp />;

      case 'observer':
        return (
          <ObserverApp
            stability={anomalyStability}
            onStabilizePulse={onStabilizePulse}
            onRunDiagnosticSweep={onRunDiagnosticSweep}
            onVerifyIntegrity={onVerifyIntegrity}
          />
        );

      case 'textviewer':
      case 'imageviewer':
      case 'hexviewer':
        return (
          <FilePreview
            node={win.customData?.node}
            onClose={() => onCloseWindow(win.id)}
          />
        );

      case 'terminal':
        return (
          <Terminal
            cwd={currentVfsPath}
            setCwd={onNavigateVfs}
            vfs={vfs}
            unlockVoidDir={() => onUnlockVoid('NULL_RECURSION')}
            triggerEvent={onTriggerEvent}
            advanceAct={advanceAct}
            triggerEnding={onTriggerEnding}
            setAnomalyLevel={setAnomalyLevel}
            openApp={openApp}
            completeObjective={completeObjective}
            unlockCaseFileEntry={unlockCaseFileEntry}
            playerName={playerName}
            role={role}
            act={act}
          />
        );

      case 'taskmanager':
        return (
          <TaskManager
            act={act}
            anomalyLevel={anomalyLevel}
            onKillHostileProcess={onKillHostileProcess}
          />
        );

      case 'browser':
        return <Browser onVisitWebsite={onVisitWebsite} act={act} />;

      case 'messages':
        return (
          <Messages
            onTriggerEvent={onTriggerEvent}
            advanceAct={advanceAct}
            setAnomalyLevel={setAnomalyLevel}
            act={act}
          />
        );

      case 'mail':
        return (
          <Mail
            onOpenAttachment={(path) => {
              if (vfs[path]) onOpenVfsFile(vfs[path]);
            }}
            onTriggerEvent={onTriggerEvent}
            act={act}
          />
        );

      case 'notes':
        return <Notes act={act} />;

      case 'mediaplayer':
        return <MediaPlayer initialTrackId={win.customData?.trackId} act={act} />;

      case 'systeminfo':
        return <SystemInfo act={act} anomalyLevel={anomalyLevel} />;

      case 'systemlogs':
        return <SystemLogs act={act} />;

      case 'settings':
        return (
          <Settings
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            onResetGame={onResetGame}
            act={act}
          />
        );

      case 'trash':
        return (
          <Trash
            vfs={vfs}
            onRestoreFile={onRestoreVfsFile}
            onPermanentDelete={onDeleteVfsFile}
            onEmptyTrash={onEmptyTrash}
            onOpenFile={onOpenVfsFile}
            act={act}
          />
        );

      case 'realitycore':
        return (
          <RealityCore
            onTriggerEnding={onTriggerEnding}
            act={act}
            anomalyLevel={anomalyLevel}
          />
        );

      default:
        return (
          <div className="p-4 text-slate-400 font-mono text-xs">
            Application '{win.appId}' loaded.
          </div>
        );
    }
  };

  const validWindows = Array.isArray(windows) ? windows : [];

  return (
    <>
      {validWindows.map((win) => {
        if (!win || !win.id) return null;
        return (
          <OSWindow
            key={win.id}
            window={win}
            isActive={win.id === activeWindowId}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
            onUpdatePosition={(x, y) => onUpdatePosition(win.id, x, y)}
            onUpdateSize={(w, h) => onUpdateSize(win.id, w, h)}
          >
            <AppErrorBoundary appName={win.title || win.appId} onClose={() => onCloseWindow(win.id)}>
              {renderAppContent(win)}
            </AppErrorBoundary>
          </OSWindow>
        );
      })}
    </>
  );
};
