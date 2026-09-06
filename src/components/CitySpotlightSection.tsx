import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Heart, Sparkles, Coffee, Code2, GraduationCap, Building2, Bell, Waves } from 'lucide-react';
import { playStampSound } from '../utils/audioSynth';
import { ARINA_PROFILE } from '../data/arinaProfile';
import confetti from 'canvas-confetti';

interface CitySpotlightSectionProps {
  onUnlockStamp?: (id: string) => void;
}

export function CitySpotlightSection({ onUnlockStamp }: CitySpotlightSectionProps) {
  const [activeTab, setActiveTab] = useState<'ponds' | 'school' | 'science' | 'history'>('ponds');
  const [likes, setLikes] = useState(86);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLikeCity = () => {
    if (!hasLiked) {
      playStampSound();
      setLikes((l) => l + 1);
      setHasLiked(true);
      if (onUnlockStamp) {
        onUnlockStamp('stamp-reutov');
      }
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#4f46e5', '#f59e0b', '#e11d48'],
      });
    }
  };

  const reutovCards = {
    ponds: {
      id: 'ponds',
      title: '«Чистые пруды» (Фабричный пруд)',
      tag: 'Уютный уголок и природа',
      icon: Waves,
      imageUrl: '/images/reutov-pond.jpg',
      badge: 'Фабричный пруд в Реутове',
      story: 'Сердце Реутова — живописный Фабричный пруд с деревянными мостками, плакучими ивами, утками и тихими аллеями. Для меня это самое любимое место в городе: прийти сюда в хорошую погоду, посидеть на скамейке у спокойной воды, взять горячий чай или кофе, подышать свежим воздухом и почитать новые главы любимых новелл под шелест листвы!',
      accent: 'from-blue-600 to-cyan-700',
    },
    school: {
      id: 'school',
      title: 'МБОУ «СОШ № 6» г. Реутов',
      tag: 'Школьная история: Школа №6',
      icon: GraduationCap,
      imageUrl: '/images/reutov-school.jpg',
      badge: 'Школа №6 г. Реутов',
      story: 'В школе №6 города Реутов прошли мои школьные годы. Я имею много воспоминаний, как плохих, так и хороших. Например, я думала, что полюблю химию, а по итогу возненавидела: на первом же уроке учительница написала на доске что-то совершенно неразборчивое. Я вежливо спросила, какой именно элемент из таблицы Менделеева там написан, потому что разобрать почерк было просто невозможно! А учительница возмутилась, заявила, что я обязана это знать сама, и прямо на первом же уроке влепила мне жирную двойку! С тех пор химия для меня закрыта навсегда.',
      accent: 'from-amber-600 to-rose-700',
    },
    science: {
      id: 'science',
      title: 'Наукоград РФ: НПО машиностроения',
      tag: 'Космос и Ракетостроение',
      icon: Building2,
      imageUrl: '/images/reutov-npo.jpg',
      badge: 'П-35 и НПО машиностроения',
      story: 'Реутов — не просто уютный спутник Москвы, а официальный наукоград Российской Федерации! Здесь расположено знаменитое АО «ВПК «НПО машиностроения», основанное выдающимся конструктором академиком В. Н. Челомеем. Предприятие создавало легендарные космические станции «Алмаз», спутники и крылатые ракеты (как крылатая ракета П-35 на монументе у проходной предприятия).',
      accent: 'from-indigo-600 to-blue-800',
    },
    history: {
      id: 'history',
      title: 'Герб Реутова: Колокол «Реут» и Голубь',
      tag: 'Символ города и мир',
      icon: Bell,
      imageUrl: '/images/reutov-coat.png',
      badge: 'Колокол «Реут» с XV века',
      story: 'На гербе и флаге Реутова в лазоревом поле сияет золотой сторожевой колокол, увенчанный голубем мира. По старинному преданию, в XV–XVII веках на этой возвышенности проходила сторожевая оборонительная линия Москвы. При приближении врага колокол гудел («ревел») низким предупреждающим басом, извещая Москву. От этого сторожевого колокола «Реута» и произошло имя нашего города!',
      accent: 'from-rose-700 to-red-900',
    },
  };

  const currentCard = reutovCards[activeTab];

  return (
    <section id="city" className="py-16 px-4 sm:px-6 bg-[#faf7f2] relative">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            Родной край Арины
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Город Реутов: Наукоград, Школа №6 и Чистые пруды
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans-ui">
            Уютный подмосковный наукоград, где я выросла, училась в школе №6 и влюбилась в программирование.
          </p>
        </div>

        {/* City Concept Banner & Polaroids Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Atmospheric Story Card */}
          <div className="lg:col-span-5 bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>г. Реутов • Московская область</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
                Наукоград РФ
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold text-blue-950">Герб и Колокол «Реут»</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans-ui">
                На гербе Реутова сияет золотой колокол. Словно звон колокола, передающий вести, этот цифровой сувенир летит к участникам МФМ 2026!
              </p>
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-stone-900 leading-snug">
              «Здесь тихие пруды соседствуют с космическими технологиями»
            </h3>

            <p className="text-sm text-stone-600 font-sans-ui leading-relaxed">
              Реутов расположен вплотную к востоку Москвы. Здесь удивительный контраст: с одной стороны — передовые космические инженеры НПО Машиностроения, а с другой — уютные тенистые парки у Фабричного пруда, где так здорово гулять и думать о будущем.
            </p>

            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-sans-ui">
                  Привет родному городу
                </span>
                <span className="text-sm font-bold text-stone-800">
                  {likes} тёплых откликов
                </span>
              </div>
              <button
                id="btn-like-city"
                onClick={handleLikeCity}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-blue-100 text-blue-800 border border-blue-300 shadow-inner'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>{hasLiked ? 'Марка получена! ❤️' : 'Передать привет Реутову'}</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Tabs & Showcase */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Interactive Tab Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(reutovCards) as Array<keyof typeof reutovCards>).map((key) => {
                const card = reutovCards[key];
                const Icon = card.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      playStampSound();
                      setActiveTab(key);
                      if (onUnlockStamp) onUnlockStamp('stamp-reutov');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isActive ? 'text-blue-600' : 'text-stone-500'}`} />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                        {card.tag.split(':')[0]}
                      </span>
                      <span className="text-xs font-bold block leading-tight mt-0.5">
                        {card.title.split('(')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Card Showcase */}
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-lg space-y-4 text-left"
            >
              {/* Photo Banner with Tag */}
              <div className={`relative h-56 sm:h-64 rounded-xl overflow-hidden group shadow-inner ${currentCard.id === 'history' ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-stone-950 flex items-center justify-center p-4' : 'bg-stone-900'}`}>
                <img
                  src={currentCard.imageUrl}
                  alt={currentCard.title}
                  className={`transition-transform duration-500 group-hover:scale-105 ${currentCard.id === 'history' ? 'h-40 sm:h-44 w-auto object-contain drop-shadow-2xl' : 'w-full h-full object-cover'}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-white w-fit mb-1">
                    {currentCard.badge}
                  </span>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                    {currentCard.title}
                  </h4>
                </div>
              </div>

              {/* Story Description */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans-ui">
                    {currentCard.tag}
                  </span>
                </div>
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-800 leading-relaxed">
                  «{currentCard.story}»
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
