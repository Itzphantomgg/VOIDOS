export type EventPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface QueuedEvent {
  id: string;
  type: 'story' | 'notification' | 'install' | 'glitch';
  priority: EventPriority;
  payload: any;
  createdAt: number;
}

class EventQueueManager {
  private queue: QueuedEvent[] = [];
  private lastFiredTimestamp: Record<string, number> = {};
  private isProcessing = false;

  public enqueue(event: Omit<QueuedEvent, 'createdAt'>, minIntervalMs = 800): boolean {
    const now = Date.now();
    const lastFired = this.lastFiredTimestamp[event.id] || 0;

    // Throttle repeated triggers
    if (now - lastFired < minIntervalMs) {
      return false;
    }

    this.lastFiredTimestamp[event.id] = now;
    this.queue.push({ ...event, createdAt: now });
    
    // Sort by priority (CRITICAL > HIGH > MEDIUM > LOW)
    const priorityWeights: Record<EventPriority, number> = {
      CRITICAL: 4,
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };
    this.queue.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);

    return true;
  }

  public dequeue(): QueuedEvent | null {
    if (this.queue.length === 0) return null;
    return this.queue.shift() || null;
  }

  public clear() {
    this.queue = [];
    this.lastFiredTimestamp = {};
  }
}

export const eventQueue = new EventQueueManager();
