import React from 'react';

interface CRTOverlayProps {
  enabled: boolean;
  curvature: boolean;
  bloom: boolean;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ enabled, curvature, bloom }) => {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Scanline pattern */}
      <div className="absolute inset-0 crt-scanlines opacity-40 mix-blend-overlay pointer-events-none" />
      
      {/* CRT Vignette shadow */}
      <div className={`absolute inset-0 crt-vignette ${curvature ? 'opacity-80' : 'opacity-40'} pointer-events-none`} />

      {/* Screen phosphor flicker */}
      <div className="absolute inset-0 bg-cyan-500/[0.015] animate-flicker pointer-events-none" />
    </div>
  );
};
