import React, { createContext, useContext, useState, useEffect } from 'react';

export type AudienceMode = 'citizen' | 'international';

interface AudienceContextType {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  toggleMode: () => void;
  getShareUrl: (targetMode?: AudienceMode) => string;
}

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AudienceMode>(() => {
    // 1. Check URL parameters
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode') || params.get('audience');
      if (urlMode === 'citizen' || urlMode === 'rf' || urlMode === 'russia') {
        return 'citizen';
      }
      if (urlMode === 'international' || urlMode === 'foreigner' || urlMode === 'world') {
        return 'international';
      }

      // 2. Check localStorage
      try {
        const saved = localStorage.getItem('mfm_audience_mode');
        if (saved === 'citizen' || saved === 'international') {
          return saved;
        }
      } catch {}
    }
    // Default to international for international festival, or citizen based on browser language
    const isRu = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ru');
    return isRu ? 'citizen' : 'international';
  });

  const setMode = (newMode: AudienceMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('mfm_audience_mode', newMode);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', newMode);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  };

  useEffect(() => {
    // Keep URL parameter in sync
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('mode')) {
        url.searchParams.set('mode', mode);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  }, [mode]);

  const getShareUrl = (targetMode?: AudienceMode) => {
    if (typeof window === 'undefined') return '';
    const m = targetMode || mode;
    const url = new URL(window.location.href);
    url.searchParams.set('mode', m);
    return url.toString();
  };

  const toggleMode = () => {
    setMode(mode === 'citizen' ? 'international' : 'citizen');
  };

  return (
    <AudienceContext.Provider value={{ mode, setMode, toggleMode, getShareUrl }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
}
