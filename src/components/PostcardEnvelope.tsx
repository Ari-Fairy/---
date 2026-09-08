import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stamp, Sparkles, RefreshCw, Send, CheckCircle, Gift, Heart, Code2, Globe2, Flag } from 'lucide-react';
import { PostcardStamp } from '../types';
import { useAudience } from '../context/AudienceContext';
import { ARINA_PROFILE } from '../data/arinaProfile';
import { playSealBreakSound, playStampSound, startAmbientBgm, getAudioContext } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import costumeDanceImage from '../assets/images/regenerated_image_1788773329767.png';
import samovarFeastImage from '../assets/images/regenerated_image_1788773748221.png';
import winterCelebrationImage from '../assets/images/regenerated_image_1788774416043.png';

interface PostcardEnvelopeProps {
  stamps: PostcardStamp[];
  onUnlockStamp: (id: string) => void;
}

export function PostcardEnvelope({ stamps, onUnlockStamp }: PostcardEnvelopeProps) {
  const { mode, setMode } = useAudience();
  // Remember envelope open/closed state so switching audience or reloading preserves the user's choice
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mfm_envelope_open') === 'true';
    } catch {
      return false;
    }
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedStampId, setSelectedStampId] = useState<string | null>(null);

  const handleSwitchAudience = (targetMode: 'international' | 'citizen') => {
    setMode(targetMode);
    // Do NOT reset isOpen here — keep the envelope open if user opened it, or closed if closed
    setIsFlipped(false);
  };

  const PHOTO_DATA = {
    costume: {
      src: costumeDanceImage,
      label: 'Наряды',
      title: 'Русский народный танец и наряды',
      subtitle: 'Праздничные сарафаны, хоровод и задор народных традиций',
      quote: '«Русский народный танец и праздничный наряд — это поэзия красок, грация и живая душа народа.»',
      tag: 'Народный хоровод и красота',
    },
    samovar: {
      src: samovarFeastImage,
      label: 'Самовар',
      title: 'Праздничное застолье и самовар',
      subtitle: 'Богатый стол, угощения, самовар и тёплые улыбки гостей',
      quote: '«В России гость — всегда праздник, а чай из самовара за щедрым столом согревает сердце.»',
      tag: 'Русское радушие и щедрый стол',
    },
    celebration: {
      src: winterCelebrationImage,
      label: 'Гуляния',
      title: 'Зимние народные гуляния',
      subtitle: 'Девушки в русских народных костюмах радостно пляшут, идут и улыбаются на заснеженной улице',
      quote: '«Зимние народные гуляния: задорная пляска на морозном снегу, яркие русские костюмы и искреннее праздничное веселье.»',
      tag: 'Масленичные гуляния на снегу',
    },
  } as const;

  type PhotoKey = keyof typeof PHOTO_DATA;
  const [activePhoto, setActivePhoto] = useState<PhotoKey>('costume');
  const currentPhoto = PHOTO_DATA[activePhoto];

  const selectedStamp = selectedStampId
    ? stamps.find((s) => s.id === selectedStampId) || null
    : null;

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      playSealBreakSound();
      startAmbientBgm();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b45309', '#e11d48', '#f59e0b', '#10b981'],
      });
      setIsOpen(true);
      try {
        localStorage.setItem('mfm_envelope_open', 'true');
      } catch {}
      // Automatically unlock commemorative envelope stamp upon breaking the seal
      onUnlockStamp('stamp-envelope');
    }
  };

  const handleCloseEnvelope = () => {
    setIsFlipped(false);
    setIsOpen(false);
    try {
      localStorage.setItem('mfm_envelope_open', 'false');
    } catch {}
  };

  const handleStampClick = (stamp: PostcardStamp) => {
    playStampSound();
    setSelectedStampId(stamp.id);
  };

  return (
    <section id="postcard" className="pt-8 pb-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background soft ornamental elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Памятный сувенир участнику МФМ 2026
        </div>
        
        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-bold tracking-tight">
          {mode === 'citizen' ? 'Привет, дорогой друг из родных краёв!' : 'Привет из России! Welcome!'}
        </h1>
        <p className="mt-3 text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-sans-ui">
          Интерактивная открытка от студентки-программиста Арины. Коснитесь сургучной печати, чтобы открыть конверт и прочесть тёплое письмо!
        </p>

        {/* Audience Mode Switcher Banner */}
        <div className="mt-5 inline-flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-300/80 shadow-xs">
          <button
            type="button"
            onClick={() => handleSwitchAudience('international')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              mode === 'international'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Иностранный гость (International)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchAudience('citizen')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              mode === 'citizen'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Flag className="w-4 h-4" />
            <span>Участник из городов России 🇷🇺</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {!isOpen ? (
          /* Closed Vintage Envelope with Wax Seal */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative cursor-pointer group"
            onClick={handleOpenEnvelope}
          >
            <div className="bg-[#e8dec8] p-6 sm:p-10 rounded-2xl shadow-xl border border-stone-300/90 relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
              
              {/* Airmail decorative striped border */}
              <div className="absolute inset-x-0 top-0 h-3.5 bg-[repeating-linear-gradient(45deg,#b91c1c,#b91c1c_14px,#fafaf9_14px,#fafaf9_24px,#1d4ed8_24px,#1d4ed8_38px,#fafaf9_38px,#fafaf9_48px)] opacity-85" />
              <div className="absolute inset-x-0 bottom-0 h-3.5 bg-[repeating-linear-gradient(45deg,#b91c1c,#b91c1c_14px,#fafaf9_14px,#fafaf9_24px,#1d4ed8_24px,#1d4ed8_38px,#fafaf9_38px,#fafaf9_48px)] opacity-85" />

              {/* Postal Marks */}
              <div className="flex justify-between items-start pt-4">
                <div className="text-left space-y-1">
                  <span className="inline-block font-sans-ui text-[11px] font-bold tracking-widest text-stone-500 uppercase">
                    АВИАПОЧТА / PAR AVION
                  </span>
                  <div className="text-xs font-medium text-stone-700 font-sans-ui">
                    Отправитель: <span className="font-semibold text-stone-900">Арина (Программист, г. Реутов)</span>
                    <br />
                    Место встречи: <span className="font-semibold text-rose-700">МФМ 2026 • Россия</span>
                  </div>
                </div>

                {/* Commemorative Postmark */}
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-800/60 p-1 flex flex-col items-center justify-center text-red-900/80 rotate-12 select-none">
                  <span className="text-[9px] font-bold tracking-widest">МФМ 2026</span>
                  <span className="text-[12px] font-extrabold tracking-tighter">РОССИЯ</span>
                  <span className="text-[8px] tracking-wider">ФЕСТИВАЛЬ</span>
                </div>
              </div>

              {/* Center Wax Seal */}
              <div className="my-10 sm:my-14 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-red-700 via-rose-800 to-amber-900 flex flex-col items-center justify-center text-amber-100 shadow-xl border-4 border-amber-600/60 relative cursor-pointer"
                >
                  <Gift className="w-8 h-8 text-amber-200" />
                  <span className="text-[10px] font-bold tracking-wider mt-1 text-amber-100">
                    ОТКРЫТЬ
                  </span>
                  {/* Outer pulse */}
                  <span className="absolute -inset-2 rounded-full border-2 border-red-600/40 animate-ping pointer-events-none" />
                </motion.div>
                <p className="mt-4 text-xs font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5 font-sans-ui">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Нажмите, чтобы сломать печать и достать открытку
                </p>
              </div>

              {/* Address lines */}
              <div className="border-t border-stone-300/70 pt-4 flex flex-col sm:flex-row justify-between items-end gap-2 text-stone-500 text-xs">
                <div className="text-left font-handwriting text-2xl text-stone-700">
                  Дорогому участнику и новому другу!
                </div>
                <div className="font-sans-ui text-[11px] uppercase tracking-wider text-amber-900/80 font-semibold">
                  Цифровой сувенир ручной работы
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Opened Postcard Container with 3D Flip */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Control Bar: Flip & Close */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 px-1 sm:px-2">
              <button
                id="btn-flip-card"
                onClick={() => setIsFlipped(!isFlipped)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-[11px] sm:text-xs font-semibold shadow-xs sm:shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isFlipped ? 'rotate-180' : ''} transition-transform duration-300`} />
                <span>
                  <span className="inline sm:hidden">
                    {isFlipped ? 'На лицевую' : 'Перевернуть (Марки)'}
                  </span>
                  <span className="hidden sm:inline">
                    {isFlipped ? 'Перевернуть на лицевую сторону' : 'Перевернуть открытку (Коллекция марок)'}
                  </span>
                </span>
              </button>

              <button
                id="btn-close-envelope"
                onClick={handleCloseEnvelope}
                className="text-[11px] sm:text-xs text-stone-500 hover:text-stone-800 underline transition-colors shrink-0 text-right cursor-pointer"
              >
                Закрыть обратно в конверт
              </button>
            </div>

            {/* Postcard Body */}
            <div className="relative [perspective:1000px]">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative [transform-style:preserve-3d]"
              >
                
                {/* FRONT SIDE */}
                <div
                  className={`w-full bg-[#fcf9f2] rounded-2xl shadow-xl border-2 border-stone-200/90 p-6 sm:p-8 [backface-visibility:hidden] transition-opacity duration-300 ${
                    isFlipped ? 'pointer-events-none absolute inset-0 opacity-0 overflow-hidden' : 'relative opacity-100'
                  }`}
                >
                  {/* Decorative corner borders */}
                  <div className="flex justify-between items-start pb-4 border-b border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-xs">
                        <Code2 className="w-6 h-6 text-amber-800" />
                      </div>
                      <div className="text-left">
                        <h2 className="font-serif-display font-bold text-xl text-stone-900">
                          Сувенир от программиста Арины
                        </h2>
                        <p className="text-xs text-stone-500 font-sans-ui">
                          Международный молодёжный фестиваль • МФМ 2026
                        </p>
                      </div>
                    </div>

                    {/* Stamp in upper right corner */}
                    <div
                      onClick={() => handleStampClick(stamps[0])}
                      className="cursor-pointer group relative p-1.5 bg-amber-50 rounded-lg border-2 border-dashed border-amber-600/70 hover:scale-105 transition-transform"
                      title="Кликни на марку!"
                    >
                      <div className="w-16 h-20 rounded bg-gradient-to-br from-amber-700 via-rose-700 to-red-800 text-white p-1.5 flex flex-col justify-between items-center text-center shadow-xs">
                        <span className="text-[8px] font-bold tracking-widest uppercase">РОССИЯ</span>
                        <Stamp className="w-6 h-6 text-amber-200" />
                        <span className="text-[8px] font-semibold">МФМ 2026</span>
                      </div>
                      <span className="absolute -bottom-2 -right-1 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        ★
                      </span>
                    </div>
                  </div>

                  {/* Main Grid: Postcard Artwork & Handwritten Letter */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 text-left items-stretch">
                    
                    {/* Visual Art Box - Real Russian Cultural Photograph (Full Bleed across entire rectangle) */}
                    <div className="md:col-span-5 rounded-2xl overflow-hidden relative shadow-lg border border-amber-800/30 flex flex-col justify-between p-4 sm:p-5 text-white min-h-[440px] md:min-h-[560px] h-full group bg-stone-950">
                      {/* Full-bleed background photograph filling the entire rectangular area */}
                      <img
                        key={currentPhoto.src}
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Smooth protective gradients to ensure text readability while leaving image vibrant */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                      {/* Top Badges & Photo Switcher */}
                      <div className="relative z-10 space-y-2.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold tracking-wide text-amber-200 border border-white/20 shadow-xs">
                            🇷🇺 Культура и традиции
                          </span>

                          {/* Switcher pills */}
                          <div className="flex bg-black/70 backdrop-blur-md rounded-full p-0.5 border border-white/20 text-[11px] shadow-sm">
                            {(Object.keys(PHOTO_DATA) as PhotoKey[]).map((key) => {
                              const item = PHOTO_DATA[key];
                              const isSelected = activePhoto === key;
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => setActivePhoto(key)}
                                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium text-[11px] ${
                                    isSelected
                                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                                      : 'text-stone-300 hover:text-white'
                                  }`}
                                  title={item.title}
                                >
                                  {item.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-black/45 backdrop-blur-sm p-3 rounded-xl border border-white/15 shadow-sm">
                          <h3 className="font-serif-display text-lg sm:text-xl font-bold leading-snug text-white drop-shadow-sm">
                            {currentPhoto.title}
                          </h3>
                          <p className="text-[12px] text-amber-200/95 font-sans-ui mt-0.5">
                            {currentPhoto.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Cultural Quote & Tags Card */}
                      <div className="relative z-10 mt-auto pt-6 space-y-2">
                        <div className="bg-stone-950/75 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-lg text-xs text-stone-200 space-y-2">
                          <p className="italic font-serif-display text-sm sm:text-base text-amber-200 leading-snug drop-shadow-xs">
                            {currentPhoto.quote}
                          </p>
                          <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[11px] text-stone-300">
                            <span className="flex items-center gap-1 text-amber-300 font-medium">
                              ✨ {currentPhoto.tag}
                            </span>
                            <span className="font-mono text-[10px] text-stone-300 bg-black/60 px-2 py-0.5 rounded-full border border-white/15">
                              Россия • МФМ 2026
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Handwritten Letter from Arina */}
                    <div className="md:col-span-7 flex flex-col justify-between bg-[#fffefc] rounded-xl p-5 border border-stone-200/80 shadow-xs relative">
                      
                      {/* Lined paper effect */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-sans-ui pb-2 border-b border-dashed border-stone-200">
                          <span>Кому: Самому классному участнику МФМ</span>
                          <span>От: Арины</span>
                        </div>

                        <div className="font-handwriting text-2xl sm:text-3xl text-stone-800 leading-relaxed space-y-3">
                          {mode === 'citizen' ? (
                            <>
                              <p className="text-rose-950 font-bold">
                                Привет, дорогой друг! Как здорово, что мы встретились!
                              </p>
                              <p>
                                Это действительно невероятно, что мы оказались здесь вместе! Я очень рада, что судьба позволила мне попасть сюда и повстречать столько замечательных, талантливых и искренних людей со всех уголков нашей огромной страны!
                              </p>
                              <p>
                                Я учусь на программиста, и так как у меня не было достаточно денег, а покупать шаблонные магнитики показалось скучным и банальным, я решила: а почему бы не сделать что-то особенное своими руками — этот интерактивный сайт-открытку?
                              </p>
                              <p className="text-rose-900 font-bold">
                                Листай дальше: впереди тебя ждёт самовар с предсказаниями, игра-мозаика и уютный мост между нашими городами. Надеюсь, тебе понравится! Я очень старалась.
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-amber-950 font-bold">
                                Дорогой друг! Welcome to Russia!
                              </p>
                              <p>
                                Я в первый раз в жизни еду на такой масштабный международный фестиваль и безумно счастлива оказаться здесь! Тут столько всего удивительного, что буквально глаза разбегаются! Столько новых друзей, культур и улыбок!
                              </p>
                              <p>
                                Я учусь на программиста, денег на дорогие покупные сувениры у меня было немного, да и стандартные магнитики дарить не хотелось. Поэтому я вложила всю душу и создала этот интерактивный сайт-открытку своими руками, чтобы поделиться с тобой настоящим русским теплом!
                              </p>
                              <p className="text-rose-900 font-bold">
                                Листай дальше, заваривай чай в самоваре, лови предсказание дня и давай знакомиться! Надеюсь, эта открытка согреет твоё сердце! Я очень старалась!
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Postcard signature */}
                      <div className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-stone-600 text-xs font-sans-ui">
                          <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                          <span>С теплом из России, Арина (г. Реутов)</span>
                        </div>
                        <span className="font-handwriting text-xl text-stone-700 font-bold">
                          Arina • 2026
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Postcard bottom bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 text-xs text-stone-500 font-sans-ui">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Интерактивный сувенир активен</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="#russia" className="text-amber-800 font-semibold hover:underline flex items-center gap-1">
                        Исследовать Россию →
                      </a>
                    </div>
                  </div>

                </div>

                {/* BACK SIDE (Stamps Passport) */}
                <div
                  className={`w-full bg-[#fcf9f2] rounded-2xl shadow-xl border-2 border-stone-200/90 p-6 sm:p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] transition-opacity duration-300 ${
                    !isFlipped ? 'pointer-events-none absolute inset-0 opacity-0 overflow-hidden' : 'relative opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="font-serif-display font-bold text-2xl text-stone-900">
                        Паспорт коллекционера марок МФМ 2026
                      </h3>
                      <p className="text-xs text-stone-500 font-sans-ui">
                        Нажимайте на марки, чтобы узнать скрытые культурные истории и собрать всю серию!
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 flex items-center gap-1">
                      <span>Открыто:</span>
                      <span
                        key={`passport-unlocked-${stamps.filter((s) => s.unlocked).length}`}
                        className="notranslate font-mono font-bold"
                        translate="no"
                      >
                        {stamps.filter((s) => s.unlocked).length}/{stamps.length}
                      </span>
                    </div>
                  </div>

                  {/* Stamps Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
                    {stamps.map((stamp) => (
                      <motion.div
                        key={stamp.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStampClick(stamp)}
                        className={`cursor-pointer rounded-xl p-3 border-2 border-dashed transition-all flex flex-col items-center text-center justify-between relative min-h-[140px] ${
                          stamp.unlocked
                            ? 'bg-amber-50/60 border-amber-600/70 shadow-xs'
                            : 'bg-stone-100/60 border-stone-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-xs mb-2">
                          <Stamp className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-stone-900 block leading-tight font-sans-ui">
                            {stamp.name}
                          </span>
                          <span className="text-[10px] text-stone-500 block">
                            {stamp.subtitle}
                          </span>
                        </div>
                        <span
                          className={`mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            stamp.unlocked
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {stamp.unlocked ? 'В коллекции' : 'Нажмите'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Selected stamp info & quest hint */}
                  {selectedStamp && (
                    <motion.div
                      key={`stamp-detail-${selectedStamp.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border text-left font-sans-ui ${
                        selectedStamp.unlocked
                          ? 'bg-amber-100/70 border-amber-300 text-stone-800'
                          : 'bg-stone-100 border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                          {selectedStamp.unlocked ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <span className="text-amber-700 shrink-0">🔒</span>
                          )}
                          <span key={`name-${selectedStamp.id}`}>
                            Марка «{selectedStamp.name}»: {selectedStamp.subtitle}
                          </span>
                        </div>
                        <span
                          key={`status-badge-${selectedStamp.id}-${selectedStamp.unlocked}`}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            selectedStamp.unlocked
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-amber-200 text-amber-900'
                          }`}
                        >
                          {selectedStamp.unlocked ? 'Получена в коллекцию' : 'Задание не выполнено'}
                        </span>
                      </div>

                      {selectedStamp.unlocked ? (
                        <p
                          key={`desc-${selectedStamp.id}`}
                          className="mt-2 text-xs text-stone-700 leading-relaxed"
                        >
                          {selectedStamp.description}
                        </p>
                      ) : (
                        <div key={`quest-${selectedStamp.id}`} className="mt-2 space-y-2">
                          <p className="text-xs text-stone-600">
                            <strong>Как получить:</strong> {selectedStamp.questHint}
                          </p>
                          <a
                            href={selectedStamp.targetSection}
                            onClick={() => setIsFlipped(false)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                          >
                            <span>Перейти к заданию</span>
                            <span>→</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="pt-4 border-t border-stone-200 text-center">
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1 font-sans-ui"
                    >
                      ← Вернуться к письму открытки
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
