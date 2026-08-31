export type StoryAct = 1 | 2 | 3 | 4;

export type StoryStage = 
  | 'STAGE_1_RECOVERY'
  | 'STAGE_2_INCIDENT'
  | 'STAGE_3_CONTACT'
  | 'STAGE_4_REVELATION'
  | 'STAGE_5_DECISION';

export type EndingType = 
  | 'escape'
  | 'corruption'
  | 'trust'
  | 'betrayal'
  | 'loop'
  | 'the_operator'
  | 'void_secret'
  | 'acceptance';

export type KnowledgeLevel = 'UNKNOWN' | 'PARTIALLY_KNOWN' | 'KNOWN';

export interface SystemEvent {
  id: string; // e.g. "EVENT_001", "EVENT_007", "EVENT_013", "EVENT_027", "EVENT_???"
  title: string;
  description: string;
  unlockedAt?: string;
  isSecret?: boolean;
}

export interface CaseFileEntry {
  id: string;
  category: 'PEOPLE' | 'PROJECTS' | 'EVENTS' | 'LOCATIONS' | 'FILES' | 'THEORIES' | 'UNKNOWN';
  title: string;
  subtitle: string;
  status: string; // e.g. "TERMINATED", "ANOMALOUS", "UNKNOWN"
  date?: string;
  incidentTimestamp?: string;
  knowledgeLevel: KnowledgeLevel;
  summary: string;
  detailedContent: string;
  discoveredAt?: string;
}

export interface GameObjective {
  id: string;
  stepNumber: number;
  title: string;
  shortTask: string;
  hint: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  category?: 'SYSTEM' | 'INVESTIGATION' | 'DECRYPTION' | 'RESOLUTION';
}

export interface StoryState {
  act: StoryAct;
  stage: StoryStage;
  anomalyLevel: number; // 0 to 100
  playerName: string;
  role: string; // "RECOVERY_OPERATOR"
  flags: Record<string, boolean>;
  counters: {
    terminalCommands: number;
    filesOpened: number;
    emailsRead: number;
    glitchEncounters: number;
  };
  unlockedEvents: string[]; // Event IDs
  caseFileDiscoveries: Record<string, KnowledgeLevel>; // entryId -> KnowledgeLevel
  objectives: GameObjective[];
  activeEnding: EndingType | null;
  endingDiscovered: EndingType[];
  logsViewed: string[];
  filesOpened: string[];
  websitesVisited: string[];
  commandsExecuted: string[];
  processesKilled: string[];
  messagesAnswered: string[];
  currentVoidDialogueStep: number;
  unlockedApps: string[];
  unlockedFolders: string[];
}
