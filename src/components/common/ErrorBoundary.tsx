import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RotateCcw, X, AlertTriangle } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface AppErrorBoundaryProps {
  appName?: string;
  onClose?: () => void;
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[VOID//OS ERROR BOUNDARY] Application '${this.props.appName || 'Unknown'}' crashed:`, error, errorInfo);
    this.setState({ errorInfo });
    try {
      sound.playError();
    } catch {
      // Audio fallback safe
    }
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#080511] text-slate-200 font-mono text-xs p-6 select-none space-y-4">
          <div className="p-4 bg-[#12081c] border-2 border-red-500 rounded max-w-md w-full shadow-2xl shadow-red-950 space-y-3">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-sm border-b border-red-900/60 pb-2">
              <ShieldAlert size={18} className="animate-pulse text-red-500" />
              <span>VOID//OS APPLICATION EXCEPTION</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-400">
                APPLICATION: <span className="text-cyan-300 font-bold">{this.props.appName || 'SUBSYSTEM'}</span>
              </div>
              <div className="text-slate-400">
                STATUS: <span className="text-red-400 font-bold">RUNTIME FAULT CONTAINED</span>
              </div>
            </div>

            <div className="p-2 bg-black/80 border border-red-900/80 rounded text-[11px] text-red-300 overflow-x-auto max-h-32 font-mono whitespace-pre-wrap">
              {this.state.error?.message || 'An unknown execution error occurred.'}
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-red-900/40">
              {this.props.onClose && (
                <button
                  onClick={this.props.onClose}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs border border-slate-600 cursor-pointer flex items-center space-x-1"
                >
                  <X size={12} />
                  <span>Close Window</span>
                </button>
              )}
              <button
                onClick={this.handleRestart}
                className="px-3 py-1.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded text-xs border border-red-500 cursor-pointer flex items-center space-x-1 shadow-retro-magenta"
              >
                <RotateCcw size={12} />
                <span>Restart App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface RootErrorBoundaryProps {
  children: ReactNode;
}

interface RootErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<RootErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[VOID//OS CRITICAL FAULT] Root Error Boundary caught crash:', error, errorInfo);
  }

  handleEmergencyReboot = () => {
    try {
      localStorage.removeItem('VOID_OS_SAVE_V1');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#020308] text-slate-200 font-mono flex flex-col items-center justify-center p-6 z-[999999] select-none">
          <div className="max-w-lg w-full bg-[#0b0816] border-2 border-red-500 p-6 rounded shadow-2xl space-y-4 text-xs">
            <div className="flex items-center space-x-3 text-red-400 font-bold text-base border-b border-red-800/80 pb-3">
              <AlertTriangle size={24} className="text-red-500 animate-pulse" />
              <span>VOID//OS SYSTEM RECOVERY FALLBACK</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              A critical runtime error halted the OS renderer. The recovery kernel prevented a total system collapse.
            </p>

            <div className="p-3 bg-black/90 border border-red-900 rounded font-mono text-[11px] text-red-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {this.state.error?.stack || this.state.error?.message || 'Unknown kernel exception'}
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 cursor-pointer"
              >
                Attempt Resume
              </button>
              <button
                onClick={this.handleEmergencyReboot}
                className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded border border-red-500 cursor-pointer shadow-retro-magenta"
              >
                Emergency Reboot & Reset
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
