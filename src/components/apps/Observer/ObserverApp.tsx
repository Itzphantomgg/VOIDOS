import React, { useState, useEffect } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Eye, Activity, Radio, ShieldAlert, Zap, RefreshCw, CheckCircle2, AlertTriangle, Play, ChevronRight, Lock } from 'lucide-react';

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
  
  // 5-Step Stabilization Routine State
  const [stabilizationStep, setStabilizationStep] = useState<number>(0); // 0 = idle, 1 = connected, 2 = sweep, 3 = compare, 4 = verify, 5 = done
  const [stepTimer, setStepTimer] = useState<number>(0);
  const [targetVerifyChoice, setTargetVerifyChoice] = useState<string>('03:14:29');
  const [verifyOptions, setVerifyOptions] = useState<string[]>(['03:14:29', '23:59:99', '00:00:00']);

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

  // Step 1: Initiate Stabilization Routine
  const startRoutine = () => {
    try {
      sound.playNotification();
    } catch {}
    setStabilizationStep(1);
    setStepTimer(100);
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] INITIATING 5-STEP STABILIZATION ROUTINE...`, ...prev]);

    setTimeout(() => {
      setStabilizationStep(2);
      try {
        sound.playClick();
      } catch {}
    }, 1500);
  };

  // Step 2 -> Step 3: Pulse Sweep
  const handlePulseSweep = () => {
    try {
      sound.playGlitch();
    } catch {}
    setStabilizationStep(3);
    setActionLog(prev => [`[${new Date().toLocaleTimeString()}] STEP 2: SIGNAL PULSE SWEEP BROADCAST`, ...prev]);

    setTimeout(() => {
      setStabilizationStep(4);
      // Randomize options for verification step
      const choices = ['03:14:29', '00:00:VOID', '04:09:SEC7'];
      setVerifyOptions(choices.sort(() => Math.random() - 0.5));
      try {
        sound.playClick();
      } catch {}
    }, 1500);
  };

  // Step 4: Verify Choice
  const handleVerifyChoice = (choice: string) => {
    if (choice === '03:14:29') {
      try {
        sound.playNotification();
      } catch {}
      setStabilizationStep(5);
      setActionLog(prev => [`[${new Date().toLocaleTimeString()}] STEP 4: TELEMETRY HASH VERIFIED (03:14:29)`, ...prev]);
      if (onVerifyIntegrity) onVerifyIntegrity();

      setTimeout(() => {
        if (onStabilizePulse) onStabilizePulse();
        setStabilizationStep(0);
        setActionLog(prev => [`[${new Date().toLocaleTimeString()}] STABILIZATION COMPLETE (+35% STABILITY)`, ...prev]);
      }, 1200);
    } else {
      try {
        sound.playError();
      } catch {}
      setActionLog(prev => [`[${new Date().toLocaleTimeString()}] ERROR: FALSE DATA REJECTED // RETRYING...`, ...prev]);
    }
  };

  const isLow = stability <= 35;
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
              <span>OBSERVER // OBSERVATION DUTY</span>
              {isCritical && <span className="text-red-400 font-black animate-ping">CRITICAL</span>}
            </div>
            <div className="text-[10px] text-slate-400">
              MAINTAIN EQUILIBRIUM: RUN OBSERVATION ROUTINE TO STABILIZE
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
            <span>WARNING: ANOMALY IMMINENT. EXECUTE OBSERVATION ROUTINE NOW.</span>
          </div>
        )}
      </div>

      {/* 5-Step Interactive Observation Duty Routine */}
      <div className="p-3 bg-[#070b1e] border border-cyan-900 rounded space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold text-cyan-300">
          <span>OBSERVATION DUTY PROCEDURE:</span>
          <span>{stabilizationStep === 0 ? 'STANDBY' : `STEP 0${stabilizationStep} / 05`}</span>
        </div>

        {/* Step 0: Idle */}
        {stabilizationStep === 0 && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-400">
              Run a complete 5-step diagnostic stabilization routine to suppress Anomaly aggression (+35% Stability).
            </p>
            <button
              onClick={startRoutine}
              className="w-full p-2.5 bg-gradient-to-r from-cyan-950 to-pink-950 hover:from-cyan-900 hover:to-pink-900 text-cyan-200 border border-cyan-500 rounded font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-retro-cyan transition-all"
            >
              <Zap size={14} className="text-cyan-400" />
              <span>START 5-STEP STABILIZATION ROUTINE</span>
            </button>
          </div>
        )}

        {/* Step 1: Connecting */}
        {stabilizationStep === 1 && (
          <div className="py-3 text-center space-y-1 text-xs text-cyan-300 animate-pulse font-mono">
            <RefreshCw size={18} className="animate-spin mx-auto text-cyan-400 mb-1" />
            <div>STEP 1: CONNECTING TO OBSERVER BUS (PID 666)...</div>
          </div>
        )}

        {/* Step 2: Pulse Sweep Action */}
        {stabilizationStep === 2 && (
          <div className="space-y-2 text-xs">
            <div className="text-pink-300 font-bold">STEP 2: BROADCAST SYNAPTIC PULSE SWEEP</div>
            <button
              onClick={handlePulseSweep}
              className="w-full p-2.5 bg-pink-950 hover:bg-pink-900 text-pink-200 border border-pink-500 rounded font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-retro-magenta"
            >
              <Radio size={14} className="text-pink-400 animate-pulse" />
              <span>[ CLICK TO EMIT PULSE SWEEP ]</span>
            </button>
          </div>
        )}

        {/* Step 3: Diagnostic Comparison */}
        {stabilizationStep === 3 && (
          <div className="py-3 text-center space-y-1 text-xs text-yellow-300 animate-pulse font-mono">
            <div>STEP 3: COMPARING LOCAL BUFFER AGAINST CORE REGISTERS...</div>
          </div>
        )}

        {/* Step 4: Verification Challenge */}
        {stabilizationStep === 4 && (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-300 font-bold">
              STEP 4: VERIFY RECOVERY TIMESTAMP (VOID INTERFERENCE DETECTED):
            </div>
            <div className="grid grid-cols-3 gap-2">
              {verifyOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleVerifyChoice(opt)}
                  className="p-2 bg-[#091128] hover:bg-cyan-950 border border-cyan-600 text-cyan-300 rounded font-bold text-center cursor-pointer transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Finalized */}
        {stabilizationStep === 5 && (
          <div className="py-3 text-center space-y-1 text-xs text-green-400 font-bold font-mono">
            <CheckCircle2 size={18} className="mx-auto text-green-400 mb-1" />
            <div>STEP 5: STABILIZATION MATRIX SYNCHRONIZED!</div>
          </div>
        )}
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
