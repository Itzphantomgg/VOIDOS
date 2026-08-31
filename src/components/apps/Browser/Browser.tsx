import React, { useState } from 'react';
import { WebSitePage } from '../../../types/apps';
import { initialWebsites } from '../../../data/websites';
import { sound } from '../../../audio/soundEngine';
import { ArrowLeft, ArrowRight, RotateCcw, Globe, Search, Lock, Bookmark } from 'lucide-react';

interface BrowserProps {
  onVisitWebsite: (url: string) => void;
  act: number;
}

export const Browser: React.FC<BrowserProps> = ({ onVisitWebsite, act }) => {
  const [websites, setWebsites] = useState<Record<string, WebSitePage>>(initialWebsites);
  const [currentUrl, setCurrentUrl] = useState('netseek.internal');
  const [urlInput, setUrlInput] = useState('netseek.internal');
  const [history, setHistory] = useState<string[]>(['netseek.internal']);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (url: string) => {
    let clean = url.trim().toLowerCase().replace(/^https?:\/\//, '');
    if (!clean) clean = 'netseek.internal';

    // Check alias
    if (clean === 'void://net' || clean === 'voidnet') {
      clean = 'voidnet.core';
    }

    const newHist = history.slice(0, historyIdx + 1);
    newHist.push(clean);
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
    setCurrentUrl(clean);
    setUrlInput(clean);
    onVisitWebsite(clean);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      const target = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setCurrentUrl(target);
      setUrlInput(target);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      const target = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      setCurrentUrl(target);
      setUrlInput(target);
    }
  };

  const activePage = websites[currentUrl] || {
    url: currentUrl,
    title: '404 - Node Not Found',
    contentTitle: 'HTTP 404 - ROUTE NOT FOUND',
    lastUpdated: '1999',
    category: 'System Error',
    htmlContent: `
      <div class="text-center py-12 space-y-3 font-mono text-xs">
        <div class="text-3xl text-pink-500 font-bold">404 NOT FOUND</div>
        <p class="text-slate-400">The requested URI <strong>${currentUrl}</strong> was not indexed on the Aethelgard Intranet.</p>
        <p class="text-slate-500 text-[11px]">Try searching on <a href="netseek.internal" class="text-cyan-400 underline">netseek.internal</a>.</p>
      </div>
    `,
  };

  // Intercept click on links in rendered HTML
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href) {
        sound.playClick();
        navigateTo(href);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none">
      {/* Browser Controls */}
      <div className="bg-[#0b1022] p-1.5 border-b border-slate-800 flex items-center space-x-1.5">
        <button
          onClick={() => {
            sound.playClick();
            handleBack();
          }}
          disabled={historyIdx === 0}
          className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 cursor-pointer"
          title="Back"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={() => {
            sound.playClick();
            handleForward();
          }}
          disabled={historyIdx >= history.length - 1}
          className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 disabled:opacity-40 text-cyan-300 border border-slate-700 cursor-pointer"
          title="Forward"
        >
          <ArrowRight size={14} />
        </button>
        <button
          onClick={() => {
            sound.playClick();
            navigateTo(currentUrl);
          }}
          className="p-1 rounded bg-[#131b36] hover:bg-cyan-950 text-cyan-300 border border-slate-700 cursor-pointer"
          title="Reload"
        >
          <RotateCcw size={14} />
        </button>

        {/* Address Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sound.playClick();
            navigateTo(urlInput);
          }}
          className="flex-1 flex items-center bg-[#030612] border border-slate-700 px-2 py-0.5 rounded"
        >
          {currentUrl.includes('void') ? (
            <Lock size={12} className="text-pink-500 mr-1.5" />
          ) : (
            <Globe size={12} className="text-cyan-400 mr-1.5" />
          )}
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="bg-transparent border-none outline-none text-cyan-200 text-xs w-full font-mono placeholder:text-slate-600"
          />
        </form>

        <button
          onClick={() => {
            sound.playClick();
            navigateTo(urlInput);
          }}
          className="px-2.5 py-0.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 rounded text-xs cursor-pointer font-bold"
        >
          GO
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="bg-[#080d1e] px-2 py-0.5 border-b border-slate-800 flex items-center space-x-3 text-[10px] text-slate-400">
        <span className="flex items-center space-x-1 text-slate-500">
          <Bookmark size={10} />
          <span>PORTALS:</span>
        </span>
        <button
          onClick={() => {
            sound.playClick();
            navigateTo('netseek.internal');
          }}
          className="hover:text-cyan-300"
        >
          NetSeek
        </button>
        <button
          onClick={() => {
            sound.playClick();
            navigateTo('aethelgard.lab');
          }}
          className="hover:text-cyan-300"
        >
          Aethelgard Labs
        </button>
        <button
          onClick={() => {
            sound.playClick();
            navigateTo('techbbs.retro');
          }}
          className="hover:text-cyan-300"
        >
          Tech BBS
        </button>
        <button
          onClick={() => {
            sound.playClick();
            navigateTo('archive.diary');
          }}
          className="hover:text-cyan-300"
        >
          Sterling Diary
        </button>
        {act >= 3 && (
          <button
            onClick={() => {
              sound.playClick();
              navigateTo('voidnet.core');
            }}
            className="text-pink-400 hover:text-pink-300 font-bold animate-pulse"
          >
            VOIDNET
          </button>
        )}
      </div>

      {/* Web Page Viewport */}
      <div
        onClick={handleContentClick}
        className="flex-1 overflow-y-auto p-4 bg-[#040610] text-slate-300 select-text font-sans leading-relaxed"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: activePage.htmlContent }}
            className="prose prose-invert max-w-none text-xs"
          />
        </div>
      </div>

      {/* Browser Footer Status */}
      <div className="bg-[#050814] px-3 py-1 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>STATUS: 200 OK // INTERNAL MESH</span>
        <span>SECURITY: AETHELGARD DOMAIN</span>
      </div>
    </div>
  );
};
