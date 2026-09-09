import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee, Flame, Compass, Sparkle, ScrollText, Calendar, Lock, Heart, Check } from 'lucide-react';
import { TEA_ADDITIONS, MATRYOSHKA_LAYERS, RUSSIA_REGIONS, getTeaCombinationMeaning } from '../data/russiaFacts';
import {
  FortuneItem,
  UserFortuneState,
  loadUserFortuneState,
  getOrCreateDailyFortune,
  getTodayDateString,
  FORTUNES_COLLECTION,
} from '../data/fortunesData';
import { DailyTeaFortuneModal } from './DailyTeaFortuneModal';
import { TeaFortunesCollectionModal } from './TeaFortunesCollectionModal';
import { useAudience } from '../context/AudienceContext';
import { playTeaSound, playStampSound, playVictorySound } from '../utils/audioSynth';
import { MatryoshkaFigure } from './MatryoshkaFigure';
import { MatryoshkaPuzzleGame } from './MatryoshkaPuzzleGame';
import { CityBridgeInteractive } from './CityBridgeInteractive';
import confetti from 'canvas-confetti';

interface RussiaCultureSectionProps {
  onUnlockStamp: (id: string) => void;
}

export function RussiaCultureSection({ onUnlockStamp }: RussiaCultureSectionProps) {
  const { mode } = useAudience();

  // Tea State
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['thyme', 'berries']);
  const [isBrewing, setIsBrewing] = useState(false);
  const [hasBrewed, setHasBrewed] = useState(false);

  // Daily Fortune State (1 per day, popup modal on surface)
  const [fortuneState, setFortuneState] = useState<UserFortuneState>(() => loadUserFortuneState());
  const [currentFortune, setCurrentFortune] = useState<FortuneItem | null>(null);
  const [isDailyFortuneModalOpen, setIsDailyFortuneModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isFirstTimeToday, setIsFirstTimeToday] = useState(true);

  // Matryoshka State (for International mode)
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);

  // Regions State (for International mode)
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);

  // Load today's fortune if already obtained
  useEffect(() => {
    const today = getTodayDateString();
    if (fortuneState.todayDateStr === today && fortuneState.dailyFortuneId) {
      const found = FORTUNES_COLLECTION.find((f) => f.id === fortuneState.dailyFortuneId);
      if (found) {
        setCurrentFortune(found);
        setHasBrewed(true);
        setIsFirstTimeToday(false);
      }
    }
  }, [fortuneState]);

  // Deduplicated safe collected fortunes count strictly from FORTUNES_COLLECTION
  const safeCollectedCount = useMemo(() => {
    const raw = fortuneState?.collectedIds || fortuneState?.unlockedFortuneIds || [];
    return Array.from(new Set(raw)).filter((id) =>
      FORTUNES_COLLECTION.some((f) => f.id === id)
    ).length;
  }, [fortuneState]);

  const toggleIngredient = (id: string) => {
    playTeaSound();
    setSelectedIngredients((prev) => {
      if (prev.includes(id)) {
        // Can deselect freely down to 0 (pure boiling water from samovar!)
        return prev.filter((item) => item !== id);
      } else {
        // Up to 4 ingredients (matches user screenshot)
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  const handleBrewTea = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    playTeaSound();

    setTimeout(() => {
      setIsBrewing(false);
      setHasBrewed(true);
      onUnlockStamp('stamp-samovar');
      onUnlockStamp('stamp-tea');

      // Get or create today's daily fortune
      const { newState, fortune, isFirstTimeToday } = getOrCreateDailyFortune(fortuneState);
      setFortuneState(newState);
      setCurrentFortune(fortune);
      setIsFirstTimeToday(isFirstTimeToday);
      setIsDailyFortuneModalOpen(true);

      playVictorySound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d97706', '#b45309', '#f59e0b', '#dc2626'],
      });
    }, 1800);
  };

  const handleNextMatryoshka = () => {
    playStampSound();
    onUnlockStamp('stamp-matryoshka');
    setCurrentLayerIndex((prev) => (prev + 1) % MATRYOSHKA_LAYERS.length);
  };

  const currentMatryoshka = MATRYOSHKA_LAYERS[currentLayerIndex];
  const activeRegion = RUSSIA_REGIONS[activeRegionIndex];
  const currentTeaCombo = getTeaCombinationMeaning(selectedIngredients);

  const isTodayFortuneAlreadyReceived =
    fortuneState.todayDateStr === getTodayDateString() && Boolean(fortuneState.dailyFortuneId);

  // If today's tea fortune was already received, guarantee stamp is unlocked
  useEffect(() => {
    if (isTodayFortuneAlreadyReceived) {
      onUnlockStamp('stamp-samovar');
      onUnlockStamp('stamp-tea');
    }
  }, [isTodayFortuneAlreadyReceived, onUnlockStamp]);

  return (
    <section id="russia" className="py-10 px-4 sm:px-6 bg-[#f5efe4]/60 border-y border-stone-200/90 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header (Soulful, tailored by mode) */}
        {mode === 'citizen' ? (
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-rose-700" />
              Друзьям из городов России 🇷🇺
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
              Мы из одной страны — просто из разных городов!
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans-ui leading-relaxed">
              Привет! Мы встретились здесь, в Екатеринбурге, на фестивале МФМ 2026. Вместо банальных лекций я приготовила для тебя живой интерактив: горячий чай с предсказанием дня у самовара, игру-мозаику дружбы и мост между нашими родными городами!
            </p>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              Культурный портрет • Cultural Heart of Russia
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
              Что такое Россия: Сердце, Масштаб и Традиции
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans-ui leading-relaxed">
              Россия — это 11 часовых поясов, сотни народов и древние обычаи, где главное сокровище — это способность встречать человека с распахнутыми объятиями и говорить до рассвета за чашкой горячего чая.
            </p>
          </div>
        )}

        {/* Feature 1: Interactive Tea Ceremony & Samovar (For both modes) */}
        <div id="tea-section" className="bg-[#fffefc] rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-sm space-y-6 text-left">
          
          {/* Top Row: Two balanced cards (Samovar presentation + Arina's note) - equal height on tablet/laptop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            
            {/* Left Card: Samovar & Heritage */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200/80 text-center relative overflow-hidden">
              {/* Steaming animation */}
              <div className="relative mb-2">
                <motion.div
                  animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl select-none"
                >
                  ♨️
                </motion.div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center text-white shadow-md border-4 border-yellow-200/90 relative">
                  <span className="text-4xl sm:text-5xl select-none">🫖</span>
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-stone-900 text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                    Самовар
                  </div>
                </div>
              </div>

              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                {mode === 'citizen' ? 'Русское чаепитие у самовара' : 'Традиция русского чаепития'}
              </h3>
              <p className="mt-1 text-xs text-stone-600 font-sans-ui leading-relaxed max-w-sm">
                Самовар — сердце русского дома. Вокруг него собирались семьями, согревали путников и вели душевные разговоры за чашкой горячего чая.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold border border-amber-200/80">
                <span>👇</span>
                <span>Выбери добавки ниже или оставь чистый кипяток</span>
              </div>
            </div>

            {/* Right Card: Arina's Childhood Tea Memory */}
            <div className="p-6 rounded-2xl bg-[#fefdfb] border border-amber-200/90 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span className="font-sans-ui uppercase tracking-wider">Заметка от Арины ☕🍯</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                  В детстве я очень сильно любила пить чай, причём как зелёный, так и чёрный. Моя бабушка всегда предпочитала добавлять в чай натуральный мёд. В самом начале я очень противилась этому, потому что считала мёд каким-то склизким и невкусным... Но когда я стала взрослее, я по-настоящему поняла: ложечка мёда в горячем чае — это не только потрясающе вкусно, но и невероятно полезно для здоровья!
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100 text-xs text-stone-500 font-sans-ui flex items-center justify-between">
                <span>Семейная традиция</span>
                <span className="font-semibold text-amber-900">Мёд • Травы • Ягоды</span>
              </div>
            </div>

          </div>

          {/* Full-width Tea Builder (Spans entire card width, perfectly balanced on tablet and laptop!) */}
          <div className="space-y-4 pt-2">
            
            {/* Header matching user screenshot IMG_20260908_162016_267.jpg */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans-ui block">
                ИНТЕРАКТИВНЫЙ ЗАВАРНИК
              </span>
              <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                Выбери травы, ягоды и угощения
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans-ui">
                Каждое сочетание несёт свой смысл и традицию (выбрано {selectedIngredients.length} из 4):
              </p>
            </div>

            {/* 6 Ingredients in a responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {TEA_ADDITIONS.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    type="button"
                    onClick={() => toggleIngredient(ing.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-100/70 border-amber-400 text-stone-900 shadow-xs ring-1 ring-amber-400/60'
                        : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{ing.icon}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'border border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-stone-900">{ing.name}</span>
                      <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                        {ing.aroma}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Blend Meaning Box (Restored to exact clean screenshot style IMG_20260908_162016_267.jpg) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fef9ee] border border-amber-300/80 space-y-3 shadow-xs">
              <div>
                <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <span>🫖</span>
                  <span>{currentTeaCombo.title}</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed italic font-serif-display mt-0.5">
                  «{currentTeaCombo.meaning.replace(/^[«"]+|[»"]+$/g, '')}»
                </p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pt-2 border-t border-amber-200/70">
                <div>
                  <span className="font-bold text-stone-900 font-sans-ui">🍓 Вкус сбора: </span>
                  <span className="text-stone-700 font-sans-ui">{currentTeaCombo.tasteProfile}</span>
                </div>

                <div>
                  <span className="font-bold text-stone-900 font-sans-ui">✨ На что похоже: </span>
                  <span className="text-stone-700 font-sans-ui">{currentTeaCombo.resembles}</span>
                </div>

                <div>
                  <span className="font-bold text-stone-900 font-sans-ui">📜 Традиция: </span>
                  <span className="text-stone-700 font-sans-ui">{currentTeaCombo.tradition}</span>
                </div>
              </div>
            </div>

            {/* Brew Tea Button & Actions Bar */}
            <div className="space-y-3 pt-2">
              <button
                id="btn-brew-tea"
                type="button"
                onClick={handleBrewTea}
                disabled={isBrewing || isTodayFortuneAlreadyReceived}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isBrewing
                    ? 'bg-amber-400 text-stone-900 animate-pulse cursor-wait'
                    : isTodayFortuneAlreadyReceived
                    ? 'bg-stone-200 text-stone-500 border border-stone-300 cursor-default shadow-none'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-amber-700/20 active:scale-98'
                }`}
              >
                {isBrewing ? (
                  <>
                    <Flame className="w-4 h-4 animate-spin text-amber-900" />
                    <span>Кипятим воду и завариваем травы...</span>
                  </>
                ) : isTodayFortuneAlreadyReceived ? (
                  <>
                    <Calendar className="w-4 h-4 text-stone-400" />
                    <span>Чай на сегодня заварен! Ждём завтра</span>
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4" />
                    <span>Заварить этот чай и открыть предсказание дня</span>
                  </>
                )}
              </button>

              {/* Status & Collection Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-stone-600 font-sans-ui">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-stone-500">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>1 свиток в день</span>
                  </span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setIsCollectionModalOpen(true)}
                    className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <ScrollText className="w-3.5 h-3.5 text-amber-700" />
                    <span>Свитки в коллекции: {safeCollectedCount}/{FORTUNES_COLLECTION.length}</span>
                  </button>
                </div>

                {isTodayFortuneAlreadyReceived && currentFortune && (
                  <button
                    type="button"
                    onClick={() => setIsDailyFortuneModalOpen(true)}
                    className="text-amber-800 hover:text-amber-950 font-bold inline-flex items-center gap-1.5 underline cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Посмотреть сегодняшнее предсказание дня</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Feature 2 & 3: Tailored to Audience */}
        {mode === 'citizen' ? (
          <>
            {/* Citizen Interactive Game 1: Friendly City Bridge */}
            <div id="city-bridge-section" className="scroll-mt-20">
              <div id="bridge-section" className="scroll-mt-20">
                <CityBridgeInteractive onUnlockStamp={onUnlockStamp} />
              </div>
            </div>

            {/* Citizen Interactive Game 2: Matryoshka & Samovar Puzzle Game */}
            <div id="puzzle-section" className="scroll-mt-20">
              <MatryoshkaPuzzleGame
                onComplete={() => {
                  try {
                    localStorage.setItem('mfm_puzzle_solved', 'true');
                  } catch {}
                  onUnlockStamp('stamp-mosaic');
                  onUnlockStamp('stamp-matryoshka');
                }}
              />
            </div>
          </>
        ) : (
          <>
            {/* International Feature 2: Interactive Matryoshka Doll (Debunking Stereotypes) */}
            <div id="matryoshka-section" className="bg-[#fffefc] rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 font-sans-ui">
                  Секрет русской матрёшки • Matryoshka Layers
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  5 слоёв: Разрушаем стереотипы о России
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-ui leading-relaxed">
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

                {/* Content description of current layer (Restored to exact screenshot layout) */}
                <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 text-left space-y-4 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                      {currentMatryoshka.title}
                    </h4>
                    <span className="text-xs text-stone-500 font-sans-ui font-medium bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                      Кукла {currentMatryoshka.layer} из {MATRYOSHKA_LAYERS.length}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-stone-600 font-serif-display italic">
                    {currentMatryoshka.quote}
                  </div>

                  {/* Stereotype vs Reality (Two cards with ❌ and ✅) */}
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-rose-50/90 border border-rose-200/90 text-left space-y-1">
                      <span className="text-xs font-bold text-rose-900 block font-sans-ui">
                        ❌ СТЕРЕОТИП:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 font-sans-ui">
                        {currentMatryoshka.stereotype}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 text-left space-y-1">
                      <span className="text-xs font-bold text-emerald-900 block font-sans-ui">
                        ✅ РЕАЛЬНОСТЬ:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 font-sans-ui leading-relaxed">
                        {currentMatryoshka.reality}
                      </p>
                    </div>
                  </div>

                  {/* Full detailed description */}
                  <p className="text-xs sm:text-sm text-stone-700 font-sans-ui leading-relaxed pt-1">
                    {currentMatryoshka.desc}
                  </p>

                  {/* Pagination dots & Next button */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {MATRYOSHKA_LAYERS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            playStampSound();
                            setCurrentLayerIndex(idx);
                          }}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            idx === currentLayerIndex ? 'bg-rose-600 scale-110' : 'bg-stone-300 hover:bg-stone-400'
                          }`}
                          aria-label={`Кукла ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextMatryoshka}
                      className="text-stone-900 font-bold hover:text-rose-700 text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Следующий слой</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* International Feature 3: Natural Scale & Marvels */}
            <div id="nature-section" className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans-ui">
                  Бескрайние горизонты • Natural Wonders
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
                    type="button"
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

              {/* Active Region Card (Matching user screenshot vertical card style) */}
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm text-left max-w-3xl mx-auto space-y-4"
              >
                {/* Yellow Badge */}
                <div className="inline-block px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-semibold">
                  {activeRegion.badge}
                </div>

                {/* Subtitle & Title */}
                <div className="space-y-0.5">
                  <span className="text-xs text-stone-500 font-sans-ui block">
                    {activeRegion.tagline}
                  </span>
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                    {activeRegion.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans-ui">
                  {activeRegion.description}
                </p>

                {/* Info Fact Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs sm:text-sm text-stone-800 font-sans-ui">
                  <span className="font-bold text-amber-950">ⓘ Интересный факт: </span>
                  <span>{activeRegion.fact}</span>
                </div>

                {/* Landscape Photo with Dark Overlay at bottom */}
                <div className="h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-inner bg-stone-900 border border-stone-200 group">
                  <img
                    src={activeRegion.imageUrl}
                    alt={activeRegion.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300/90 font-sans-ui">
                      ПРИРОДА РОССИИ
                    </span>
                    <h5 className="font-serif-display text-lg sm:text-xl font-bold text-white">
                      {activeRegion.tagline}
                    </h5>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* International Feature 4: Interactive Festive Puzzle Game (после просторов России) */}
            <div id="puzzle-section" className="scroll-mt-20">
              <MatryoshkaPuzzleGame
                onComplete={() => {
                  try {
                    localStorage.setItem('mfm_puzzle_solved', 'true');
                  } catch {}
                  onUnlockStamp('stamp-mosaic');
                  onUnlockStamp('stamp-matryoshka');
                }}
              />
            </div>
          </>
        )}

      </div>

      {/* Daily Tea Fortune Modal (Appears on the surface when tea is brewed!) */}
      <DailyTeaFortuneModal
        isOpen={isDailyFortuneModalOpen}
        onClose={() => setIsDailyFortuneModalOpen(false)}
        fortune={currentFortune}
        isFirstTimeToday={isFirstTimeToday}
      />

      {/* Tea Fortunes Collection Modal */}
      <TeaFortunesCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        fortuneState={fortuneState}
      />
    </section>
  );
}
