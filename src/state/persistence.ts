const SAVE_KEY = 'VOID_OS_SAVE_V1';

export function saveGameState(state: any) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      ...state,
      savedAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Failed to save VOID//OS state to localStorage', err);
  }
}

export function loadGameState(): any | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load VOID//OS state', err);
    return null;
  }
}

export function resetGameState() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    console.error('Failed to clear VOID//OS state', err);
  }
}
