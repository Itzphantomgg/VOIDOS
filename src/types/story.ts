export type StoryAct = 1 | 2 | 3 | 4;

export type EndingType = 
  | 'escape'
  | 'corruption'
  | 'trust'
  | 'betrayal'
  | 'loop'
  | 'the_operator'
  | 'void_secret'
  | 'acceptance';

export interface SystemEvent {
  id: string; // e.g. "EVENT_001", "EVENT_007", "EVENT_013", "EVENT_027", "EVENT_???"
  title: string;
  description: string;
  unlockedAt?: string;
  isSecret?: boolean;
}

export interface CaseFileEntry {
  id: string;
  category: 'PEOPLE' | 'PROJECTS' | 'LOCATIONS' | 'EVENTS' | 'FILES' | 'PASSWORDS' | 'THEORIES' | 'UNKNOWN';
  title: string;
  subtitle: string;
  content: string;
  unlocked: boolean;
  timestamp?: string;
}

export interface StoryState {
  act: StoryAct;
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
  caseFileDiscoveries: string[]; // Entry IDs
  objectives: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
  }[];
  activeEnding: EndingType | null;
  endingDiscovered: EndingType[];
  logsViewed: string[];
  filesOpened: string[];
  websitesVisited: string[];
  commandsExecuted: string[];
  processesKilled: string[];
  messagesAnswered: string[];
  currentVoidDialogueStep: number;
}
