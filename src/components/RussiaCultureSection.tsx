import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee, Flame, Heart, Info, ArrowRight, Layers, Compass, Check, BookOpen, ShieldAlert, Sparkle } from 'lucide-react';
import { TEA_ADDITIONS, MATRYOSHKA_LAYERS, RUSSIA_REGIONS, getTeaCombinationMeaning } from '../data/russiaFacts';
import { playTeaSound, playStampSound } from '../utils/audioSynth';
import { MatryoshkaFigure } from './MatryoshkaFigure';
import confetti from 'canvas-confetti';

interface RussiaCultureSectionProps {
  onUnlockStamp: (id: string) => void;
}

export function RussiaCultureSection({ onUnlockStamp }: RussiaCultureSectionProps) {
  // Tea State
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['thyme', 'berries']);
  const [isBrewing, setIsBrewing] = useState(false);
  const [hasBrewed, setHasBrewed] = useState(false);

  // Matryoshka State
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);

  // Region State
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 4) return prev; // max 4 items for good blend
        return [...prev, id];
      }
    });
  };

  const handleBrewTea = () => {
    setIsBrewing(true);
    playTeaSound();
    onUnlockStamp('stamp-tea');

    setTimeout(() => {
      setIsBrewing(false);
      setHasBrewed(true);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#d97706', '#b45309', '#f59e0b', '#10b981'],
      });
    }, 600);
  };

  const handleNextMatryoshka = () => {
    playStampSound();
    onUnlockStamp('stamp-matryoshka');
    setCurrentLayerIndex((prev) => (prev + 1) % MATRYOSHKA_LAYERS.length);
  };

  const currentMatryoshka = MATRYOSHKA_LAYERS[currentLayerIndex];
  const activeRegion = RUSSIA_REGIONS[activeRegionIndex];
  const currentTeaCombo = getTeaCombinationMeaning(selectedIngredients);

  return (
    <section id="russia" className="py-16 px-4 sm:px-6 bg-[#f5efe4]/60 border-y border-stone-200/90 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Культурный портрет
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Что такое Россия: Сердце, Масштаб и Традиции
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans-ui leading-relaxed">
            Россия — это 11 часовых поясов, сотни народов и древние обычаи, где главное сокровище — это способность встречать человека с распахнутыми объятиями и говорить до рассвета за чашкой горячего чая.
          </p>
        </div>

        {/* Feature 1: Interactive Tea Ceremony & Samovar */}
        <div id="tea-section" className="bg-[#fffefc] rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Samovar & Brewing Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-center relative overflow-hidden">
              {/* Steaming animation */}
              <div className="relative mb-3">
                <motion.div
                  animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 text-2xl select-none"
                >
                  ♨️
                </motion.div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center text-white shadow-lg border-4 border-yellow-200/90 relative">
                  <span className="text-5xl select-none">🫖</span>
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-stone-900 text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                    Самовар
                  </div>
                </div>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-stone-900 mt-2">
                Традиция русского чаепития
              </h3>
              <p className="mt-1 text-xs text-stone-600 font-sans-ui leading-relaxed">
                Самовар — сердце русского дома. Вокруг него собирались семьями, согревали путников и пили чай «вприкуску» с сахаром и пряниками.
              </p>

              {/* Brew Button */}
              <button
                id="btn-brew-tea"
                onClick={handleBrewTea}
                disabled={isBrewing}
                className="mt-5 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>{isBrewing ? 'Кипит самовар, завариваем...' : 'Заварить этот сбор в самоваре'}</span>
              </button>

              <div className="mt-2 text-[11px] text-amber-900 font-sans-ui">
                ⭐ Заваривание разблокирует марку в паспорте
              </div>
            </div>

            {/* Interactive Tea Customizer & Unique Combinations */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans-ui">
                  Интерактивный заварник
                </span>
                <h4 className="font-serif-display text-xl font-bold text-stone-900 mt-0.5">
                  Выбери травы, ягоды и угощения
                </h4>
                <p className="text-xs text-stone-500 font-sans-ui">
                  Каждое сочетание несёт свой смысл и традицию (выбрано {selectedIngredients.length} из 4):
                </p>
              </div>

              {/* Ingredients buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {TEA_ADDITIONS.map((item) => {
                  const isSelected = selectedIngredients.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIngredient(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="font-semibold text-xs leading-tight font-sans-ui">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                          {item.aroma}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Unique Meaning of Current Combination */}
              <motion.div
                key={selectedIngredients.sort().join('-')}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-5 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-stone-800 font-sans-ui space-y-2.5 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-bold text-sm text-amber-950">
                    {currentTeaCombo.title}
                  </span>
                </div>
                <div className="text-amber-900 font-semibold italic text-xs">
                  {currentTeaCombo.meaning}
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1 border-t border-amber-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-xs">
                    <span className="font-bold text-amber-950 shrink-0">🍓 Вкус сбора:</span>
                    <span className="text-stone-700 leading-relaxed">{currentTeaCombo.tasteProfile}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-xs">
                    <span className="font-bold text-amber-950 shrink-0">✨ На что похоже:</span>
                    <span className="text-stone-700 leading-relaxed">{currentTeaCombo.resembles}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-xs pt-1 border-t border-amber-200/50">
                    <span className="font-bold text-amber-950 shrink-0">📜 Традиция:</span>
                    <span className="text-stone-700 leading-relaxed">{currentTeaCombo.tradition}</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Feature 2: Interactive Matryoshka Doll (Authentic Doll & Stereotypes vs Reality) */}
        <div id="matryoshka-section" className="bg-[#fffefc] rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 font-sans-ui">
              Секрет русской матрёшки
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              5 слоёв: Разрушаем стереотипы о России
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-ui">
              Каждая кукла хранит в себе правду о нашей душе и культуре. Нажимайте на матрёшку: каждый слой меняет её наряд (Хохлома, Городец, Гжель, Малахит, Космос) и раскрывает реальность без киношных мифов!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2">
            
            {/* Visual Matryoshka Doll Figure */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <MatryoshkaFigure
                layer={currentMatryoshka}
                currentLayerIndex={currentLayerIndex}
                totalLayers={MATRYOSHKA_LAYERS.length}
                onClick={handleNextMatryoshka}
              />
            </div>

            {/* Content description of current layer with Stereotype vs Reality */}
            <div className="md:col-span-7 bg-stone-50 rounded-2xl p-6 sm:p-7 border border-stone-200 text-left space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-200 flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentMatryoshka.badge}</span>
                </span>
                <span className="text-xs text-stone-500 font-mono font-bold bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                  Кукла {currentMatryoshka.layer} из {MATRYOSHKA_LAYERS.length}
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-2xl font-bold text-stone-900 leading-snug">
                  {currentMatryoshka.title}
                </h4>
                <div className="mt-1 text-xs text-rose-900 font-semibold italic">
                  {currentMatryoshka.quote}
                </div>
              </div>

              {/* Stereotype vs Reality Cards */}
              <div className="space-y-2.5 pt-1">
                {/* Stereotype Box */}
                <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200/80 flex items-start gap-2.5">
                  <span className="text-base shrink-0 select-none">❌</span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-900 block font-sans-ui">
                      Стереотип:
                    </span>
                    <span className="text-xs sm:text-sm text-red-950 font-medium font-sans-ui leading-relaxed">
                      {currentMatryoshka.stereotype}
                    </span>
                  </div>
                </div>

                {/* Reality Box */}
                <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 flex items-start gap-2.5">
                  <span className="text-base shrink-0 select-none">✅</span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block font-sans-ui">
                      Реальность:
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-950 font-semibold font-sans-ui leading-relaxed">
                      {currentMatryoshka.reality}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-sans-ui leading-relaxed pt-1">
                {currentMatryoshka.desc}
              </p>

              {/* Progress step dots and controls */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {MATRYOSHKA_LAYERS.map((layer, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentLayerIndex(idx);
                        playStampSound();
                        onUnlockStamp('stamp-matryoshka');
                      }}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === currentLayerIndex ? 'w-7 bg-rose-600' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                      }`}
                      title={`Слой ${idx + 1}: ${layer.outfitName}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextMatryoshka}
                  className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer font-sans-ui"
                >
                  <span>Следующий слой</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Feature 3: Natural Scale & Marvels with Real Photography */}
        <div id="nature-section" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans-ui">
              Бескрайние горизонты
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Чудеса природы: От Байкала до Камчатки
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-ui">
              Выбирайте регион и знакомьтесь с уникальными сокровищами российской природы:
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {RUSSIA_REGIONS.map((region, idx) => (
              <button
                key={region.id}
                onClick={() => {
                  setActiveRegionIndex(idx);
                  onUnlockStamp('stamp-nature');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all font-sans-ui cursor-pointer ${
                  idx === activeRegionIndex
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-[#fffefc] text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {region.title}
              </button>
            ))}
          </div>

          {/* Active Region Card with High Quality Photo */}
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                    {activeRegion.badge}
                  </span>
                  <span className="text-xs text-stone-500 font-sans-ui">
                    {activeRegion.tagline}
                  </span>
                </div>

                <h4 className="font-serif-display text-3xl font-bold text-stone-900">
                  {activeRegion.title}
                </h4>

                <p className="text-sm text-stone-700 font-sans-ui leading-relaxed">
                  {activeRegion.description}
                </p>

                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-stone-800 font-sans-ui flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Интересный факт: </span>
                    {activeRegion.fact}
                  </div>
                </div>
              </div>

              {/* Right real photography image */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-md">
                <img
                  src={activeRegion.imageUrl}
                  alt={activeRegion.title}
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[11px] font-bold tracking-wider uppercase opacity-80">
                    Природа России
                  </span>
                  <span className="font-serif-display text-lg font-bold">
                    {activeRegion.tagline}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
