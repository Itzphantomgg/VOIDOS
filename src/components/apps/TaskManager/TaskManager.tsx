import React, { useState, useEffect } from 'react';
import { ProcessItem } from '../../../types/apps';
import { sound } from '../../../audio/soundEngine';
import { Activity, Cpu, HardDrive, ShieldAlert, XCircle } from 'lucide-react';

interface TaskManagerProps {
  act: number;
  anomalyLevel: number;
  onKillHostileProcess: (name: string) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ act, anomalyLevel, onKillHostileProcess }) => {
  const [tab, setTab] = useState<'processes' | 'performance'>('processes');
  const [selectedPid, setSelectedPid] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [processes, setProcesses] = useState<ProcessItem[]>([
    { pid: 104, name: 'system.exe', cpu: 0.4, memory: 4820, user: 'SYSTEM', status: 'RUNNING', description: 'VOID//OS Kernel Coordinator', canTerminate: false },
    { pid: 218, name: 'explorer.exe', cpu: 1.2, memory: 18450, user: 'GUEST', status: 'RUNNING', description: 'Desktop Shell & Window Manager', canTerminate: true },
    { pid: 304, name: 'terminal.exe', cpu: 0.2, memory: 3410, user: 'GUEST', status: 'RUNNING', description: 'Diagnostic Shell Console', canTerminate: true },
    { pid: 412, name: 'browser.exe', cpu: 2.1, memory: 28900, user: 'GUEST', status: 'RUNNING', description: 'NetSeek Intranet Client', canTerminate: true },
    { pid: 520, name: 'audio_synth.exe', cpu: 0.8, memory: 6120, user: 'SYSTEM', status: 'RUNNING', description: 'WebAudio Procedural Synthesizer', canTerminate: false },
  ]);

  // Inject strange processes on Act 2/3
  useEffect(() => {
    setProcesses(prev => {
      let updated = [...prev];
      if (act >= 2 && !updated.some(p => p.name === 'observer.exe')) {
        updated.push({
          pid: 666,
          name: 'observer.exe',
          cpu: 13.4,
          memory: 666,
          user: '???',
          status: 'ANOMALOUS',
          description: 'Human-Computer Interaction Telemetry Observer',
          isHostile: true,
          canTerminate: false,
          resistanceCount: 0,
        });
      }
      if (act >= 3 && !updated.some(p => p.name === 'void.exe')) {
        updated.push({
          pid: 0,
          name: 'void.exe',
          cpu: 88.5,
          memory: 16384000,
          user: 'VOID',
          status: 'IMMORTAL',
          description: 'Autonomous Cognitive Kernel Consciousness',
          isHostile: true,
          canTerminate: false,
          resistanceCount: 0,
        });
      }
      return updated;
    });
  }, [act]);

  // Live CPU fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses(prev =>
        prev.map(p => {
          if (p.name === 'void.exe') return { ...p, cpu: 85 + Math.random() * 14 };
          if (p.name === 'observer.exe') return { ...p, cpu: 10 + Math.random() * 8 };
          return {
            ...p,
            cpu: Math.max(0.1, +(p.cpu + (Math.random() * 0.6 - 0.3)).toFixed(1)),
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleKillProcess = () => {
    if (!selectedPid && selectedPid !== 0) return;
    sound.playClick();

    const target = processes.find(p => p.pid === selectedPid);
    if (!target) return;

    if (target.isHostile) {
      sound.playWarning();
      onKillHostileProcess(target.name);
      setStatusMessage(`ERROR: Access Denied. Process '${target.name}' is bound to kernel.`);
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    if (!target.canTerminate) {
      sound.playError();
      setStatusMessage(`Cannot terminate protected system process: ${target.name}`);
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    setProcesses(prev => prev.filter(p => p.pid !== selectedPid));
    setSelectedPid(null);
    setStatusMessage(`Process ${target.name} (PID ${target.pid}) terminated.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const totalCpu = Math.min(100, processes.reduce((acc, p) => acc + p.cpu, 0)).toFixed(1);

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Tabs */}
      <div className="bg-[#0b1024] px-2 pt-2 border-b border-slate-800 flex space-x-1">
        <button
          onClick={() => {
            sound.playClick();
            setTab('processes');
          }}
          className={`px-3 py-1 text-xs font-bold border-t border-x rounded-t-sm transition-colors ${
            tab === 'processes'
              ? 'bg-[#070b1a] text-cyan-300 border-cyan-500 shadow-retro-cyan'
              : 'bg-[#0e162f] text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Processes ({processes.length})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setTab('performance');
          }}
          className={`px-3 py-1 text-xs font-bold border-t border-x rounded-t-sm transition-colors ${
            tab === 'performance'
              ? 'bg-[#070b1a] text-cyan-300 border-cyan-500 shadow-retro-cyan'
              : 'bg-[#0e162f] text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Performance
        </button>
      </div>

      {/* Main Tab Content */}
      {tab === 'processes' ? (
        <div className="flex-1 flex flex-col overflow-hidden p-2">
          <div className="flex-1 overflow-y-auto border border-slate-800 rounded bg-[#040712]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#090e21] text-[10px] text-slate-400">
                  <th className="py-1 px-2 font-bold w-12">PID</th>
                  <th className="py-1 px-2 font-bold">PROCESS NAME</th>
                  <th className="py-1 px-2 font-bold w-16 text-right">CPU</th>
                  <th className="py-1 px-2 font-bold w-24 text-right">MEMORY</th>
                  <th className="py-1 px-2 font-bold w-20">USER</th>
                  <th className="py-1 px-2 font-bold w-24">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-[11px]">
                {processes.map(proc => {
                  const isSelected = selectedPid === proc.pid;
                  return (
                    <tr
                      key={proc.pid}
                      onClick={() => {
                        sound.playClick();
                        setSelectedPid(proc.pid);
                      }}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-950/80 text-cyan-300 font-bold border-l-2 border-cyan-400'
                          : proc.isHostile
                          ? 'bg-pink-950/20 text-pink-400 hover:bg-pink-950/40'
                          : 'hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <td className="py-1 px-2 font-mono text-slate-400">{proc.pid}</td>
                      <td className="py-1 px-2 flex items-center space-x-1.5 truncate">
                        {proc.isHostile ? (
                          <ShieldAlert size={12} className="text-pink-500 animate-pulse" />
                        ) : (
                          <Activity size={12} className="text-cyan-500" />
                        )}
                        <span>{proc.name}</span>
                      </td>
                      <td className="py-1 px-2 text-right font-mono">{proc.cpu}%</td>
                      <td className="py-1 px-2 text-right font-mono">
                        {proc.memory >= 1024 ? `${(proc.memory / 1024).toFixed(1)} MB` : `${proc.memory} KB`}
                      </td>
                      <td className="py-1 px-2 text-slate-400">{proc.user}</td>
                      <td className="py-1 px-2">
                        <span
                          className={`text-[9px] px-1 py-0.5 rounded ${
                            proc.status === 'IMMORTAL' || proc.status === 'ANOMALOUS'
                              ? 'bg-pink-950 text-pink-300 border border-pink-700 font-bold'
                              : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {proc.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex justify-between items-center text-xs">
            <div className="text-[11px] text-pink-400 font-bold truncate">
              {statusMessage || (selectedPid !== null ? `Selected PID: ${selectedPid}` : 'Select a process')}
            </div>
            <button
              onClick={handleKillProcess}
              disabled={selectedPid === null}
              className="px-3 py-1 bg-red-950 hover:bg-red-900 disabled:opacity-40 text-red-200 border border-red-700 rounded font-bold transition-colors cursor-pointer"
            >
              End Process
            </button>
          </div>
        </div>
      ) : (
        /* Performance Tab */
        <div className="flex-1 p-3 space-y-4 overflow-y-auto">
          {/* CPU Graph Box */}
          <div className="p-3 bg-[#040712] border border-cyan-900/60 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                <Cpu size={14} />
                <span>CPU UTILIZATION</span>
              </span>
              <span className="text-cyan-300 font-mono font-bold text-sm">{totalCpu}%</span>
            </div>
            <div className="w-full bg-slate-900 h-6 border border-cyan-800/40 rounded overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-500"
                style={{ width: `${Math.min(100, +totalCpu)}%` }}
              />
            </div>
          </div>

          {/* Memory Graph Box */}
          <div className="p-3 bg-[#040712] border border-purple-900/60 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-purple-400 font-bold flex items-center space-x-1.5">
                <HardDrive size={14} />
                <span>COGNITIVE RAM ALLOCATION</span>
              </span>
              <span className="text-purple-300 font-mono font-bold text-sm">
                {act >= 3 ? '15.4 / 16.0 GB (96%)' : '4.2 / 16.0 GB (26%)'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-6 border border-purple-800/40 rounded overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
                style={{ width: act >= 3 ? '96%' : '26%' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer System Status Bar */}
      <div className="bg-[#050814] px-3 py-1 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>Processes: {processes.length}</span>
        <span>CPU Usage: {totalCpu}%</span>
        <span>Physical Memory: 16384 MB</span>
      </div>
    </div>
  );
};
