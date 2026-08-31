import { StoryState, KnowledgeLevel, GameObjective } from '../types/story';
import { VFSNode } from '../types/fs';
import { OSSettings } from '../types/os';
import { initialStoryState, defaultGameObjectives } from './storyStore';
import { initialVFSNodes } from '../data/initialFileSystem';

const SAVE_KEY = 'VOID_OS_SAVE_V1';

export interface PersistentSaveData {
  story?: StoryState;
  vfs?: Record<string, VFSNode>;
  settings?: OSSettings;
  savedAt?: string;
}

export function saveGameState(state: {
  story: StoryState;
  vfs: Record<string, VFSNode>;
  settings: OSSettings;
}) {
  try {
    const payload = JSON.stringify({
      story: state.story,
      vfs: state.vfs,
      settings: state.settings,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(SAVE_KEY, payload);
  } catch (err) {
    console.error('[VOID//OS] Failed to save game state to localStorage:', err);
  }
}

export function loadGameState(): PersistentSaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    const sanitized: PersistentSaveData = {};

    // 1. Sanitize & Migrate Story State
    if (parsed.story && typeof parsed.story === 'object') {
      const s = parsed.story;

      // Migrate caseFileDiscoveries (Array -> Record)
      let sanitizedDiscoveries: Record<string, KnowledgeLevel> = { ...initialStoryState.caseFileDiscoveries };
      if (Array.isArray(s.caseFileDiscoveries)) {
        s.caseFileDiscoveries.forEach((id: string) => {
          if (typeof id === 'string') {
            sanitizedDiscoveries[id] = 'KNOWN';
          }
        });
      } else if (s.caseFileDiscoveries && typeof s.caseFileDiscoveries === 'object') {
        sanitizedDiscoveries = {
          ...sanitizedDiscoveries,
          ...s.caseFileDiscoveries,
        };
      }

      // Migrate & Reconcile Objectives
      let sanitizedObjectives: GameObjective[] = defaultGameObjectives.map(def => {
        if (Array.isArray(s.objectives)) {
          const savedObj = s.objectives.find((o: any) => o && o.id === def.id);
          if (savedObj) {
            return {
              ...def,
              isCompleted: Boolean(savedObj.isCompleted),
            };
          }
        }
        return { ...def };
      });

      sanitized.story = {
        ...initialStoryState,
        ...s,
        act: (s.act >= 1 && s.act <= 4 ? s.act : 1) as any,
        stage: s.stage || 'STAGE_1_RECOVERY',
        anomalyLevel: typeof s.anomalyLevel === 'number' ? Math.max(0, Math.min(100, s.anomalyLevel)) : 0,
        playerName: typeof s.playerName === 'string' ? s.playerName : 'RECOVERY_OPERATOR',
        role: typeof s.role === 'string' ? s.role : 'RECOVERY_OPERATOR',
        caseFileDiscoveries: sanitizedDiscoveries,
        objectives: sanitizedObjectives,
        unlockedEvents: Array.isArray(s.unlockedEvents) ? s.unlockedEvents : [],
        endingDiscovered: Array.isArray(s.endingDiscovered) ? s.endingDiscovered : [],
        flags: s.flags && typeof s.flags === 'object' ? s.flags : {},
        counters: s.counters && typeof s.counters === 'object' ? s.counters : initialStoryState.counters,
      };
    }

    // 2. Sanitize & Merge VFS State
    if (parsed.vfs && typeof parsed.vfs === 'object' && !Array.isArray(parsed.vfs)) {
      sanitized.vfs = {
        ...initialVFSNodes,
        ...parsed.vfs,
      };
    }

    // 3. Sanitize Settings
    if (parsed.settings && typeof parsed.settings === 'object') {
      sanitized.settings = {
        theme: parsed.settings.theme || 'void-cyan',
        wallpaper: parsed.settings.wallpaper || 'void-grid',
        crtScanlines: parsed.settings.crtScanlines !== false,
        crtCurvature: parsed.settings.crtCurvature !== false,
        crtBloom: parsed.settings.crtBloom !== false,
        glitchIntensity: typeof parsed.settings.glitchIntensity === 'number' ? parsed.settings.glitchIntensity : 1,
        masterVolume: typeof parsed.settings.masterVolume === 'number' ? parsed.settings.masterVolume : 0.7,
        soundEffects: parsed.settings.soundEffects !== false,
        ambientHum: Boolean(parsed.settings.ambientHum),
        clockFormat24: parsed.settings.clockFormat24 !== false,
        realityMode: Boolean(parsed.settings.realityMode),
        customCursor: false, // strictly enforce false
        showObjectives: parsed.settings.showObjectives !== false,
      };
    }

    return sanitized;
  } catch (err) {
    console.error('[VOID//OS] Corrupted save data detected. Using clean state:', err);
    return null;
  }
}

export function resetGameState() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    console.error('[VOID//OS] Failed to clear save data:', err);
  }
}
