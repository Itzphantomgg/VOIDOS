import React, { useState } from 'react';
import { LogEntry } from '../../../types/apps';
import { initialSystemLogs } from '../../../data/systemLogs';
import { sound } from '../../../audio/soundEngine';
import { ShieldAlert, Filter, Search, RotateCcw, AlertTriangle } from 'lucide-react';

interface SystemLogsProps {
  act: number;
}

export const SystemLogs: React.FC<SystemLogsProps> = ({ act }) => {
  const [logs, setLogs] = useState<LogEntry[]>(initialSystemLogs);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(l => {
    if (filterLevel !== 'ALL' && l.level !== filterLevel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return l.message.toLowerCase().includes(q) || l.source.toLowerCase().includes(q);
    }
    return true;
  });

  const getLevelBadge = (level: LogEntry['level']) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="px-1 py-0.2 bg-red-950 border border-red-700 text-red-400 font-bold rounded">CRIT</span>;
      case 'ANOMALY':
      case 'VOID':
        return <span className="px-1 py-0.2 bg-pink-950 border border-pink-700 text-pink-300 font-bold glow-magenta rounded">VOID</span>;
      case 'WARN':
        return <span className="px-1 py-0.2 bg-amber-950 border border-amber-700 text-amber-300 rounded">WARN</span>;
      default:
        return <span className="px-1 py-0.2 bg-slate-900 border border-slate-700 text-slate-400 rounded">INFO</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Top Filter Toolbar */}
      <div className="bg-[#0b1022] p-2 border-b border-slate-800 flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-1.5">
          <Filter size={13} className="text-slate-400" />
          <span className="text-slate-400 text-[10px]">SEVERITY:</span>
          {['ALL', 'INFO', 'WARN', 'CRITICAL', 'ANOMALY'].map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                sound.playClick();
                setFilterLevel(lvl);
              }}
              className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                filterLevel === lvl
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center bg-[#050814] border border-slate-700 px-2 py-0.5 rounded w-36 sm:w-48">
          <Search size={12} className="text-slate-500 mr-1" />
          <input
            type="text"
            placeholder="Filter logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-mono placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Log Entries Table */}
      <div className="flex-1 overflow-y-auto p-2 bg-[#040612]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500">
              <th className="py-1 px-2 font-bold w-24">TIME</th>
              <th className="py-1 px-2 font-bold w-16">LEVEL</th>
              <th className="py-1 px-2 font-bold w-24">SOURCE</th>
              <th className="py-1 px-2 font-bold">MESSAGE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-[11px]">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-1.5 px-2 text-slate-500 font-mono text-[10px]">{log.timestamp}</td>
                <td className="py-1.5 px-2">{getLevelBadge(log.level)}</td>
                <td className="py-1.5 px-2 text-cyan-400 font-bold truncate">{log.source}</td>
                <td className={`py-1.5 px-2 truncate select-text ${log.level === 'ANOMALY' ? 'text-pink-300 glow-magenta font-bold' : 'text-slate-300'}`}>
                  {log.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-[#050814] px-3 py-1 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>Logged Events: {filteredLogs.length}</span>
        <span>DAEMON: ACTIVE</span>
      </div>
    </div>
  );
};
