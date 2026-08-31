import React, { useEffect } from 'react';
import { sound } from '../../audio/soundEngine';

interface BSODScreenProps {
  onRestart: () => void;
  reason?: string;
}

export const BSODScreen: React.FC<BSODScreenProps> = ({ onRestart, reason }) => {
  useEffect(() => {
    sound.playError();
  }, []);

  return (
    <div className="fixed inset-0 z-[99995] bg-[#000088] text-white font-mono p-8 sm:p-16 flex flex-col justify-between select-none">
      <div className="max-w-4xl space-y-6">
        <div className="inline-block bg-slate-200 text-[#000088] px-3 py-1 font-bold">
          VOID//OS KERNEL PANIC
        </div>

        <div className="text-xl sm:text-2xl font-bold leading-tight text-yellow-300">
          A fatal exception 0xVOID_NULL has occurred at 0028:C0011E36.
        </div>

        <p className="text-sm leading-relaxed text-slate-200">
          The operating system detected an irrecoverable collapse in the cognitive observer bridge.
          {reason ? ` Error context: ${reason}` : ' The VOID core has refused to release session memory.'}
        </p>

        <div className="p-4 bg-[#000055] border border-blue-400 space-y-2 text-xs text-cyan-200">
          <div>* Press RESTART to attempt safe mode reboot.</div>
          <div>* Telemetry memory dump saved to /Logs/crash_dump_00.dmp</div>
          <div>* Caution: Memory states may persist across power cycles.</div>
        </div>

        <div className="text-xs text-blue-300">
          REGISTER DUMP: EAX=00000000 EBX=VOIDCORE ECX=DEADBEEF EDX=OBSERVER
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            sound.playBoot();
            onRestart();
          }}
          className="px-6 py-2 bg-white text-[#000088] font-bold text-sm hover:bg-yellow-300 transition-colors cursor-pointer"
        >
          RESTART SYSTEM NOW
        </button>
      </div>
    </div>
  );
};
