import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine } from '../../../types/apps';
import { KnowledgeLevel } from '../../../types/story';
import { sound } from '../../../audio/soundEngine';
import { handleTerminalCommand } from '../../../data/terminalCommands';

interface TerminalProps {
  cwd: string;
  setCwd: (path: string) => void;
  vfs: Record<string, any>;
  unlockVoidDir: () => void;
  triggerEvent: (eventId: string) => void;
  advanceAct: (act: any) => void;
  triggerEnding: (ending: any) => void;
  setAnomalyLevel: (fn: (prev: number) => number) => void;
  openApp: (appId: any, data?: any) => void;
  completeObjective: (objId: string) => void;
  unlockCaseFileEntry: (entryId: string, level?: KnowledgeLevel) => void;
  playerName: string;
  role: string;
  act: number;
  triggerStoryFlag?: (flag: string) => void;
}

export const Terminal: React.FC<TerminalProps> = (props) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'l-init-1',
      type: 'system',
      text: 'VOID//OS COMMAND INTERPRETER (SH-4.09.2a)',
      timestamp: '08:30:00',
    },
    {
      id: 'l-init-2',
      type: 'system',
      text: 'Type "help" for a list of available diagnostic commands.',
      timestamp: '08:30:00',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const promptPrefix = props.act >= 3
    ? `VOID//ROOT:${props.cwd}#`
    : `OPERATOR@VOID-OS:${props.cwd}$`;

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeypress();

    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      const newLines: TerminalLine[] = [
        ...lines,
        {
          id: `cmd-${Date.now()}`,
          type: 'input',
          text: `${promptPrefix} ${inputVal}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];

      if (cmd) {
        setHistory(prev => [...prev, cmd]);
        setHistoryIdx(null);

        // Execute command
        const outputs = handleTerminalCommand(cmd, {
          cwd: props.cwd,
          setCwd: props.setCwd,
          vfs: props.vfs,
          unlockVoidDir: props.unlockVoidDir,
          triggerEvent: props.triggerEvent,
          advanceAct: props.advanceAct,
          triggerEnding: props.triggerEnding,
          setAnomalyLevel: props.setAnomalyLevel,
          openApp: props.openApp,
          completeObjective: props.completeObjective,
          unlockCaseFileEntry: props.unlockCaseFileEntry,
          playerName: props.playerName,
          role: props.role,
          act: props.act,
          triggerStoryFlag: props.triggerStoryFlag,
        });

        if (outputs.length === 1 && outputs[0] === '__CLEAR__') {
          setLines([]);
          setInputVal('');
          return;
        }

        outputs.forEach((out, idx) => {
          const isError = out.includes('ERROR') || out.includes('DENIED');
          const isWarning = out.includes('WARNING') || out.includes('ALERT');
          const isAscii = out.includes('====') || out.includes('---');
          newLines.push({
            id: `out-${Date.now()}-${idx}`,
            type: isError ? 'error' : isWarning ? 'glitch' : isAscii ? 'ascii' : 'output',
            text: out,
            timestamp: new Date().toLocaleTimeString(),
          });
        });
      }

      setLines(newLines);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(null);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCmds = ['help', 'ls', 'ls -a', 'cd', 'cat', 'whoami', 'ps', 'kill', 'ping', 'scan', 'decrypt', 'status', 'logs', 'manifest', 'override', 'void', 'clear'];
      const match = availableCmds.find(c => c.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full bg-[#030611] text-cyan-400 font-mono text-xs p-3 overflow-y-auto cursor-text select-text"
    >
      {/* Output Stream */}
      <div className="space-y-1">
        {lines.map((l) => {
          let colorClass = 'text-cyan-300';
          if (l.type === 'input') colorClass = 'text-slate-100 font-bold';
          if (l.type === 'error') colorClass = 'text-red-400 font-bold glow-red';
          if (l.type === 'glitch') colorClass = 'text-pink-400 font-bold glow-magenta';
          if (l.type === 'system') colorClass = 'text-green-400';
          if (l.type === 'ascii') colorClass = 'text-purple-300 whitespace-pre';

          return (
            <div key={l.id} className={`leading-relaxed break-all ${colorClass}`}>
              {l.text}
            </div>
          );
        })}
      </div>

      {/* Input Prompt */}
      <div className="flex items-center space-x-2 mt-2 pt-1 border-t border-slate-900">
        <span className={`font-bold shrink-0 ${props.act >= 3 ? 'text-pink-500' : 'text-green-400'}`}>
          {promptPrefix}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-cyan-200 font-mono text-xs caret-cyan-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
