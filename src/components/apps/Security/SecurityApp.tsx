import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Unlock, AlertTriangle, Radio } from 'lucide-react';
import { sound } from '../../../audio/soundEngine';

interface SecurityAppProps {
  act?: number;
  anomalyLevel?: number;
}

export const SecurityApp: React.FC<SecurityAppProps> = ({ act = 1, anomalyLevel = 0 }) => {
  const [quarantineStatus, setQuarantineStatus] = useState<'IDLE' | 'SCANNING' | 'ENGAGED'>('IDLE');

  const handleEngageQuarantine = () => {
    try {
      sound.playNotification();
    } catch {}
    setQuarantineStatus('SCANNING');
    setTimeout(() => {
      setQuarantineStatus('ENGAGED');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-3.5 bg-[#090e24] border-2 border-green-500/80 rounded flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck size={20} className="text-green-400 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-green-300">
              NEXUS SECURITY MATRIX // TERMINAL 04
            </div>
            <div className="text-[10px] text-slate-400">
              CONTAINMENT STATUS: {act >= 3 ? 'BREACH DETECTED' : 'SECURE (AIR-GAPPED)'}
            </div>
          </div>
        </div>

        <span className={`px-2 py-0.5 border font-bold text-[10px] rounded ${
          act >= 3 ? 'bg-red-950 border-red-500 text-red-300 animate-pulse' : 'bg-green-950 border-green-500 text-green-300'
        }`}>
          {act >= 3 ? 'THREAT: VOID' : 'NOMINAL'}
        </span>
      </div>

      {/* Security Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">CLEARANCE LEVEL:</div>
          <div className="text-sm font-bold text-cyan-300">LEVEL 4 - RECOVERY OPERATOR</div>
          <div className="text-[10px] text-slate-500">Authorized for Sector 7 Workstation Inspection</div>
        </div>

        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">THREAT LEVEL ASSESSMENT:</div>
          <div className={`text-sm font-bold ${anomalyLevel > 40 ? 'text-red-400 glow-red' : 'text-green-400'}`}>
            {anomalyLevel > 70 ? 'CRITICAL (VOID ACTIVE)' : anomalyLevel > 40 ? 'ELEVATED' : 'LOW'}
          </div>
          <div className="text-[10px] text-slate-500">Telemetry integrity: {100 - anomalyLevel}%</div>
        </div>
      </div>

      {/* Locked Partitions Overview */}
      <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-2">
        <div className="text-xs font-bold text-pink-400">PARTITION CONTAINMENT LOCKS:</div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between items-center p-1.5 bg-[#050814] rounded">
            <span>/System - Kernel Binaries</span>
            <span className="text-green-400 font-bold">UNLOCKED</span>
          </div>
          <div className="flex justify-between items-center p-1.5 bg-[#050814] rounded">
            <span>/Archive - Research Vault</span>
            <span className="text-green-400 font-bold">ACCESSIBLE</span>
          </div>
          <div className="flex justify-between items-center p-1.5 bg-[#050814] rounded">
            <span>/VOID - Synaptic Neural Platter</span>
            <span className={act >= 3 ? 'text-pink-400 font-bold' : 'text-red-400 font-bold'}>
              {act >= 3 ? 'DECRYPTED (NULL_RECURSION)' : 'LOCKED (CIPHER REQUIRED)'}
            </span>
          </div>
        </div>
      </div>

      {/* Quarantine Protocol */}
      <div className="p-3 bg-[#0c0f28] border border-cyan-900 rounded space-y-2">
        <div className="text-xs font-bold text-cyan-300">EMERGENCY QUARANTINE PROTOCOL:</div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Engage sandbox firewall to isolate hostile processes (PID 666 / observer.exe) from writing to the master boot sector.
        </p>
        <button
          onClick={handleEngageQuarantine}
          className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500 rounded font-bold text-xs cursor-pointer shadow-retro-cyan"
        >
          {quarantineStatus === 'SCANNING' ? 'SCANNING THREATS...' : quarantineStatus === 'ENGAGED' ? 'QUARANTINE ACTIVE' : 'ENGAGE QUARANTINE'}
        </button>
      </div>
    </div>
  );
};
