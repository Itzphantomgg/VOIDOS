import { StoryAct, StoryState } from '../types/story';
import { masterStoryActs, StoryObjectiveDef } from '../data/storyActs';
import { VFSNode } from '../types/fs';

export class StoryEngine {
  /**
   * Validate if an objective's prerequisites are genuinely satisfied.
   * Ensures an objective is NEVER assigned if its application or folder is locked!
   */
  public static validateObjective(
    obj: StoryObjectiveDef,
    story: StoryState,
    vfs?: Record<string, VFSNode>
  ): boolean {
    if (!obj) return false;

    // Check Act boundary
    if (obj.act !== story.act) return false;

    // Check required application
    if (obj.requiredApp) {
      const unlockedApps = Array.isArray(story.unlockedApps) ? story.unlockedApps : [];
      if (!unlockedApps.includes(obj.requiredApp)) {
        return false;
      }
    }

    // Check required folder in VFS
    if (obj.requiredFolder && vfs) {
      if (!vfs[obj.requiredFolder]) {
        return false;
      }
    }

    // Check required file in VFS
    if (obj.requiredFile && vfs) {
      if (!vfs[obj.requiredFile]) {
        return false;
      }
    }

    // Check prerequisite story flag
    if (obj.requiredFlag && !story.flags?.[obj.requiredFlag]) {
      return false;
    }

    return true;
  }

  /**
   * Returns the single authoritative active objective for the current Act.
   */
  public static getActiveObjective(
    story: StoryState,
    vfs?: Record<string, VFSNode>
  ): StoryObjectiveDef | null {
    const actObjectives = masterStoryActs[story.act] || [];

    for (const obj of actObjectives) {
      // If flag is not yet completed
      if (!story.flags?.[obj.onCompleteFlag]) {
        return obj;
      }
    }

    // All objectives in current act are completed!
    return actObjectives[actObjectives.length - 1] || null;
  }

  /**
   * Checks if all objectives in the given Act have been completed.
   */
  public static isActComplete(act: StoryAct, flags: Record<string, boolean>): boolean {
    const actObjectives = masterStoryActs[act] || [];
    if (actObjectives.length === 0) return false;
    return actObjectives.every(obj => Boolean(flags?.[obj.onCompleteFlag]));
  }

  /**
   * Calculates overall story progress percentage.
   */
  public static calculateProgress(story: StoryState): {
    actProgressPercent: number;
    totalProgressPercent: number;
    completedCount: number;
    totalActObjectives: number;
  } {
    const currentActObjectives = masterStoryActs[story.act] || [];
    const completedInAct = currentActObjectives.filter(o => story.flags?.[o.onCompleteFlag]).length;
    const totalActObjectives = currentActObjectives.length || 1;
    const actProgressPercent = Math.round((completedInAct / totalActObjectives) * 100);

    let allCompleted = 0;
    let allTotal = 0;
    Object.values(masterStoryActs).forEach(objs => {
      allTotal += objs.length;
      allCompleted += objs.filter(o => story.flags?.[o.onCompleteFlag]).length;
    });

    const totalProgressPercent = Math.round((allCompleted / (allTotal || 1)) * 100);

    return {
      actProgressPercent,
      totalProgressPercent,
      completedCount: completedInAct,
      totalActObjectives,
    };
  }
}
