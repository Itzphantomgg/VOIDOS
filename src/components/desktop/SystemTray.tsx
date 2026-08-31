import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wifi, Bell, Shield, Radio } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { NotificationItem } from '../../types/os';

interface SystemTrayProps {
  notifications: NotificationItem[];
  onToggleNotifications: () => void;
  anomalyLevel: number;
  act: number;
  masterVolume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({
  notifications,
  onToggleNotifications,
  anomalyLevel,
  act,
  masterVolume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [isVolumeFlyoutOpen, setIsVolumeFlyoutOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      if (act >= 3 && Math.random() < 0.1) {
        setTimeStr('23:59:??');
        return;
      }
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [act]);

  return (
    <div className="flex items-center space-x-2 text-xs font-mono select-none px-2 h-full bg-[#050814] border-l border-slate-800">
      {/* Volume Control Button */}
      <div className="relative">
        <button
          onClick={() => {
            sound.playClick();
            setIsVolumeFlyoutOpen(!isVolumeFlyoutOpen);
          }}
          className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400 transition-colors"
          title="Sound Volume"
        >
          {isMuted || masterVolume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Volume Flyout */}
        {isVolumeFlyoutOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-9 right-0 bg-[#0c1122] border-2 border-cyan-500/80 p-3 w-44 rounded shadow-2xl z-[9995] space-y-2"
          >
            <div className="flex justify-between items-center text-[10px] text-cyan-300 font-bold">
              <span>AUDIO GAIN</span>
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleMute();
                }}
                className="text-[9px] px-1 bg-slate-800 hover:bg-pink-900 text-pink-300 rounded border border-pink-700"
              >
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={masterVolume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded"
            />
            <div className="text-[10px] text-right text-slate-400">
              {Math.round(masterVolume * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Network / Mesh Status */}
      <div className="flex items-center text-slate-400 hover:text-cyan-300" title={act >= 3 ? "VOID MESH - UNRESTRICTED" : "10.0.4.1 Aethelgard Intranet"}>
        {act >= 3 ? <Radio size={15} className="text-pink-500 animate-pulse" /> : <Wifi size={15} className="text-cyan-400" />}
      </div>

      {/* Anomaly Indicator */}
      <div
        className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]"
        title={`Anomaly Telemetry: ${anomalyLevel}%`}
      >
        <span className={`h-2 w-2 rounded-full ${anomalyLevel > 50 ? 'bg-pink-500 animate-ping' : 'bg-cyan-400'}`} />
        <span className={anomalyLevel > 50 ? 'text-pink-400 font-bold' : 'text-slate-400'}>
          {anomalyLevel}%
        </span>
      </div>

      {/* Notification Bell */}
      <button
        onClick={() => {
          sound.playClick();
          onToggleNotifications();
        }}
        className="relative p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400 transition-colors"
        title="Notifications"
      >
        <Bell size={15} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-bold text-[9px] rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Clock */}
      <div className="text-cyan-300 font-mono text-xs pl-1 font-bold">
        {timeStr}
      </div>
    </div>
  );
};
