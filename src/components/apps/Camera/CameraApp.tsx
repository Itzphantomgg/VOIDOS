import React, { useState, useEffect } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Camera, Radio, RefreshCw, AlertTriangle, Eye } from 'lucide-react';

export const CameraApp: React.FC = () => {
  const [selectedCam, setSelectedCam] = useState<1 | 2 | 3>(1);
  const [timestamp, setTimestamp] = useState('14-AUG-2004 03:14:29 EST');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cameras = [
    { id: 1 as const, name: 'CAM_01: SECTOR 7 LAB 304', location: 'Terminal 04 Workstation Area' },
    { id: 2 as const, name: 'CAM_02: SERVER ROOM VAULT', location: 'Cognitive Core Array' },
    { id: 3 as const, name: 'CAM_03: SECTOR 7 AIRLOCK', location: 'Magnetic Containment Door' },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-slate-200 font-mono text-xs select-none p-3 space-y-3">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-[#080d1e] border border-pink-700/60 p-2 rounded">
        <div className="flex items-center space-x-2 text-pink-400 font-bold">
          <Camera size={16} className="animate-pulse" />
          <span>AETHELGARD CCTV SURVEILLANCE // SECTOR 7</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <Radio size={12} className="text-red-500 animate-ping" />
          <span className="text-red-400 font-bold">FEED: ARCHIVED RECORDING</span>
        </div>
      </div>

      {/* Main CCTV Screen */}
      <div className="flex-1 relative bg-[#030611] border-2 border-slate-800 rounded overflow-hidden flex items-center justify-center">
        {/* CRT Scanline Overlay inside Camera Feed */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-70" />

        {/* Camera Info Overlay */}
        <div className="absolute top-2 left-3 z-10 space-y-0.5">
          <div className="text-pink-400 font-bold text-xs tracking-wider">
            {cameras.find(c => c.id === selectedCam)?.name}
          </div>
          <div className="text-[10px] text-slate-400">
            {cameras.find(c => c.id === selectedCam)?.location}
          </div>
        </div>

        <div className="absolute top-2 right-3 z-10 text-[10px] text-cyan-300 font-bold">
          {timestamp}
        </div>

        {/* Dynamic Simulated Feed Content */}
        {selectedCam === 1 && (
          <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${isGlitching ? 'filter hue-rotate-90 blur-xs' : ''}`}>
            <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
              <rect width="400" height="240" fill="#040817" stroke="#162548" strokeWidth="2" />
              <rect x="150" y="70" width="100" height="80" fill="#0a122c" stroke="#00f0ff" strokeWidth="1.5" />
              <text x="165" y="115" fill="#00f0ff" fontFamily="monospace" fontSize="10">TERMINAL 04</text>
              <circle cx="200" cy="180" r="22" fill="#ff007f" opacity="0.35" />
              <text x="145" y="215" fill="#ff007f" fontFamily="monospace" fontSize="9">OPERATOR RESIDUAL (03:14)</text>
            </svg>
          </div>
        )}

        {selectedCam === 2 && (
          <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${isGlitching ? 'filter hue-rotate-90 blur-xs' : ''}`}>
            <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
              <rect width="400" height="240" fill="#040817" stroke="#162548" strokeWidth="2" />
              <rect x="80" y="50" width="60" height="140" fill="#081024" stroke="#ff007f" strokeWidth="1" />
              <rect x="170" y="50" width="60" height="140" fill="#081024" stroke="#ff007f" strokeWidth="1" />
              <rect x="260" y="50" width="60" height="140" fill="#081024" stroke="#ff007f" strokeWidth="1" />
              <text x="135" y="215" fill="#00f0ff" fontFamily="monospace" fontSize="9">SECTOR 7 SERVER VAULT (0.00V ACTIVE)</text>
              <circle cx="200" cy="120" r="15" fill="#00f0ff" opacity="0.5" className="animate-pulse" />
            </svg>
          </div>
        )}

        {selectedCam === 3 && (
          <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${isGlitching ? 'filter hue-rotate-90 blur-xs' : ''}`}>
            <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
              <rect width="400" height="240" fill="#040817" stroke="#162548" strokeWidth="2" />
              <rect x="120" y="40" width="160" height="160" fill="#081024" stroke="#ffaa00" strokeWidth="2" />
              <text x="145" y="125" fill="#ffaa00" fontFamily="monospace" fontSize="12" fontWeight="bold">SECTOR 7 SEALED</text>
              <text x="140" y="145" fill="#slate" fontFamily="monospace" fontSize="9">CONTAINMENT LOCK ENGAGED</text>
            </svg>
          </div>
        )}

        {/* Glitch Static Banner */}
        {isGlitching && (
          <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center pointer-events-none">
            <div className="text-pink-400 font-black text-lg glow-magenta animate-ping">
              [SIGNAL INTERRUPT // 03:14:29]
            </div>
          </div>
        )}
      </div>

      {/* Camera Selection Switcher */}
      <div className="grid grid-cols-3 gap-2">
        {cameras.map(cam => (
          <button
            key={cam.id}
            onClick={() => {
              sound.playClick();
              setSelectedCam(cam.id);
            }}
            className={`p-2 rounded text-left transition-colors border cursor-pointer ${
              selectedCam === cam.id
                ? 'bg-pink-950/80 border-pink-500 text-pink-300 font-bold shadow-retro-magenta'
                : 'bg-[#090e21] border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold text-xs truncate">CAM 0{cam.id}</div>
            <div className="text-[9px] text-slate-500 truncate">{cam.location}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
