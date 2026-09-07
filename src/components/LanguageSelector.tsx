import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Globe, Search, Check, X } from 'lucide-react';
import { LANGUAGES, getCurrentLanguage, applyLanguage, triggerGoogleCombo, setGoogleTransCookie, LanguageOption } from '../utils/translator';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState<string>(() => getCurrentLanguage());
  const [searchQuery, setSearchQuery] = useState('');
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Sync language code from localStorage or cookies
    const active = getCurrentLanguage();
    setCurrentLangCode(active);

    // Ensure default English (or saved preference) translates automatically without user having to click
    if (active !== 'ru') {
      setGoogleTransCookie(active);
      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if (triggerGoogleCombo(active) || tries > 80) {
          clearInterval(t);
        }
      }, 50);
      return () => clearInterval(t);
    }
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentLang = useMemo(() => {
    return LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];
  }, [currentLangCode]);

  const popularLanguages = useMemo(() => {
    return LANGUAGES.filter((l) => l.popular);
  }, []);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectLanguage = (lang: LanguageOption) => {
    setCurrentLangCode(lang.code);
    setIsOpen(false);
    applyLanguage(lang.code);
  };

  return (
    <div className="relative notranslate">
      {/* Trigger Button in Header */}
      <button
        ref={triggerButtonRef}
        type="button"
        id="btn-language-selector"
        onClick={() => {
          setSearchQuery('');
          setIsOpen(!isOpen);
        }}
        aria-label="Select language / Выбрать язык"
        className="flex items-center gap-1.5 px-2 sm:px-2.5 h-8.5 sm:h-9 rounded-xl border border-stone-300/80 bg-white/95 hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs hover:border-amber-400 transition-all cursor-pointer shrink-0"
        title="Change language / Сменить язык"
      >
        <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className="text-sm leading-none shrink-0">{currentLang.flag}</span>
        <span className="font-medium hidden xl:inline truncate max-w-[75px]">
          {currentLang.nativeName}
        </span>
        <span className="text-[10px] text-stone-500 font-mono hidden sm:inline uppercase">
          {currentLang.code.split('-')[0]}
        </span>
      </button>

      {/* Language Selection Modal - Mounted via Portal to document.body */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs notranslate animate-in fade-in duration-150">
            {/* Backdrop dismiss */}
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog Card - Perfectly Centered */}
            <div className="relative z-10 w-full max-w-[350px] max-h-[82vh] max-h-[82dvh] bg-white rounded-2xl shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
              
              {/* Header */}
              <div className="p-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/90 shrink-0">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-700" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Select Language / Язык</h4>
                    <p className="text-[10px] text-stone-500">World Youth Festival 2026</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search box */}
              <div className="p-2.5 border-b border-stone-100 shrink-0">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search language / Поиск языка..."
                    autoFocus
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans-ui"
                  />
                </div>
              </div>

              {/* Quick Popular Picks (if not searching) */}
              {!searchQuery && (
                <div className="p-2.5 border-b border-stone-100 bg-amber-50/30 shrink-0">
                  <div className="text-[10px] uppercase font-bold text-amber-900/80 mb-1.5 px-1 tracking-wider">
                    Popular / Основные языки
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {popularLanguages.slice(0, 9).map((lang) => {
                      const isSelected = lang.code === currentLangCode;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleSelectLanguage(lang)}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-600 text-white font-bold'
                              : 'bg-white hover:bg-amber-100/60 text-stone-800 border border-stone-200/70'
                          }`}
                        >
                          <span className="text-sm leading-none">{lang.flag}</span>
                          <span className="truncate text-[11px]">{lang.nativeName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Full Scrollable List */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-1.5 divide-y divide-stone-50">
                <div className="text-[10px] uppercase font-bold text-stone-400 mb-1 px-2 pt-1 tracking-wider">
                  {searchQuery ? `Found (${filteredLanguages.length})` : 'All 50+ Languages / Все языки'}
                </div>
                {filteredLanguages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-400">
                    Язык не найден / Language not found
                  </div>
                ) : (
                  filteredLanguages.map((lang) => {
                    const isSelected = lang.code === currentLangCode;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguage(lang)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : 'hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <div>
                            <div className="font-semibold text-stone-900 group-hover:text-amber-800">
                              {lang.nativeName}
                            </div>
                            <div className="text-[10px] text-stone-400">
                              {lang.name}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer note */}
              <div className="p-2 border-t border-stone-100 bg-stone-50 text-[10px] text-stone-500 text-center font-sans-ui shrink-0">
                Default: 🇬🇧 English • Powered by Google Translate
              </div>

            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
