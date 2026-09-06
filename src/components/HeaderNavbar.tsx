import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mail, Sparkles, Compass, Heart } from 'lucide-react';
import { toggleAmbientBgm, subscribeBgmState, getIsBgmPlaying } from '../utils/audioSynth';

interface HeaderNavbarProps {
  onOpenMailbox: () => void;
  stampsCount: number;
  totalStamps: number;
}

export function HeaderNavbar({ onOpenMailbox, stampsCount, totalStamps }: HeaderNavbarProps) {
  const [isPlaying, setIsPlaying] = useState(() => getIsBgmPlaying());

  useEffect(() => {
    const unsubscribe = subscribeBgmState((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggleSound = () => {
    toggleAmbientBgm();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf7f2]/90 border-b border-stone-200/80 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand & Festival badge */}
        <div className="flex items-center gap-3">
          <a href="#postcard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-rose-600 to-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display font-bold text-lg text-stone-900 tracking-wide">
                  МФМ 2026
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                  Сувенир
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui hidden sm:block">
                Открытка из России • Арина
              </p>
            </div>
          </a>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#postcard" className="hover:text-amber-800 transition-colors">Открытка</a>
          <a href="#russia" className="hover:text-amber-800 transition-colors">О России</a>
          <a href="#city" className="hover:text-amber-800 transition-colors">Город рейсов</a>
          <a href="#arina" className="hover:text-amber-800 transition-colors">Об Арине</a>
          <a href="#quiz" className="hover:text-amber-800 transition-colors">Викторина</a>
          <a href="#survey" className="hover:text-amber-800 text-rose-700 font-semibold flex items-center gap-1 transition-colors">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Опрос & Книга
          </a>
        </nav>

        {/* Right action buttons: stamps, sound, mailbox */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Stamps badge */}
          <a
            href="#stamps"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-300/80 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:border-amber-300 transition-colors"
            title="Собранные почтовые марки"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Марки: {stampsCount}/{totalStamps}</span>
          </a>

          {/* Ambient BGM toggle */}
          <button
            id="btn-toggle-sound"
            onClick={handleToggleSound}
            aria-label={isPlaying ? 'Выключить музыку' : 'Включить атмосферную музыку'}
            className={`p-2 rounded-xl border transition-all ${
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
            title="Просмотреть полученные отзывы и рекомендации книг"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Почта Арины</span>
          </button>
        </div>

      </div>
    </header>
  );
}
