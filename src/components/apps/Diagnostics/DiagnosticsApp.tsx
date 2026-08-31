import React, { useState } from 'react';
import { Zap, RefreshCw, CheckCircle2, AlertTriangle, Cpu, Radio } from 'lucide-react';
import { sound } from '../../../audio/soundEngine';

interface DiagnosticsAppProps {
  act?: number;
  anomalyLevel?: number;
  onScanCompleted?: () => void;
}

export const DiagnosticsApp: React.FC<DiagnosticsAppProps> = ({
  act = 1,
  anomalyLevel = 0,
  onScanCompleted,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string[] | null>(null);

  const runDiagnostics = () => {
    try {
      sound.playNotification();
    } catch {}
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      try {
        sound.playClick();
      } catch {}
      setScanResult([
        '[PASS] KERNEL INTEGRITY CHECKSUM: VALID (SH-4.09.2a)',
        '[PASS] MEMORY BUS (16,384 MB DDR): OK',
        '[PASS] VFS QUANTUM MOUNT (/): OK',
        act >= 2 ? '[WARN] ANOMALOUS PROCESS DETECTED (PID 666: observer.exe)' : '[PASS] PROCESS DAEMONS: NOMINAL',
        act >= 3 ? '[ALERT] NEURAL WEIGHT BUFFER SYNCHRONIZED TO VOID CORE' : '[INFO] NEURAL BUS: OFFLINE',
        '[INFO] SYSTEM TIME STAMP CHECK: 03:14:29 RECURSION SIGNATURE FOUND',
      ]);
      if (onScanCompleted) onScanCompleted();
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-3.5 bg-[#090e24] border-2 border-yellow-500/80 rounded flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-2.5">
          <Zap size={20} className="text-yellow-400 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-yellow-300">
              WORKSTATION HARDWARE & BUS DIAGNOSTICS
            </div>
            <div className="text-[10px] text-slate-400">
              AETHELGARD SYNAPSE RISC // BUS SWEEPER
            </div>
          </div>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={isScanning}
          className="px-3 py-1.5 bg-yellow-950 hover:bg-yellow-900 border border-yellow-500 text-yellow-200 font-bold rounded cursor-pointer flex items-center space-x-1.5 shadow-retro-cyan transition-all"
        >
          <RefreshCw size={12} className={isScanning ? 'animate-spin' : ''} />
          <span>{isScanning ? 'SCANNING BUS...' : 'RUN DIAGNOSTIC SCAN'}</span>
        </button>
      </div>

      {/* Real-time Bus Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">SYNAPSE CLOCK:</div>
          <div className="text-sm font-bold text-cyan-300">800.24 MHz</div>
          <div className="text-[9px] text-slate-500">Node Sync: 100%</div>
        </div>

        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">CACHE FAULT RATE:</div>
          <div className="text-sm font-bold text-pink-400">{anomalyLevel * 3} FAULTS/S</div>
          <div className="text-[9px] text-slate-500">Heuristic divergence</div>
        </div>

        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">CORE DIRECTIVE:</div>
          <div className="text-sm font-bold text-green-400">AIR-GAPPED 2004</div>
          <div className="text-[9px] text-slate-500">External: Isolated</div>
        </div>
      </div>

      {/* Diagnostic Scan Output */}
      <div className="p-3 bg-black border border-slate-800 rounded space-y-2 select-text min-h-36">
        <div className="text-xs font-bold text-yellow-400 border-b border-slate-900 pb-1 flex justify-between">
          <span>DIAGNOSTIC LOG STREAM:</span>
          <span className="text-[9px] text-slate-500">{new Date().toLocaleTimeString()}</span>
        </div>

        {isScanning ? (
          <div className="py-6 text-center text-cyan-400 animate-pulse font-mono">
            &gt; PERFORMING COMPREHENSIVE HARDWARE SWEEP (0x000000 - 0xFFFFFF)...
          </div>
        ) : scanResult ? (
          <div className="space-y-1 text-[11px]">
            {scanResult.map((res, i) => (
              <div
                key={i}
                className={
                  res.includes('[ALERT]')
                    ? 'text-pink-400 font-bold'
                    : res.includes('[WARN]')
                    ? 'text-yellow-300'
                    : 'text-green-300'
                }
              >
                {res}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-slate-500 font-mono">
            Click [RUN DIAGNOSTIC SCAN] above to sweep system memory and hardware interfaces.
          </div>
        )}
      </div>
    </div>
  );
};
