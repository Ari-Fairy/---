import React, { useState, useEffect, MouseEvent } from 'react';
import { Volume2, VolumeX, Mail, Sparkles, Compass, Heart, Menu, X, Globe2, Flag } from 'lucide-react';
import {
  toggleAmbientBgm,
  startAmbientBgm,
  stopAmbientBgm,
  subscribeBgmState,
  getIsBgmPlaying,
} from '../utils/audioSynth';
import { LanguageSelector } from './LanguageSelector';
import { useAudience } from '../context/AudienceContext';

interface HeaderNavbarProps {
  onOpenMailbox: () => void;
  stampsCount: number;
  totalStamps: number;
}

export function HeaderNavbar({ onOpenMailbox, stampsCount, totalStamps }: HeaderNavbarProps) {
  const { mode, toggleMode } = useAudience();
  const [isPlaying, setIsPlaying] = useState(() => getIsBgmPlaying());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubBgm = subscribeBgmState((playing) => {
      setIsPlaying(playing);
    });
    return unsubBgm;
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isPlaying) {
      stopAmbientBgm();
    } else {
      startAmbientBgm();
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf7f2]/95 border-b border-stone-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand / Festival Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <a href="#postcard" className="flex items-center gap-2 group shrink-0">
            <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-600 via-rose-600 to-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display font-bold text-base sm:text-lg text-stone-900 tracking-wide whitespace-nowrap">
                  МФМ 2026
                </span>
                {/* 'Сувенир' hidden on mobile phones to preserve clean spacing */}
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 whitespace-nowrap hidden sm:inline-block">
                  Сувенир
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui hidden xl:block whitespace-nowrap">
                Открытка из России • Арина
              </p>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation links (displayed only on wide laptop & desktop screens where there is plenty of room) */}
        <nav className="hidden xl:flex items-center gap-2 xl:gap-4 2xl:gap-6 text-xs lg:text-sm font-medium text-stone-600 shrink-0">
          <a href="#postcard" className="hover:text-amber-800 transition-colors px-1.5 py-1 whitespace-nowrap">Открытка</a>
          <a href="#russia" className="hover:text-amber-800 transition-colors px-1.5 py-1 whitespace-nowrap">О России</a>
          <a href="#city" className="hover:text-amber-800 transition-colors px-1.5 py-1 whitespace-nowrap">Реутов</a>
          <a href="#arina" className="hover:text-amber-800 transition-colors px-1.5 py-1 whitespace-nowrap">Об Арине</a>
          <a href="#quiz" className="hover:text-amber-800 transition-colors px-1.5 py-1 whitespace-nowrap">Викторина</a>
          <a href="#survey" className="hover:text-amber-800 text-rose-700 font-semibold flex items-center gap-1 transition-colors px-1.5 py-1 whitespace-nowrap">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
            <span>Опрос & Книга</span>
          </a>
        </nav>

        {/* Right action buttons: language, stamps, sound, mailbox, and menu for tablet/mobile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Audience Mode Toggle (Hidden on mobile per Photo 3 request; visible on >= sm) */}
          <button
            type="button"
            onClick={toggleMode}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 h-8.5 sm:h-9 rounded-full bg-stone-100 hover:bg-amber-100/70 border border-stone-300/80 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors shrink-0 cursor-pointer"
            title={mode === 'citizen' ? 'Выбран режим: Гражданин РФ (нажмите, чтобы сменить на иностранного гостя)' : 'Mode: International (click to switch to citizen)'}
          >
            <span>{mode === 'citizen' ? '🇷🇺 РФ' : '🌍 World'}</span>
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Stamps badge (hidden on phone, available in dropdown or >=sm screens) */}
          <a
            href="#stamps"
            className="hidden sm:flex items-center gap-1 px-2.5 sm:px-3 py-1.5 h-8.5 sm:h-9 rounded-full bg-stone-100 border border-stone-300/80 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:border-amber-300 transition-colors shrink-0"
            title="Собранные почтовые марки"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="hidden 2xl:inline">Марки: </span>
            <span key={`nb-cnt-${stampsCount}`} className="notranslate font-mono font-bold" translate="no">
              {stampsCount}/{totalStamps}
            </span>
          </a>

          {/* Ambient BGM toggle */}
          <button
            id="btn-toggle-sound"
            onClick={handleToggleSound}
            aria-label={isPlaying ? 'Выключить музыку' : 'Включить атмосферную музыку'}
            className={`w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border transition-all shrink-0 cursor-pointer ${
              isPlaying
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-inner'
                : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
            }`}
            title={isPlaying ? 'Музыка включена (нажмите, чтобы заглушить)' : 'Включить уютную музыку'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-800 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mailbox trigger for Arina & participants */}
          <button
            id="btn-open-mailbox"
            onClick={onOpenMailbox}
            className="w-8.5 h-8.5 sm:w-auto sm:h-9 sm:px-3 sm:py-1.5 flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            title="Просмотреть полученные отзывы и рекомендации книг"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Почта Арины</span>
          </button>

          {/* Hamburger Menu Toggle (strictly for portrait tablets and mobile phones < xl) */}
          <button
            id="btn-mobile-nav"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex xl:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 items-center justify-center rounded-xl border border-stone-300/80 bg-white/95 hover:bg-stone-100 text-stone-700 transition-all cursor-pointer shrink-0"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню навигации'}
            title="Меню навигации"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-stone-800" /> : <Menu className="w-4 h-4 text-stone-800" />}
          </button>
        </div>

      </div>

      {/* Navigation Dropdown for tablets and phones (< xl) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-[#faf7f2]/98 backdrop-blur-md px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1">
            <a
              href="#postcard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-800 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            >
              <span>✉️</span>
              <span>Открытка</span>
            </a>
            <a
              href="#russia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-800 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            >
              <span>🇷🇺</span>
              <span>О России</span>
            </a>
            <a
              href="#city"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-800 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            >
              <span>🏛️</span>
              <span>Реутов</span>
            </a>
            <a
              href="#arina"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-800 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            >
              <span>👩‍💻</span>
              <span>Об Арине</span>
            </a>
            <a
              href="#quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-800 hover:bg-amber-100/60 hover:text-amber-900 transition-colors"
            >
              <span>❓</span>
              <span>Викторина</span>
            </a>
            <a
              href="#survey"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50/80 hover:bg-rose-100 transition-colors"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 shrink-0" />
              <span>Опрос & Книга</span>
            </a>

            {/* Mobile quick actions: stamps & mailbox */}
            <div className="pt-2 mt-1 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-600 px-2 sm:hidden">
              <a
                href="#stamps"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-1 text-amber-900 font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>Марки: <strong>{stampsCount}/{totalStamps}</strong></span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenMailbox();
                }}
                className="flex items-center gap-1.5 py-1 text-stone-800 font-medium cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>Почта Арины</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
