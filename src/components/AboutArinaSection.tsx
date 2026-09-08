import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  BookOpen,
  Tv,
  Gamepad2,
  Sparkles,
  Heart,
  MessageCircle,
  Copy,
  Check,
  BookmarkCheck,
  Flame,
  Palette,
  GraduationCap,
} from 'lucide-react';
import {
  ARINA_PROFILE,
  ARINA_FAVORITES,
  ARINA_DRAMAS,
  ARINA_ANIME,
  ARINA_MANGA_MANHWA,
  ARINA_GAMES,
  ICEBREAKERS,
} from '../data/arinaProfile';
import { BookRecommendation } from '../types';
import { playStampSound } from '../utils/audioSynth';
import { ArinaPortfolioSection } from './ArinaPortfolioSection';

export function AboutArinaSection() {
  const [selectedBook, setSelectedBook] = useState<BookRecommendation>(ARINA_FAVORITES[0]);
  const [activeTab, setActiveTab] = useState<'novels' | 'dramas' | 'anime' | 'manga' | 'games' | 'icebreakers'>('novels');
  const [copiedIcebreaker, setCopiedIcebreaker] = useState<string | null>(null);

  const handleCopyIcebreaker = (text: string) => {
    navigator.clipboard?.writeText(text);
    playStampSound();
    setCopiedIcebreaker(text);
    setTimeout(() => setCopiedIcebreaker(null), 2000);
  };

  return (
    <section id="arina" className="py-16 px-4 sm:px-6 bg-[#f5efe4]/60 border-y border-stone-200/90 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            Знакомство с автором
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Привет, я Арина! 👋
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans-ui">
            Студентка-программист из наукограда Реутов. Обожаю азиатские новеллы, дорамы, аниме, мангу и видеоигры!
          </p>
        </div>

        {/* Bio Card */}
        <div className="bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Avatar & Badge */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-700 p-1 shadow-lg relative">
                <div className="w-full h-full rounded-[22px] bg-stone-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
                  <span className="text-5xl select-none">👩‍💻</span>
                  <div className="absolute bottom-1 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-amber-300">
                    &lt;developer /&gt;
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-stone-900 text-xs shadow-md">
                  ✨
                </div>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-stone-900 mt-4">
                {ARINA_PROFILE.name}
              </h3>
              <p className="text-xs text-rose-800 font-semibold font-sans-ui">
                {ARINA_PROFILE.title}
              </p>
              <div className="mt-2 text-xs text-stone-500 font-sans-ui flex items-center gap-1">
                <span>📍 г. {ARINA_PROFILE.cityName}</span>
              </div>
            </div>

            {/* Story Text */}
            <div className="md:col-span-8 text-left space-y-4">
              <div className="p-4 bg-amber-50/80 border border-amber-300/90 rounded-xl text-stone-900 font-serif-display text-lg italic leading-relaxed">
                {ARINA_PROFILE.motto}
              </div>

              <div className="text-sm text-stone-700 font-sans-ui leading-relaxed space-y-2.5">
                <p>
                  {ARINA_PROFILE.bio}
                </p>
                <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <strong className="text-stone-900">Мой подход: </strong>
                  {ARINA_PROFILE.myApproach}
                </p>
              </div>

              {/* Quick Interest Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium">
                  📖 Новеллы («Ничтожество», «ORV», «SS-ранги»)
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-medium">
                  🎬 Дорамы («Счастье», «У Ён У», «Винченцо»)
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium">
                  🌸 Аниме & Манга («Моя геройская академия», «Система всемогущего дизайнера»)
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                  🎮 Genshin • Honkai • The Sims 4 • Roblox
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Books & Reading Passion: Clean Section Header Before Library */}
        <div className="pt-6 pb-4 border-b border-stone-200/80 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider font-sans-ui">
            <span>📚</span>
            <span>Библиотека интересов</span>
            <span>✨</span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-snug">
            Я многогранна, предпочитаю и люблю всё!
          </h3>
          <p className="text-stone-700 font-sans-ui text-sm sm:text-base leading-relaxed">
            Хочу поделиться своей библиотекой — может быть, тебя что-то заинтересует, и ты тоже станешь одним из поклонников. А может, ты уже! 🫣
          </p>
        </div>

        {/* Interactive Entertainment Hub */}
        <div className="space-y-6">
          
          {/* Navigation Sub-Tabs */}
          <div className="bg-stone-200/60 p-1.5 rounded-2xl border border-stone-200/80">
            <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('novels')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'novels'
                    ? 'bg-white text-rose-800 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span className="truncate">Новеллы</span>
              </button>

              <button
                onClick={() => setActiveTab('dramas')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'dramas'
                    ? 'bg-white text-indigo-800 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Tv className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
                <span className="truncate">Дорамы</span>
              </button>

              <button
                onClick={() => setActiveTab('anime')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'anime'
                    ? 'bg-white text-amber-800 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span className="truncate">Аниме</span>
              </button>

              <button
                onClick={() => setActiveTab('manga')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'manga'
                    ? 'bg-white text-pink-800 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Palette className="w-3.5 h-3.5 shrink-0 text-pink-600" />
                <span className="truncate">Манга</span>
              </button>

              <button
                onClick={() => setActiveTab('games')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'games'
                    ? 'bg-white text-emerald-800 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span className="truncate">Игры</span>
              </button>

              <button
                onClick={() => setActiveTab('icebreakers')}
                className={`py-2 px-2 sm:px-4 font-sans-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'icebreakers'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0 text-stone-700" />
                <span className="truncate">Темы</span>
              </button>
            </div>
          </div>

          {/* TAB 1: NOVELS */}
          {activeTab === 'novels' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {ARINA_FAVORITES.map((book) => (
                  <button
                    key={book.title}
                    onClick={() => {
                      playStampSound();
                      setSelectedBook(book);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] cursor-pointer ${
                      selectedBook.title === book.title
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-[1.02]'
                        : 'bg-[#fffefc] text-stone-800 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                        {book.country === 'Korea' ? '🇰🇷 Корея' : '🇨🇳 Китай'}
                      </span>
                      <h4 className="font-serif-display font-bold text-sm leading-tight mt-1 line-clamp-2">
                        {book.title}
                      </h4>
                    </div>
                    <span className="text-[11px] opacity-80 mt-2 block font-sans-ui truncate">
                      {book.author}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Book Detail Card */}
              <motion.div
                key={selectedBook.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  <div className="md:col-span-4 flex justify-center">
                    <div
                      className={`w-44 h-64 rounded-xl bg-gradient-to-br ${selectedBook.coverAccent} text-white p-5 flex flex-col justify-between shadow-2xl border border-white/20 relative overflow-hidden`}
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-amber-300">
                          <span>{selectedBook.country}</span>
                          <BookmarkCheck className="w-4 h-4 text-amber-300" />
                        </div>
                        <h4 className="font-serif-display text-xl font-bold text-white mt-4 leading-tight">
                          {selectedBook.title}
                        </h4>
                      </div>

                      <div>
                        <p className="text-xs text-stone-300 font-sans-ui">
                          {selectedBook.author}
                        </p>
                        <div className="mt-2 text-[9px] font-mono text-white/60 uppercase">
                          Библиотека Арины
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-rose-700 uppercase tracking-wider font-sans-ui">
                        О сюжете
                      </span>
                      <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                        {selectedBook.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans-ui">
                        Автор: {selectedBook.author}
                      </p>
                    </div>

                    <p className="text-sm text-stone-700 font-sans-ui leading-relaxed">
                      {selectedBook.description}
                    </p>

                    <div className="p-3.5 bg-rose-50/70 border border-rose-200/90 rounded-xl text-xs text-stone-800 font-sans-ui leading-relaxed">
                      <span className="font-bold text-rose-950 block mb-1">
                        💬 Почему я обожаю эту новеллу:
                      </span>
                      {selectedBook.arinaComment}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedBook.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}

          {/* TAB 2: DRAMAS */}
          {activeTab === 'dramas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {ARINA_DRAMAS.map((drama) => (
                <div
                  key={drama.name}
                  className="bg-[#fffefc] rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2.5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold">
                      {drama.badge}
                    </span>
                    <Tv className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h4 className="font-serif-display font-bold text-lg text-stone-900">
                    {drama.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-ui leading-relaxed">
                    {drama.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ANIME */}
          {activeTab === 'anime' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {ARINA_ANIME.map((anime) => (
                <div
                  key={anime.name}
                  className="bg-[#fffefc] rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2.5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {anime.badge}
                    </span>
                    <Flame className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="font-serif-display font-bold text-lg text-stone-900">
                    {anime.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-ui leading-relaxed">
                    {anime.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MANGA & MANHWA */}
          {activeTab === 'manga' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {ARINA_MANGA_MANHWA.map((manga) => (
                <div
                  key={manga.name}
                  className="bg-[#fffefc] rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2.5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 text-[10px] font-bold">
                      {manga.badge}
                    </span>
                    <Palette className="w-4 h-4 text-pink-600" />
                  </div>
                  <h4 className="font-serif-display font-bold text-lg text-stone-900">
                    {manga.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-ui leading-relaxed">
                    {manga.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: VIDEO GAMES */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {ARINA_GAMES.map((game) => (
                <div
                  key={game.name}
                  className="bg-[#fffefc] rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                      {game.category}
                    </span>
                    <Gamepad2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-serif-display font-bold text-xl text-stone-900">
                    {game.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans-ui leading-relaxed">
                    {game.note}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: ICEBREAKERS FOR MFM 2026 */}
          {activeTab === 'icebreakers' && (
            <div className="bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md text-left space-y-4">
              <div>
                <h3 className="font-serif-display font-bold text-2xl text-stone-900">
                  О чём со мной поболтать на фестивале?
                </h3>
                <p className="text-xs text-stone-500 font-sans-ui mt-1">
                  Нажмите на карточку, чтобы скопировать вопрос или подойти ко мне с этой темой при личной встрече!
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {ICEBREAKERS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyIcebreaker(q)}
                    className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50/80 hover:bg-amber-50 hover:border-amber-300 text-left transition-all flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-stone-200 group-hover:bg-amber-200 text-stone-700 group-hover:text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-stone-800 font-sans-ui">
                        {q}
                      </span>
                    </div>

                    <div className="shrink-0 text-stone-400 group-hover:text-amber-800">
                      {copiedIcebreaker === q ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                          <Check className="w-4 h-4" /> Скопировано
                        </span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Warm word from Arina */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-left flex items-start gap-3 shadow-xs">
          <span className="text-2xl shrink-0 select-none">☕</span>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-sans-ui block">
              Слово от сердца
            </span>
            <p className="text-xs sm:text-sm text-stone-700 font-sans-ui leading-relaxed">
              {ARINA_PROFILE.readingPhilosophy.ifInterestsDontMatch}
            </p>
          </div>
        </div>

        {/* Portfolio & Creative Projects Showcase */}
        <div className="pt-4 border-t border-stone-300/80">
          <ArinaPortfolioSection />
        </div>

      </div>
    </section>
  );
}
