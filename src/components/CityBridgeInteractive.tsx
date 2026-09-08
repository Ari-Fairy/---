import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Compass,
  Sparkles,
  Heart,
  Clock,
  Navigation2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Search,
  BookOpen,
  Info,
  Scale,
  Award,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { playWoodTapSound, playChimeSound, playVictorySound } from '../utils/audioSynth';
import { CITIES_LIST, CityBridgeItem, buildCustomCityBridge } from '../data/citiesBridgeData';
import { getQuestionsForCity, QuizQuestion } from '../data/cityQuizData';
import confetti from 'canvas-confetti';

interface CityBridgeInteractiveProps {
  onUnlockStamp?: (id: string) => void;
}

const SWEET_WISHES = [
  '«Ты делаешь этот фестиваль особенным! Не бойся подходить знакомиться — здесь все классные!»',
  '«Если на шумных площадках устанут глаза — завари мятный чай и просто посиди в тишине пять минут!»',
  '«Пусть этот день в Екатеринбурге подарит тебе встречу, которая изменит твои мечты к лучшему!»',
  '«Каждый город нашей страны — это отдельный космос. Спасибо, что ты привез(ла) частичку своего края!»',
  '«Улыбнись прямо сейчас! Твоя улыбка делает этот мир светлее и теплее 🌸»',
  '«Не пытайся успеть везде — самое ценное на фестивале это искренние разговоры глаза в глаза!»',
  '«Помни: ты не один! Вокруг сотни ребят на одной волне, готовых поддержать и вдохновить!»',
];

export function CityBridgeInteractive({ onUnlockStamp }: CityBridgeInteractiveProps) {
  const [selectedCityId, setSelectedCityId] = useState<string>('ekb');
  const [activeWishIndex, setActiveWishIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Custom city modal/form state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customCityName, setCustomCityName] = useState('');
  const [customRegion, setCustomRegion] = useState('');
  const [customSubmittedCity, setCustomSubmittedCity] = useState<CityBridgeItem | null>(null);

  // 3-Question Quiz State for active city
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answeredOption, setAnsweredOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return CITIES_LIST;
    const q = searchQuery.toLowerCase();
    return CITIES_LIST.filter(
      (c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeCity: CityBridgeItem = useMemo(() => {
    if (customSubmittedCity && isCustomMode) return customSubmittedCity;
    const found = CITIES_LIST.find((c) => c.id === selectedCityId);
    return found || CITIES_LIST[0];
  }, [selectedCityId, customSubmittedCity, isCustomMode]);

  const questions: QuizQuestion[] = useMemo(() => {
    return getQuestionsForCity(activeCity);
  }, [activeCity]);

  // Reset quiz when city changes
  useEffect(() => {
    setActiveQuestionIdx(0);
    setAnsweredOption(null);
    setQuizScore(0);
    setIsQuizFinished(false);
  }, [activeCity.id]);

  const handleSelectCity = (id: string) => {
    playWoodTapSound();
    setSelectedCityId(id);
    setIsCustomMode(false);
  };

  const handleNextWish = () => {
    playChimeSound();
    setActiveWishIndex((prev) => (prev + 1) % SWEET_WISHES.length);
  };

  const handleCustomCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityName.trim()) return;

    playVictorySound();
    const cityTitle = customCityName.trim();
    const regionTitle = customRegion.trim() || 'Любимый уголок России';

    const generatedCity = buildCustomCityBridge(cityTitle, regionTitle);

    setCustomSubmittedCity(generatedCity);
    setIsCustomMode(true);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899'],
    });
  };

  // Quiz Handling
  const currentQuestion = questions[activeQuestionIdx] || questions[0];

  useEffect(() => {
    try {
      if (localStorage.getItem('mfm_city_bridge_passed') === 'true' && onUnlockStamp) {
        onUnlockStamp('stamp-bridge');
      }
    } catch {}
  }, [onUnlockStamp]);

  const handleSelectQuizOption = (optionIndex: number) => {
    if (answeredOption !== null) return;
    playWoodTapSound();
    setAnsweredOption(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      playVictorySound();
      setQuizScore((prev) => prev + 1);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399'],
      });
    }
  };

  const handleNextQuestion = () => {
    playWoodTapSound();
    if (activeQuestionIdx < questions.length - 1) {
      setActiveQuestionIdx((prev) => prev + 1);
      setAnsweredOption(null);
    } else {
      setIsQuizFinished(true);
      playVictorySound();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899'],
      });
      try {
        localStorage.setItem('mfm_city_bridge_passed', 'true');
      } catch {}
      if (onUnlockStamp) onUnlockStamp('stamp-bridge');
    }
  };

  const handleRestartQuiz = () => {
    playWoodTapSound();
    setActiveQuestionIdx(0);
    setAnsweredOption(null);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  // Comparison between Selected City and Ekaterinburg (Host of WFM 2026)
  const ekaterinburgComparisonText = useMemo(() => {
    if (activeCity.differenceWithEkaterinburg) {
      return activeCity.differenceWithEkaterinburg;
    }
    if (activeCity.id === 'ekb') {
      return 'Ты уже дома! Ты находишься в самом сердце МФМ 2026. Здесь нет разделяющих километров: Екатеринбург сам принимает тысячи участников со всей планеты. Рождённый как завод-крепость у плотины на реке Исеть в 1723 году, сегодня наш город встречает друзей мировой столицей конструктивизма, душевным уральским роком, камнерезным мастерством и теплом сказов Бажова!';
    }
    return `Если Екатеринбург сформирован демидовскими горными заводами на стыке Европы и Азии и памятниками конструктивизма, то ${activeCity.name} представляет неповторимый колорит своего края (${activeCity.region}) со своими традициями и укладом. Этот контраст культур и делает Россию такой богатой и неповторимой!`;
  }, [activeCity]);

  return (
    <div id="bridge-section" className="bg-[#fffefc] rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-md space-y-6 text-left relative overflow-hidden">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-200 text-xs font-semibold">
            <Navigation2 className="w-3.5 h-3.5 text-rose-600" />
            Интерактивный мост городов • 30+ регионов
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
            «Мы из одной страны — просто из разных городов!»
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans-ui max-w-2xl">
            Выбери свой родной город из списка или добавь свой. Узнай историю основания, стереотипы vs реальность, сравнение с Екатеринбургом и пройди экспресс-тест из 3 сложных вопросов!
          </p>
        </div>

        {/* Wish generator button */}
        <button
          type="button"
          onClick={handleNextWish}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Случайное напутствие Арины ✨</span>
        </button>
      </div>

      {/* Floating Sweet Wish Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWishIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/80 via-amber-50/60 to-orange-50/70 border border-rose-200/80 flex items-start gap-3 shadow-xs"
        >
          <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs">
            💌
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              Тёплая мысль от Арины тебе в дорогу:
            </span>
            <p className="font-handwriting text-xl sm:text-2xl text-stone-800 italic leading-snug">
              {SWEET_WISHES[activeWishIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Search and "Not Found" Header */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск твоего города (напр. Самара, Пермь, Сочи)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsCustomMode(!isCustomMode)}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Не нашёл свой город? Добавь его!</span>
          </button>
        </div>

        {/* Custom City Input Form Dropdown */}
        <AnimatePresence>
          {isCustomMode && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCustomCitySubmit}
              className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-950 font-bold text-xs">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Добавь свой любимый город на карту дружбы:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Название города (напр. Архангельск)"
                  value={customCityName}
                  onChange={(e) => setCustomCityName(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-rose-200 bg-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Регион (напр. Русский Север)"
                  value={customRegion}
                  onChange={(e) => setCustomRegion(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-rose-200 bg-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Навести мост дружбы 🌉
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* City Chips Selector: Safe padding container, no overflowing scale */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-stone-100/70 border border-stone-200/80">
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto px-1 py-1">
            {filteredCities.map((city) => {
              const isSelected = !isCustomMode && selectedCityId === city.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelectCity(city.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-rose-700 text-white border-rose-800 shadow-xs font-bold ring-2 ring-rose-400'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span>{city.emoji}</span>
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Bridge Detail Card */}
      <div className="bg-stone-50/80 rounded-3xl p-5 sm:p-6 border border-stone-200 space-y-5">
        
        {/* Top Header of Active City */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-3xl shrink-0">
              {activeCity.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                  {activeCity.name}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[11px] font-bold border border-rose-200">
                  Мост наведён
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui mt-0.5">
                {activeCity.region}
              </p>
            </div>
          </div>

          {/* Distance Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans-ui">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-400 block">До Екатеринбурга (МФМ)</span>
              <span className="font-bold text-stone-900">
                {activeCity.distToEkaterinburgKm === 0
                  ? 'Мы уже здесь! ❤️'
                  : `~${activeCity.distToEkaterinburgKm.toLocaleString()} км`}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-400 block">До Реутова Арины</span>
              <span className="font-bold text-stone-900">
                {activeCity.distToReutovKm === 12
                  ? '12 км (Рядом!)'
                  : `~${activeCity.distToReutovKm.toLocaleString()} км`}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-stone-400 block">Часовой пояс</span>
              <span className="font-bold text-stone-900">{activeCity.timeDiffMoscow}</span>
            </div>
          </div>
        </div>

        {/* 1. Arina's Warm Words */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Слово Арины ребятам из г. {activeCity.name}:
            </span>
          </div>
          <p className="font-handwriting text-xl sm:text-2xl text-stone-800 leading-relaxed">
            «{activeCity.arinaGreeting}»
          </p>
        </div>

        {/* 2. Deep Intellectual Details: History Secret and Stereotypes vs Reality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans-ui">
          
          {/* History Secret */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>История основания, о которой многие не знают:</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              {activeCity.historySecret}
            </p>
          </div>

          {/* Stereotype vs Reality */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <Info className="w-4 h-4 text-indigo-700" />
              <span>Стереотипы vs Реальность:</span>
            </div>
            <div className="space-y-1.5 text-stone-700 leading-relaxed">
              <div>
                <span className="font-semibold text-rose-700">Что думают другие: </span>
                <span>{activeCity.stereotypeVsReality.stereotype}</span>
              </div>
              <div>
                <span className="font-semibold text-emerald-700">Как на самом деле: </span>
                <span>{activeCity.stereotypeVsReality.reality}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Comparison with Ekaterinburg (Host of WFM 2026) */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs font-sans-ui">
          <div className="flex items-center gap-2 text-emerald-950 font-bold">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>В чём связь и разница: {activeCity.name} ⇄ Екатеринбург (хозяин МФМ 2026):</span>
          </div>
          <p className="text-stone-700 leading-relaxed">
            {ekaterinburgComparisonText}
          </p>
        </div>

        {/* 4. Express Quiz with 3 Questions & Final Result */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          
          {!isQuizFinished ? (
            <div className="space-y-3">
              {/* Quiz Header with Step Indicator */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Знаешь ли ты свой родной город? Хорошо, давай это проверим
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Вопрос {activeQuestionIdx + 1} из {questions.length}
                  </span>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {questions.map((_, qIdx) => (
                  <div
                    key={qIdx}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      qIdx < activeQuestionIdx
                        ? 'bg-emerald-500'
                        : qIdx === activeQuestionIdx
                        ? 'bg-blue-600'
                        : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>

              {/* Question Text */}
              <p className="text-sm font-semibold text-stone-800 font-sans-ui pt-1">
                {currentQuestion.question}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answeredOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const showResult = answeredOption !== null;

                  let btnStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                    } else {
                      btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  const optionLetters = ['А', 'Б', 'В', 'Г'];
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={answeredOption !== null}
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-start gap-2 flex-1">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold bg-stone-200/70 text-stone-700 shrink-0 mt-0.5">
                          {optionLetters[idx] || `${idx + 1}`}
                        </span>
                        <span className="leading-snug">{option}</span>
                      </div>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Step Button */}
              {answeredOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-2"
                >
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 font-sans-ui flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Объяснение: </span>
                      <span>{currentQuestion.explanation}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <span>
                        {activeQuestionIdx < questions.length - 1
                          ? `Следующий вопрос (${activeQuestionIdx + 2} из ${questions.length})`
                          : 'Посмотреть результат теста 🏆'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50/40 to-blue-50/50 border border-amber-200 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 mx-auto flex items-center justify-center text-amber-800 text-2xl shadow-xs">
                <Award className="w-7 h-7 text-amber-600" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Результат викторины по городу {activeCity.name}
                </span>
                <h4 className="font-serif-display text-2xl font-bold text-stone-900">
                  {quizScore === 3
                    ? '3 из 3 правильных ответов! 🌟'
                    : quizScore === 2
                    ? '2 из 3 правильных ответов! 👏'
                    : `${quizScore} из 3 правильных ответов 📖`}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 font-sans-ui max-w-md mx-auto">
                  {quizScore === 3
                    ? 'Великолепно! Ты настоящий знаток родного края! Твоей эрудиции и вниманию к деталям можно только аплодировать!'
                    : quizScore === 2
                    ? 'Отличный результат! Ты прекрасно чувствуешь географию, историю и самобытность городов России!'
                    : 'Хорошая попытка! Теперь ты знаешь об этом городе и его связи с фестивалем намного больше!'}
                </p>
              </div>

              {/* Stamp Unlocked Notification */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-sans-ui flex items-center justify-center gap-2.5 shadow-xs max-w-md mx-auto">
                <span className="text-xl">🎖️</span>
                <span className="text-left">
                  <strong>Марка «Мост городов» разблокирована!</strong> Она бережно вклеена в твой фестивальный альбом открытки за прохождение викторины.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти викторину заново 🔄</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}
