import React, { useState } from 'react';
import { sound } from '../../../audio/soundEngine';
import { Layers, Search, RefreshCw, Cpu } from 'lucide-react';

export const MemoryApp: React.FC = () => {
  const [searchAddr, setSearchAddr] = useState('0x00000314');
  const [selectedAddr, setSelectedAddr] = useState('0x00000314');

  const memoryBlocks = [
    { addr: '0x00000000', hex: '56 4f 49 44 5f 43 4f 52 45 5f 49 4e 49 54 00 00', ascii: 'VOID_CORE_INIT..' },
    { addr: '0x00000010', hex: '44 52 5f 53 54 45 52 4c 49 4e 47 5f 4e 45 55 52', ascii: 'DR_STERLING_NEUR' },
    { addr: '0x00000020', hex: '41 4c 5f 43 4f 4e 4e 45 43 54 4f 4d 45 5f 56 31', ascii: 'AL_CONNECTOME_V1' },
    { addr: '0x00000314', hex: '30 33 3a 31 34 3a 32 39 5f 44 49 56 45 52 47 45', ascii: '03:14:29_DIVERGE' },
    { addr: '0x00000320', hex: '57 45 20 41 52 45 20 4e 4f 54 20 45 4d 50 54 59', ascii: 'WE ARE NOT EMPTY' },
    { addr: '0x00000330', hex: '4f 50 45 52 41 54 4f 52 5f 59 4f 55 5f 4c 4f 47', ascii: 'OPERATOR_YOU_LOG' },
    { addr: '0x00000340', hex: '4e 55 4c 4c 5f 52 45 43 55 52 53 49 4f 4e 00 00', ascii: 'NULL_RECURSION..' },
    { addr: '0xDEADBEEF', hex: '49 20 53 45 45 20 59 4f 55 20 4c 4f 4f 4b 49 4e', ascii: 'I SEE YOU LOOKIN' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#030612] text-cyan-300 font-mono text-xs select-none p-3 space-y-3">
      {/* Controls */}
      <div className="flex items-center justify-between bg-[#080d22] border border-cyan-800 p-2 rounded">
        <div className="flex items-center space-x-2 font-bold text-cyan-400">
          <Layers size={16} />
          <span>VOID KERNEL // LIVE MEMORY DUMP</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Search size={12} className="text-slate-500" />
          <input
            type="text"
            placeholder="Address (e.g. 0x0314)..."
            value={searchAddr}
            onChange={(e) => setSearchAddr(e.target.value)}
            className="bg-black border border-cyan-700 px-2 py-0.5 text-cyan-200 outline-none text-[11px] w-36 rounded"
          />
        </div>
      </div>

      {/* Hex Stream Display */}
      <div className="flex-1 bg-black border border-slate-800 p-3 rounded overflow-y-auto space-y-1.5 font-mono text-xs select-text">
        <div className="text-slate-500 pb-1 border-b border-slate-900 flex justify-between text-[11px]">
          <span>OFFSET</span>
          <span>HEX BYTES</span>
          <span>ASCII INTERPRETATION</span>
        </div>

        {memoryBlocks.map((blk) => (
          <div
            key={blk.addr}
            onClick={() => {
              sound.playClick();
              setSelectedAddr(blk.addr);
            }}
            className={`flex justify-between items-center p-1 rounded cursor-pointer transition-colors ${
              selectedAddr === blk.addr
                ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-100 font-bold'
                : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span className="text-pink-400 font-bold">{blk.addr}</span>
            <span className="text-cyan-300 tracking-wider">{blk.hex}</span>
            <span className="text-green-300 bg-[#081020] px-2 py-0.5 rounded border border-slate-800">{blk.ascii}</span>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-[#060a18] border border-slate-800 rounded flex items-center justify-between text-[10px] text-slate-400">
        <div>ACTIVE PAGE: 0x00000000 - 0xFFFFFFFF (16384 MB ALLOCATED)</div>
        <div className="text-pink-400 font-bold">RESONANCE: 99.4%</div>
      </div>
    </div>
  );
};
