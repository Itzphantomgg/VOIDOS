import React, { useState, useEffect } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Eye, Activity, Radio, ShieldAlert, Zap, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ObserverAppProps {
  stability?: number;
  onStabilizePulse?: () => void;
  onRunDiagnosticSweep?: () => void;
  onVerifyIntegrity?: () => void;
}

export const ObserverApp: React.FC<ObserverAppProps> = ({
  stability = 100,
  onStabilizePulse,
  onRunDiagnosticSweep,
  onVerifyIntegrity,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [bpm, setBpm] = useState(118);
  const [dwellSpeed, setDwellSpeed] = useState(42);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setDwellSpeed(Math.floor(Math.random() * 60 + 20));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(Math.floor(Math.random() * 12 + 114));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePulse = () => {
    if (isCooldown) return;
    try {
      sound.playNotification();
    } catch {}
    setIsCooldown(true);
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] STABILIZE PULSE APPLIED (+25% STABILITY)`, ...prev]);
    if (onStabilizePulse) onStabilizePulse();
    setTimeout(() => setIsCooldown(false), 2500);
  };

  const handleSweep = () => {
    if (isCooldown) return;
    try {
      sound.playClick();
    } catch {}
    setIsCooldown(true);
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] DIAGNOSTIC SWEEP EXECUTED (+15% STABILITY)`, ...prev]);
    if (onRunDiagnosticSweep) onRunDiagnosticSweep();
    setTimeout(() => setIsCooldown(false), 2000);
  };

  const handleVerify = () => {
    try {
      sound.playClick();
    } catch {}
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] TELEMETRY HASH VERIFIED // AUTH: TRUE`, ...prev]);
    if (onVerifyIntegrity) onVerifyIntegrity();
  };

  const isLow = stability <= 30;
  const isCritical = stability <= 15;

  return (
    <div className="flex flex-col h-full bg-[#040612] text-pink-300 font-mono text-xs select-none p-3 space-y-3 overflow-y-auto">
      {/* Banner */}
      <div className={`flex items-center justify-between bg-black border-2 p-2.5 rounded ${
        isCritical 
          ? 'border-red-500 shadow-2xl shadow-red-950/80 animate-pulse' 
          : isLow 
          ? 'border-amber-500' 
          : 'border-pink-500 shadow-retro-magenta'
      }`}>
        <div className="flex items-center space-x-2.5">
          <Eye size={20} className={isCritical ? 'text-red-500 animate-bounce' : 'text-pink-500 animate-pulse'} />
          <div>
            <div className="text-xs font-bold text-pink-300 tracking-wider flex items-center space-x-2">
              <span>OBSERVER // ANOMALY STABILITY MONITOR</span>
              {isCritical && <span className="text-red-400 font-black animate-ping">CRITICAL</span>}
            </div>
            <div className="text-[10px] text-slate-400">
              OBSERVATION DUTY: MAINTAIN STABILITY &gt; 0% TO PREVENT SYSTEM FAILURE
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-0.5 border font-bold text-[10px] rounded ${
            isCritical
              ? 'bg-red-950 border-red-500 text-red-300 animate-pulse'
              : 'bg-pink-950 border-pink-700 text-pink-300'
          }`}>
            {isCritical ? 'DANGER' : 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Stability Bar Meter */}
      <div className="p-3 bg-[#080d22] border border-pink-900/60 rounded space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="flex items-center space-x-1.5 text-pink-300">
            <Radio size={14} />
            <span>ANOMALY STABILITY:</span>
          </span>
          <span className={`font-mono text-sm ${isCritical ? 'text-red-400 font-black' : isLow ? 'text-amber-400' : 'text-green-400'}`}>
            {stability}%
          </span>
        </div>

        <div className="w-full bg-black h-4 rounded border border-slate-800 overflow-hidden p-0.5">
          <div
            className={`h-full transition-all duration-300 ${
              isCritical
                ? 'bg-red-600 animate-pulse'
                : isLow
                ? 'bg-amber-500'
                : 'bg-gradient-to-r from-cyan-400 to-green-400'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, stability))}%` }}
          />
        </div>

        {isCritical && (
          <div className="p-2 bg-red-950/60 border border-red-500 text-red-200 text-[10px] font-bold flex items-center space-x-1.5 animate-pulse">
            <AlertTriangle size={13} className="shrink-0 text-red-400" />
            <span>WARNING: ANOMALY IMMINENT. APPLY STABILIZE PULSE IMMEDIATELY.</span>
          </div>
        )}
      </div>

      {/* Active Observation Counterplay Controls */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 tracking-wider">
          STABILITY COUNTERPLAY DIRECTIVES:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={handlePulse}
            disabled={isCooldown}
            className="p-2.5 bg-gradient-to-r from-pink-950 to-purple-950 hover:from-pink-900 hover:to-purple-900 disabled:opacity-40 border border-pink-500 text-pink-200 rounded font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-retro-magenta"
          >
            <Zap size={14} className="text-pink-400" />
            <span>STABILIZE PULSE</span>
          </button>

          <button
            onClick={handleSweep}
            disabled={isCooldown}
            className="p-2.5 bg-[#0e162f] hover:bg-cyan-950 disabled:opacity-40 border border-cyan-700 text-cyan-300 rounded font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className="text-cyan-400" />
            <span>DIAGNOSTIC SWEEP</span>
          </button>

          <button
            onClick={handleVerify}
            className="p-2.5 bg-[#0e162f] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <CheckCircle2 size={14} className="text-green-400" />
            <span>VERIFY INTEGRITY</span>
          </button>
        </div>
      </div>

      {/* Live Operator Resonance Telemetry */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-[#080d22] border border-slate-800 rounded space-y-0.5">
          <div className="text-[10px] text-slate-400 font-bold flex items-center space-x-1">
            <Activity size={12} className="text-red-400 animate-pulse" />
            <span>OPERATOR HEARTBEAT:</span>
          </div>
          <div className="text-lg font-bold text-red-400 glow-red font-mono">
            {bpm} BPM
          </div>
          <div className="text-[9px] text-slate-500">Live biometric resonance bus</div>
        </div>

        <div className="p-2.5 bg-[#080d22] border border-slate-800 rounded space-y-0.5">
          <div className="text-[10px] text-slate-400 font-bold">
            MOUSE DWELL VELOCITY:
          </div>
          <div className="text-lg font-bold text-cyan-300 glow-cyan font-mono">
            {dwellSpeed} px/ms
          </div>
          <div className="text-[9px] text-slate-500">X: {coords.x} | Y: {coords.y}</div>
        </div>
      </div>

      {/* Action and Stream Feed */}
      <div className="flex-1 bg-black border border-slate-800 p-2.5 rounded space-y-1 overflow-y-auto text-[11px] text-slate-300 min-h-24">
        <div className="text-pink-400 font-bold border-b border-slate-900 pb-1 flex justify-between">
          <span>OBSERVER TELEMETRY FEED:</span>
          <span className="text-[9px] text-slate-500">PID 666</span>
        </div>
        {actionLog.map((log, idx) => (
          <div key={idx} className="text-green-300 font-mono">{log}</div>
        ))}
        <div>[03:14:00] OPERATOR GAZE AT CENTER SCREEN PHOSPHOR</div>
        <div>[03:14:15] BIOMETRIC RESONANCE: 118 BPM DETECTED</div>
        <div className="text-pink-400 animate-pulse">[OBSERVER] WE ARE RECORDING EVERY ACTION.</div>
      </div>
    </div>
  );
};
