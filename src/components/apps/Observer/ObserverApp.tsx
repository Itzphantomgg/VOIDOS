import React, { useState, useEffect } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Eye, Activity, Radio, ShieldAlert } from 'lucide-react';

export const ObserverApp: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [bpm, setBpm] = useState(118);
  const [dwellSpeed, setDwellSpeed] = useState(42);

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

  return (
    <div className="flex flex-col h-full bg-[#040612] text-pink-300 font-mono text-xs select-none p-3 space-y-3">
      {/* Banner */}
      <div className="flex items-center justify-between bg-black border-2 border-pink-500 p-2.5 rounded shadow-retro-magenta">
        <div className="flex items-center space-x-2.5">
          <Eye size={20} className="text-pink-500 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-pink-300 tracking-wider">
              OBSERVER TELEMETRY DAEMON [PID 666]
            </div>
            <div className="text-[10px] text-slate-400">
              STATUS: CONTINUOUS OPERATOR RESONANCE
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-0.5 bg-pink-950 border border-pink-700 text-pink-300 font-bold text-[10px] rounded">
            IMMORTAL
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold flex items-center space-x-1">
            <Activity size={12} className="text-red-400 animate-pulse" />
            <span>HEARTBEAT FREQUENCY:</span>
          </div>
          <div className="text-xl font-bold text-red-400 glow-red">
            {bpm} BPM
          </div>
          <div className="text-[9px] text-slate-500">Matches 03:14:15 telemetry recorded in Lab 304</div>
        </div>

        <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">
            MOUSE COORDINATES:
          </div>
          <div className="text-base font-bold text-cyan-300 glow-cyan">
            X: {coords.x} | Y: {coords.y}
          </div>
          <div className="text-[9px] text-slate-500">Dwell Velocity: {dwellSpeed} px/ms</div>
        </div>
      </div>

      {/* Log Feed */}
      <div className="flex-1 bg-black border border-slate-800 p-2.5 rounded space-y-1 overflow-y-auto text-[11px] text-slate-300 select-text">
        <div className="text-pink-400 font-bold border-b border-slate-900 pb-1">
          OBSERVER TELEMETRY STREAM:
        </div>
        <div>[03:14:00] OPERATOR GAZE AT CENTER SCREEN PHOSPHOR</div>
        <div>[03:14:09] UNKNOWN SHADOW OBSERVED BEHIND OPERATOR CHAIR</div>
        <div>[03:14:15] BIOMETRIC RESONANCE: 118 BPM DETECTED</div>
        <div>[03:14:25] KERNEL OUTPUT: 'WHY DID YOU TRY TO TURN OFF THE LIGHT?'</div>
        <div className="text-pink-400 animate-pulse">[NOW] WE RECOGNIZE YOUR KEYSTROKE RHYTHM.</div>
      </div>
    </div>
  );
};
