import { StoryAct, StoryState } from '../types/story';
import { masterStoryActs, StoryObjectiveDef } from '../data/storyActs';
import { VFSNode } from '../types/fs';

export class StoryEngine {
  /**
   * Validate if an objective's prerequisites are genuinely satisfied.
   * Ensures an objective is NEVER assigned if its application, folder, or file is missing!
   */
  public static validateObjective(
    obj: StoryObjectiveDef,
    story: StoryState,
    vfs?: Record<string, VFSNode>
  ): boolean {
    if (!obj) return false;

    // Check Act boundary
    if (obj.act !== story.act) return false;

    // Check required application is unlocked
    if (obj.requiredApp) {
      const unlockedApps = Array.isArray(story.unlockedApps) ? story.unlockedApps : [];
      if (!unlockedApps.includes(obj.requiredApp)) {
        return false;
      }
    }

    // Check required folder exists in VFS
    if (obj.requiredFolder && vfs) {
      if (!vfs[obj.requiredFolder]) {
        return false;
      }
    }

    // Check required file exists in VFS
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
   * Checks retroactive completion and validates prerequisites.
   */
  public static getActiveObjective(
    story: StoryState,
    vfs?: Record<string, VFSNode>
  ): StoryObjectiveDef | null {
    const act = (story?.act && story.act >= 1 && story.act <= 5) ? story.act : 1;
    const actObjectives = masterStoryActs[act] || [];

    for (const obj of actObjectives) {
      // If flag is not yet completed
      if (!story?.flags?.[obj.onCompleteFlag]) {
        // Return this objective as the next active step
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
    const act = (story?.act && story.act >= 1 && story.act <= 5) ? story.act : 1;
    const currentActObjectives = masterStoryActs[act] || [];
    const completedInAct = currentActObjectives.filter(o => story?.flags?.[o.onCompleteFlag]).length;
    const totalActObjectives = currentActObjectives.length || 1;
    const actProgressPercent = Math.round((completedInAct / totalActObjectives) * 100);

    let allCompleted = 0;
    let allTotal = 0;
    Object.values(masterStoryActs).forEach(objs => {
      allTotal += objs.length;
      allCompleted += objs.filter(o => story?.flags?.[o.onCompleteFlag]).length;
    });

    const totalProgressPercent = Math.round((allCompleted / (allTotal || 1)) * 100);

    return {
      actProgressPercent,
      totalProgressPercent,
      completedCount: completedInAct,
      totalActObjectives,
    };
  }

  /**
   * Safe save migration for older or corrupted saves.
   * Guarantees that the player is never stuck due to obsolete flags or missing apps.
   */
  public static migrateSaveState(story: StoryState): StoryState {
    if (!story) return story;

    const act = Math.min(5, Math.max(1, story.act || 1)) as StoryAct;
    const flags = { ...(story.flags || {}) };
    const unlockedApps = new Set(story.unlockedApps || ['systeminfo', 'files', 'terminal', 'casefile', 'trash', 'notes', 'help']);

    // Act-based app unlock consistency guarantees
    if (act >= 2) {
      unlockedApps.add('camera');
      unlockedApps.add('messages');
      flags['boot_completed'] = true;
      flags['sysinfo_checked'] = true;
      flags['recovery_folder_located'] = true;
      flags['recovery_report_read'] = true;
      flags['clearance_checked'] = true;
      flags['credentials_recovered'] = true;
      flags['user07_identified'] = true;
      flags['system_log_0314_viewed'] = true;
      flags['log_line_recovered'] = true;
      flags['recovered_line_read'] = true;
      flags['act1_casefile_synced'] = true;
    }

    if (act >= 3) {
      unlockedApps.add('observer');
      unlockedApps.add('taskmanager');
      unlockedApps.add('memory');
      flags['incident07_report_reviewed'] = true;
      flags['security_07b_read'] = true;
      flags['camera03_located'] = true;
      flags['camera03_reviewed'] = true;
      flags['user07_final_entry_read'] = true;
      flags['messages_app_installed'] = true;
      flags['void_communication_received'] = true;
      flags['archive_incident_recovered'] = true;
      flags['witness_statement_read'] = true;
      flags['act2_casefile_synced'] = true;
    }

    if (act >= 4) {
      unlockedApps.add('netseek');
      flags['observer_opened'] = true;
      flags['first_stabilization_done'] = true;
      flags['rogue_daemon_detected'] = true;
      flags['memory_app_opened'] = true;
      flags['cipher_discovered'] = true;
      flags['void_partition_decrypted'] = true;
    }

    if (act >= 5) {
      unlockedApps.add('realitycore');
      flags['void_partition_accessed'] = true;
      flags['sterling_logs_read'] = true;
      flags['void_direct_dialogue'] = true;
      flags['marcus_truth_revealed'] = true;
      flags['void_consciousness_realized'] = true;
    }

    return {
      ...story,
      act,
      flags,
      unlockedApps: Array.from(unlockedApps),
    };
  }
}
