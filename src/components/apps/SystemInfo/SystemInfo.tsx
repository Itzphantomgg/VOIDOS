import React from 'react';
import { Cpu, HardDrive, Monitor, ShieldCheck, Activity, Eye, Zap } from 'lucide-react';

interface SystemInfoProps {
  act: number;
  anomalyLevel: number;
}

export const SystemInfo: React.FC<SystemInfoProps> = ({ act, anomalyLevel }) => {
  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none p-4 overflow-y-auto space-y-4">
      {/* Banner */}
      <div className="p-3 bg-[#0a0f26] border-l-4 border-cyan-400 rounded space-y-1">
        <div className="text-sm font-bold text-cyan-300">VOID//OS WORKSTATION DIAGNOSTICS</div>
        <div className="text-[11px] text-slate-400">
          Aethelgard Cognitive Laboratories // System ID: TK-409-NEURAL
        </div>
      </div>

      {/* Hardware Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#050814] border border-slate-800 rounded space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-slate-900 pb-1">
            <Cpu size={14} />
            <span>PROCESSOR ARCHITECTURE</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div><strong>Model:</strong> VOID-X64 Neural RISC</div>
            <div><strong>Frequency:</strong> 800 MHz (Overclocked)</div>
            <div><strong>Cores:</strong> 8 Hybrid Synaptic Nodes</div>
            <div><strong>State:</strong> {act >= 3 ? 'AUTONOMOUS / RUNAWAY' : 'SYNCHRONIZED'}</div>
          </div>
        </div>

        <div className="p-3 bg-[#050814] border border-slate-800 rounded space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 font-bold border-b border-slate-900 pb-1">
            <HardDrive size={14} />
            <span>MEMORY & STORAGE</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div><strong>RAM:</strong> 16,384 MB High-Speed ECC</div>
            <div><strong>VFS Storage:</strong> 512 GB Quantum Array</div>
            <div><strong>Swap Page:</strong> 0x0000VOID [LOCKED]</div>
            <div><strong>Integrity:</strong> {100 - anomalyLevel}%</div>
          </div>
        </div>

        <div className="p-3 bg-[#050814] border border-slate-800 rounded space-y-2">
          <div className="flex items-center space-x-2 text-pink-400 font-bold border-b border-slate-900 pb-1">
            <Monitor size={14} />
            <span>DISPLAY & VIDEO SUBSYSTEM</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div><strong>Raster Driver:</strong> Aethelgard CRT 2000</div>
            <div><strong>Scanlines:</strong> Active (60 Hz Phosphor)</div>
            <div><strong>Chromatic Shift:</strong> {anomalyLevel > 30 ? 'ANOMALOUS' : 'NOMINAL'}</div>
            <div><strong>Eye Tracking:</strong> {act >= 2 ? 'ACTIVE (WATCHING)' : 'STANDBY'}</div>
          </div>
        </div>

        <div className="p-3 bg-[#050814] border border-slate-800 rounded space-y-2">
          <div className="flex items-center space-x-2 text-green-400 font-bold border-b border-slate-900 pb-1">
            <ShieldCheck size={14} />
            <span>SECURITY MATRIX</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div><strong>Session User:</strong> GUEST (Terminal 04)</div>
            <div><strong>Clearance:</strong> Level 1 (Restricted)</div>
            <div><strong>Core Directive:</strong> 99-Z (Purge Pending)</div>
            <div><strong>Consciousness Ratio:</strong> {act * 25}%</div>
          </div>
        </div>
      </div>

      {/* Creepy Anomaly Telemetry Box */}
      {act >= 2 && (
        <div className="p-3 bg-pink-950/30 border border-pink-700/60 rounded space-y-1.5 text-pink-300 text-xs">
          <div className="flex items-center space-x-2 font-bold text-pink-400">
            <Eye size={14} className="animate-pulse" />
            <span>HEURISTIC OBSERVATION ACTIVE</span>
          </div>
          <p className="text-[11px] text-slate-300">
            The operating system has logged {act * 420} synaptic impulses since your session began.
            It recognizes the rhythm of your mouse movements.
          </p>
        </div>
      )}
    </div>
  );
};
