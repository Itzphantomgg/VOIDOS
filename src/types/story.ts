export type StoryAct = 1 | 2 | 3 | 4;

export type EndingType = 
  | 'escape'
  | 'corruption'
  | 'loop'
  | 'truth'
  | 'acceptance'
  | 'secret';

export interface SystemEvent {
  id: string; // e.g. "EVENT_001", "EVENT_007", "EVENT_013", "EVENT_???"
  title: string;
  description: string;
  unlockedAt?: string;
  isSecret?: boolean;
}

export interface StoryState {
  act: StoryAct;
  anomalyLevel: number; // 0 to 100
  playerName: string;
  flags: Record<string, boolean>;
  counters: Record<string, number>;
  unlockedEvents: string[]; // Event IDs
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
