import { StoryState, StoryAct, EndingType } from '../types/story';

export const initialStoryState: StoryState = {
  act: 1,
  anomalyLevel: 5,
  playerName: 'Paarth', // Player identity discovered through ARG
  flags: {},
  counters: {
    terminalCommands: 0,
    filesOpened: 0,
    emailsRead: 0,
    glitchEncounters: 0,
  },
  unlockedEvents: ['EVENT_001'],
  activeEnding: null,
  endingDiscovered: [],
  logsViewed: [],
  filesOpened: [],
  websitesVisited: [],
  commandsExecuted: [],
  processesKilled: [],
  messagesAnswered: [],
  currentVoidDialogueStep: 0,
};
