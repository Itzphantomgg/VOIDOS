import React, { useState, useEffect, useRef } from 'react';
import { MediaTrack } from '../../../types/apps';
import { sound } from '../../../audio/soundEngine';
import { Play, Pause, Square, SkipForward, SkipBack, Volume2, Music, Radio } from 'lucide-react';

interface MediaPlayerProps {
  initialTrackId?: string;
  act: number;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ initialTrackId, act }) => {
  const [playlist, setPlaylist] = useState<MediaTrack[]>([
    {
      id: 'audio-track-1',
      title: 'Neon Horizon (Sector 7 Ambient)',
      artist: 'Aethelgard Audio Lab',
      duration: '03:42',
      type: 'synth-track',
      synthPreset: 'synthwave',
      notes: 'Standard background synthesizer test reel.',
    },
    {
      id: 'audio-track-2',
      title: 'Dr. Sterling Final Voice Telemetry',
      artist: 'Dr. Valerie Sterling',
      duration: '01:15',
      type: 'audio-log',
      synthPreset: 'signal-eerie',
      notes: 'Recorded Dec 31, 1999 23:45. Neural synthesis bridge active.',
    },
    {
      id: 'audio-track-3',
      title: 'Consciousness Sub-Drone',
      artist: 'VOID//CORE',
      duration: '05:00',
      type: 'drone',
      synthPreset: 'void-drone',
      notes: 'Low resonance harmonic waveform.',
    },
    {
      id: 'audio-track-4',
      title: 'Digital Decay Pattern',
      artist: 'Autonomous Heuristic',
      duration: '02:30',
      type: 'corrupted-recording',
      synthPreset: 'digital-decay',
      notes: 'High frequency data corruption.',
    },
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  // Visualizer animation loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const renderVisualizer = () => {
      ctx.fillStyle = '#040714';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numBars = 32;
      const barWidth = canvas.width / numBars;

      for (let i = 0; i < numBars; i++) {
        let height = 0;
        if (isPlaying) {
          height = Math.sin(phase + i * 0.4) * 25 + Math.random() * 30 + 10;
        } else {
          height = 4;
        }

        const x = i * barWidth;
        const y = canvas.height - height;

        // Gradient
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, '#ff007f');
        grad.addColorStop(1, '#00f0ff');

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y, barWidth - 2, height);
      }

      phase += 0.1;
      animId = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    sound.playClick();
    if (isPlaying) {
      sound.stopProceduralTrack();
      setIsPlaying(false);
    } else {
      sound.playProceduralTrack(currentTrack.synthPreset);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    sound.playClick();
    setCurrentTrackIndex(index);
    if (isPlaying) {
      sound.playProceduralTrack(playlist[index].synthPreset);
    }
  };

  const handleStop = () => {
    sound.playClick();
    sound.stopProceduralTrack();
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none p-3 space-y-3">
      {/* Visualizer & Now Playing Display */}
      <div className="p-3 bg-[#040714] border-2 border-cyan-500/80 rounded space-y-2 shadow-2xl">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center space-x-2 truncate">
            <Radio size={14} className={isPlaying ? 'text-pink-500 animate-pulse' : 'text-slate-600'} />
            <span className="text-cyan-300 truncate">{currentTrack.title}</span>
          </div>
          <span className="text-slate-500 text-[10px]">{currentTrack.duration}</span>
        </div>

        {/* Live Audio Spectrum Canvas */}
        <div className="w-full h-24 bg-black rounded border border-slate-800 overflow-hidden">
          <canvas ref={canvasRef} width={400} height={100} className="w-full h-full" />
        </div>

        <div className="text-[10px] text-slate-400 truncate">
          <strong>Artist:</strong> {currentTrack.artist} | <em>{currentTrack.notes}</em>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-3 bg-[#0a0f22] p-2 border border-slate-800 rounded">
        <button
          onClick={() => handleSelectTrack((currentTrackIndex - 1 + playlist.length) % playlist.length)}
          className="p-2 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer"
          title="Previous"
        >
          <SkipBack size={14} />
        </button>

        <button
          onClick={handleTogglePlay}
          className="px-4 py-2 bg-gradient-to-r from-cyan-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold border border-cyan-400 rounded cursor-pointer shadow-retro-cyan flex items-center space-x-1"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <button
          onClick={handleStop}
          className="p-2 bg-[#141d3b] hover:bg-cyan-950 text-pink-300 border border-slate-700 rounded cursor-pointer"
          title="Stop"
        >
          <Square size={14} />
        </button>

        <button
          onClick={() => handleSelectTrack((currentTrackIndex + 1) % playlist.length)}
          className="p-2 bg-[#141d3b] hover:bg-cyan-950 text-cyan-300 border border-slate-700 rounded cursor-pointer"
          title="Next"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Playlist List */}
      <div className="flex-1 overflow-y-auto border border-slate-800 rounded bg-[#040712] divide-y divide-slate-900">
        {playlist.map((track, idx) => {
          const isSelected = idx === currentTrackIndex;
          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(idx)}
              className={`p-2 cursor-pointer flex items-center justify-between transition-colors ${
                isSelected
                  ? 'bg-cyan-950/80 text-cyan-300 font-bold border-l-2 border-cyan-400'
                  : 'hover:bg-slate-900/60 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <Music size={13} className={isSelected ? 'text-pink-400' : 'text-slate-600'} />
                <span className="truncate text-xs">{track.title}</span>
              </div>
              <span className="text-[10px] text-slate-500">{track.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
