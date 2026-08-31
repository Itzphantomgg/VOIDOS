import React from 'react';
import { NotificationItem, AppId } from '../../types/os';
import { AppIcon } from '../desktop/AppIcon';
import { sound } from '../../audio/soundEngine';
import { X, BellOff } from 'lucide-react';

interface NotificationContainerProps {
  notifications: NotificationItem[];
  isFlyoutOpen: boolean;
  onCloseFlyout: () => void;
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  onOpenAction?: (appId: AppId, data?: any) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  isFlyoutOpen,
  onCloseFlyout,
  onDismiss,
  onClearAll,
  onOpenAction,
}) => {
  const unreadToasts = notifications.filter(n => !n.isRead).slice(0, 3);

  return (
    <>
      {/* Active Floating Toasts (Bottom Right) */}
      <div className="fixed bottom-12 right-4 z-[9950] space-y-2 pointer-events-none flex flex-col items-end">
        {unreadToasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => {
              if (toast.actionPayload && onOpenAction) {
                sound.playClick();
                onOpenAction(toast.actionPayload.appId, toast.actionPayload.data);
              }
              onDismiss(toast.id);
            }}
            className="pointer-events-auto w-80 bg-[#0c1226]/95 border-2 border-cyan-500 p-3 rounded shadow-2xl shadow-cyan-950/80 font-mono text-xs cursor-pointer hover:border-pink-500 transition-all transform hover:-translate-y-0.5 animate-bounce-short"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <AppIcon appId={toast.appId} size={18} />
                <span className="font-bold text-cyan-300 truncate">{toast.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  onDismiss(toast.id);
                }}
                className="text-slate-400 hover:text-pink-400 p-0.5"
              >
                <X size={14} />
              </button>
            </div>
            <p className="mt-1.5 text-slate-300 text-[11px] leading-relaxed">
              {toast.message}
            </p>
            <div className="mt-2 text-[9px] text-slate-500 text-right">
              {toast.timestamp}
            </div>
          </div>
        ))}
      </div>

      {/* Flyout Notification History Drawer */}
      {isFlyoutOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-11 right-2 w-80 sm:w-96 bg-[#0a0f22] border-2 border-cyan-500 shadow-2xl z-[9960] font-mono text-xs rounded-t-sm flex flex-col max-h-[70vh]"
        >
          {/* Header */}
          <div className="p-2.5 bg-gradient-to-r from-[#00385c] to-[#1e0f3d] border-b border-cyan-700 flex justify-between items-center text-cyan-300 font-bold">
            <span>SYSTEM NOTIFICATIONS</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onClearAll();
                }}
                className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 border border-slate-600"
              >
                CLEAR
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onCloseFlyout();
                }}
                className="text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-80">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-500 flex flex-col items-center">
                <BellOff size={24} className="mb-2 opacity-50" />
                <span>NO NEW NOTIFICATIONS</span>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.actionPayload && onOpenAction) {
                      sound.playClick();
                      onOpenAction(n.actionPayload.appId, n.actionPayload.data);
                    }
                    onDismiss(n.id);
                  }}
                  className={`p-2.5 rounded border transition-colors cursor-pointer ${
                    n.severity === 'critical' || n.severity === 'anomaly'
                      ? 'bg-pink-950/30 border-pink-700 text-pink-200'
                      : 'bg-[#0e162c] border-slate-800 hover:border-cyan-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-400 mb-1">
                    <span className="truncate">{n.title}</span>
                    <span className="text-[9px] text-slate-500 font-normal">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};
