import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Heart, Sparkles, GraduationCap, Building2, Bell, Waves, Volume2, Shield } from 'lucide-react';
import { playStampSound, playBellSound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface CitySpotlightSectionProps {
  onUnlockStamp?: (id: string) => void;
}

export function CitySpotlightSection({ onUnlockStamp }: CitySpotlightSectionProps) {
  // Exactly 4 tabs requested: 1. Ponds (first!), 2. School, 3. Science, 4. Symbol
  const [activeTab, setActiveTab] = useState<'ponds' | 'school' | 'science' | 'symbol'>('ponds');
  const [likes, setLikes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mfm_reutov_likes');
      return saved ? parseInt(saved, 10) : 86;
    } catch {
      return 86;
    }
  });
  const [hasLiked, setHasLiked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mfm_reutov_user_liked') === 'true';
    } catch {
      return false;
    }
  });
  const [isRinging, setIsRinging] = useState(false);

  const handleLikeCity = () => {
    if (!hasLiked) {
      playStampSound();
      const next = likes + 1;
      setLikes(next);
      setHasLiked(true);
      if (onUnlockStamp) {
        onUnlockStamp('stamp-reutov');
      }
      try {
        localStorage.setItem('mfm_reutov_likes', next.toString());
        localStorage.setItem('mfm_reutov_user_liked', 'true');
      } catch {}
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#4f46e5', '#f59e0b', '#e11d48'],
      });
    }
  };

  const handleRingBell = () => {
    playBellSound();
    setIsRinging(true);
    if (onUnlockStamp) onUnlockStamp('stamp-reutov');
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#d97706', '#b45309'],
    });
    setTimeout(() => setIsRinging(false), 2200);
  };

  const reutovCards = {
    ponds: {
      id: 'ponds',
      title: '«Чистые пруды» (Фабричный пруд)',
      tag: 'Вкладыш №1 • Уютный уголок и природа',
      icon: Waves,
      imageUrl: '/images/reutov-pond.jpg',
      badge: 'Фабричный пруд в Реутове',
      story: 'Сердце Реутова — живописный Фабричный пруд с деревянными мостками, плакучими ивами, утками и тихими аллеями. Для меня это самое любимое место в городе: прийти сюда в хорошую погоду, посидеть на скамейке у спокойной воды, взять горячий чай или кофе, подышать свежим воздухом и почитать новые главы любимых новелл под шелест листвы!',
      accent: 'from-blue-600 to-cyan-700',
    },
    school: {
      id: 'school',
      title: 'МБОУ «СОШ № 6» г. Реутов',
      tag: 'Вкладыш №2 • Из школьной истории',
      icon: GraduationCap,
      imageUrl: '/images/reutov-school.jpg',
      badge: 'Школа №6 г. Реутов',
      story: 'В школе №6 города Реутов прошли мои школьные годы. Я имею много воспоминаний, как плохих, так и хороших. Например, я думала, что полюблю химию, а по итогу возненавидела: на первом же уроке учительница написала на доске что-то совершенно неразборчивое. Я вежливо спросила, какой именно элемент из таблицы Менделеева там написан, потому что разобрать почерк было просто невозможно! А учительница возмутилась, заявила, что я обязана это знать сама, и прямо на первом же уроке влепила мне жирную двойку! С тех пор химия для меня закрытая тема.',
      accent: 'from-amber-600 to-rose-700',
    },
    science: {
      id: 'science',
      title: 'Наукоград РФ: НПО машиностроения',
      tag: 'Вкладыш №3 • Космос и Челомей',
      icon: Building2,
      imageUrl: '/images/reutov-npo.jpg',
      badge: 'Академик Челомей и космос',
      story: 'Реутов стал официальным наукоградом РФ благодаря легендарному НПО машиностроения. В 1955 году выдающийся конструктор академик Владимир Николаевич Челомей искал базу для создания передовых крылатых ракет и космических аппаратов. Реутов был выбран идеально: близость к Москве позволяла оперативно координировать науку, а прямая тупиковая железнодорожная ветка от Курского вокзала к старому механическому заводу обеспечивала режим секретности при транспортировке тяжелых конструкций. Челомей превратил Реутов в ведущее космическое ОКБ-52, где создал пилотируемые орбитальные станции «Алмаз», ракеты-носители «Протон» и комплексы П-35!',
      accent: 'from-indigo-600 to-blue-800',
    },
    symbol: {
      id: 'symbol',
      title: 'Герб Реутова: Колокол «Реут» и Голубь',
      tag: 'Вкладыш №4 • Символ города и мира',
      icon: Shield,
      imageUrl: '/images/reutov-coat.png',
      badge: 'Колокол «Реут» и Голубь мира',
      story: 'На гербе и флаге Реутова в лазоревом поле сияет золотой сторожевой колокол, увенчанный белым голубем мира. Колокол напоминает о дозорном колоколе-богатыре XVI века, берегшем покой родной земли, а голубь символизирует мир, созидание и добрую весть. Колокол и голубь вместе олицетворяют верность истории и мирное будущее!',
      accent: 'from-rose-700 to-red-900',
    },
  };

  const currentCard = reutovCards[activeTab];

  return (
    <section id="city" className="py-10 px-4 sm:px-6 bg-[#faf7f2] relative scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Section Header (matching screenshot IMG_20260908_162024_585.jpg) */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>РОДНОЙ КРАЙ АРИНЫ</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            Город Реутов: Наукоград, Школа №6 и Чистые пруды
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans-ui leading-relaxed">
            Уютный подмосковный наукоград, где я выросла, училась в школе №6 и влюбилась в программирование.
          </p>
        </div>

        {/* Main Reutov Card (matching screenshot IMG_20260908_162024_764.jpg) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-left relative overflow-hidden">
          
          {/* Card Top Sub-Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700 font-sans-ui">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Г. РЕУТОВ • МОСКОВСКАЯ ОБЛАСТЬ</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
              Наукоград РФ
            </span>
          </div>

          {/* Light Blue Box: Герб и Колокол «Реут» + Bell Button */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm sm:text-base">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>Герб и Колокол «Реут»</span>
              </div>
              <button
                type="button"
                onClick={handleRingBell}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 w-fit"
              >
                <Bell className={`w-3.5 h-3.5 text-amber-200 ${isRinging ? 'animate-bounce' : ''}`} />
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isRinging ? 'Колокол звенит над Русью...' : 'Ударить в Сторожевой колокол'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans-ui leading-relaxed">
              На гербе Реутова сияет золотой колокол. Словно звон колокола, передающий вести, этот цифровой сувенир летит к участникам МФМ 2026! Нажмите на кнопку выше, чтобы услышать его звон!
            </p>
          </div>

          {/* Title & History of Reutov */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              История возникновения Реутова
            </h3>
            <p className="text-stone-700 font-sans-ui text-sm sm:text-base leading-relaxed">
              История Реутова насчитывает более 500 лет — первое летописное упоминание датируется 1573 годом. В XVI веке на холмах к востоку от Москвы проходила дозорная сигнальная линия, защищавшая подступы к столице. На высокой сторожевой вышке висел огромный колокол «Реут»: завидя неприятеля, дозорные со всей силы били в набат, и низкий гулкий звон предупреждал об опасности за десятки вёрст, доходя прямо до Кремля. Именно от этого сторожевого колокола и пошло имя города! Позже купец Сергей Мазурин построил здесь хлопкопрядильную мануфактуру и перегородил плотиной речку Серебрянку, создав любимый Фабричный пруд. А в XX веке академик Владимир Челомей основал здесь НПО машиностроения, превратив Реутов в космический наукоград страны.
            </p>
          </div>

          {/* Greeting Box right inside the card at bottom (matching screenshot) */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs text-stone-400 uppercase tracking-wider block font-sans-ui font-semibold">
                ПРИВЕТ РОДНОМУ ГОРОДУ
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                {likes} тёплых откликов
              </span>
            </div>

            <button
              id="btn-like-city"
              type="button"
              onClick={handleLikeCity}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-blue-100 text-blue-800 border border-blue-300 shadow-inner'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs active:scale-95'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
              <span>{hasLiked ? 'Марка получена! Привет передан ❤️' : 'Передать привет Реутову'}</span>
            </button>
          </div>

        </div>

        {/* 2. ЧЕТЫРЕ ВКЛАДЫША (ТАБЛИЧКИ): 1. Пруды, 2. Школа, 3. Наукоград, 4. Герб */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-sans-ui">
                Уголки и хроники
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                Четыре вкладыша о Реутове
              </h3>
            </div>
            <p className="text-xs text-stone-500 font-sans-ui">
              Нажимай на вкладыши, чтобы открыть личные воспоминания и фотографии
            </p>
          </div>

          {/* 4 Tabs Selector */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(Object.keys(reutovCards) as Array<keyof typeof reutovCards>).map((key) => {
              const card = reutovCards[key];
              const Icon = card.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    playStampSound();
                    setActiveTab(key);
                    if (onUnlockStamp) onUnlockStamp('stamp-reutov');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-blue-50/90 border-blue-500 text-blue-950 shadow-sm ring-1 ring-blue-400'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-stone-400'}`} />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {card.tag.split('•')[0].trim()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block leading-snug">
                      {card.title.split('(')[0]}
                    </span>
                    <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 font-sans-ui">
                      {card.tag.split('•')[1]?.trim() || card.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Card Showcase Display */}
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Visual Photo Banner */}
            <div className={`lg:col-span-5 relative h-56 sm:h-64 rounded-2xl overflow-hidden group shadow-inner ${
              currentCard.id === 'symbol'
                ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-stone-950 flex items-center justify-center p-6'
                : 'bg-stone-900'
            }`}>
              <img
                src={currentCard.imageUrl}
                alt={currentCard.title}
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  currentCard.id === 'symbol'
                    ? 'h-44 w-auto object-contain drop-shadow-2xl'
                    : 'w-full h-full object-cover'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white pointer-events-none">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-semibold text-white w-fit mb-1">
                  {currentCard.badge}
                </span>
                <h4 className="font-serif-display text-base sm:text-lg font-bold text-white">
                  {currentCard.title}
                </h4>
              </div>
            </div>

            {/* Content & Personal Story */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-sans-ui">
                  {currentCard.tag}
                </span>
              </div>

              <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                {currentCard.title}
              </h4>

              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-stone-200/90">
                <p className="font-handwriting text-xl sm:text-2xl text-stone-800 leading-relaxed">
                  «{currentCard.story}»
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span>г. Реутов • Наукоград Российской Федерации</span>
                <span className="font-semibold text-blue-800">{currentCard.tag.split('•')[0].trim()}</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

