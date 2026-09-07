import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  BookOpen,
  Mail,
  Heart,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  User,
  MapPin,
  Gift,
  Link as LinkIcon,
  Film,
  Camera,
  Languages,
  Tv,
  Dumbbell,
  Video,
  Clapperboard,
  Smile,
} from 'lucide-react';
import { SurveyFormData } from '../types';
import { playStampSound, playVictorySound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface SurveyBookSectionProps {
  quizScore: number | null;
  onUnlockStamp: (id: string) => void;
}

const INTEREST_OPTIONS = [
  { id: 'reading', label: 'Книги и новеллы', icon: '📖', desc: 'Чтение новелл, литературы, вебтунов' },
  { id: 'media', label: 'Медиа и блоги', icon: '📰', desc: 'Новости медиа, соцсети, создание контента' },
  { id: 'vlogging', label: 'Влоги и видео', icon: '📹', desc: 'Съемка видео, YouTube, Reels, стриминг' },
  { id: 'photography', label: 'Фотография', icon: '📸', desc: 'Мобильная или профессиональная съемка' },
  { id: 'languages', label: 'Иностранные языки', icon: '🗣️', desc: 'Английский, китайский, корейский и др.' },
  { id: 'movies', label: 'Кино и фильмы', icon: '🍿', desc: 'Мировой кинематограф, блокбастеры, артхаус' },
  { id: 'series', label: 'Сериалы и дорамы', icon: '📺', desc: 'K-Drama, западные сериалы, детективные шоу' },
  { id: 'cartoons', label: 'Мультфильмы и анимация', icon: '🎨', desc: 'Советская классика, Pixar, аниме, мультсериалы' },
  { id: 'sports', label: 'Спорт и активность', icon: '🏃', desc: 'Бег, зал, волейбол, фитнес, прогулки' },
  { id: 'gaming', label: 'Видеоигры', icon: '🎮', desc: 'Genshin, RPG, консоли, инди-проекты' },
  { id: 'coding', label: 'IT и программирование', icon: '💻', desc: 'Разработка, код, веб-технологии, AI' },
  { id: 'travel', label: 'Путешествия и культура', icon: '🌍', desc: 'Знакомство с новыми странами и городами' },
];

export function SurveyBookSection({ quizScore, onUnlockStamp }: SurveyBookSectionProps) {
  const [formData, setFormData] = useState<SurveyFormData>({
    name: '',
    countryCity: '',
    howMet: '',
    interests: ['reading', 'series'],
    recommendationType: 'book',
    lovesReading: true,
    recommendationTitle: '',
    recommendationCreator: '',
    recommendationReview: '',
    bookTitle: '',
    bookAuthor: '',
    bookReview: '',
    favoriteQuote: '',
    recommendationTarget: '',
    hasSouvenirToExchange: false,
    souvenirLink: '',
    contact: '',
    quizScore,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    success: boolean;
    mailtoUrl: string;
    targetEmail: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    playStampSound();
    setFormData((prev) => {
      const exists = prev.interests.includes(id);
      const updated = exists
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id];
      
      // Recommendation can be triggered by any media interest:
      // books, movies, series, games, articles/media, cartoons
      const RECOMMENDABLE_INTERESTS = ['reading', 'movies', 'series', 'gaming', 'media', 'cartoons'];
      const hasMediaInterest = updated.some((i) => RECOMMENDABLE_INTERESTS.includes(i));

      let nextRecType = prev.recommendationType;
      // When newly selected, automatically switch recommendation tab to match the interest
      if (!exists) {
        if (id === 'gaming') nextRecType = 'game';
        else if (id === 'movies' || id === 'cartoons') nextRecType = 'movie';
        else if (id === 'series') nextRecType = 'series';
        else if (id === 'reading') nextRecType = 'book';
        else if (id === 'media') nextRecType = 'article';
      } else {
        // If current rec type was unchecked, smoothly fallback to whatever media is still selected
        if (id === 'reading' && nextRecType === 'book') {
          if (updated.includes('movies')) nextRecType = 'movie';
          else if (updated.includes('series')) nextRecType = 'series';
          else if (updated.includes('gaming')) nextRecType = 'game';
          else if (updated.includes('media')) nextRecType = 'article';
        } else if (id === 'movies' && nextRecType === 'movie') {
          if (updated.includes('series')) nextRecType = 'series';
          else if (updated.includes('gaming')) nextRecType = 'game';
          else if (updated.includes('reading')) nextRecType = 'book';
          else if (updated.includes('media')) nextRecType = 'article';
        } else if (id === 'series' && nextRecType === 'series') {
          if (updated.includes('movies')) nextRecType = 'movie';
          else if (updated.includes('gaming')) nextRecType = 'game';
          else if (updated.includes('reading')) nextRecType = 'book';
          else if (updated.includes('media')) nextRecType = 'article';
        } else if (id === 'gaming' && nextRecType === 'game') {
          if (updated.includes('movies')) nextRecType = 'movie';
          else if (updated.includes('series')) nextRecType = 'series';
          else if (updated.includes('reading')) nextRecType = 'book';
          else if (updated.includes('media')) nextRecType = 'article';
        }
      }

      return {
        ...prev,
        interests: updated,
        recommendationType: nextRecType,
        lovesReading: hasMediaInterest,
      };
    });
  };

  const handleRecTypeChange = (type: 'book' | 'movie' | 'series' | 'article' | 'game') => {
    playStampSound();
    setFormData((prev) => ({ ...prev, recommendationType: type, lovesReading: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Пожалуйста, напиши своё имя или никнейм!');
      return;
    }
    const currentTitle = (formData.recommendationTitle || formData.bookTitle || '').trim();
    if (formData.lovesReading && !currentTitle) {
      const typeLabel =
        formData.recommendationType === 'game'
          ? 'видеоигры'
          : formData.recommendationType === 'movie'
          ? 'фильма'
          : formData.recommendationType === 'series'
          ? 'сериала или дорамы'
          : formData.recommendationType === 'article'
          ? 'статьи'
          : 'книги или новеллы';
      setErrorMessage(`Пожалуйста, поделись названием любимой ${typeLabel}!`);
      return;
    }
    if (formData.hasSouvenirToExchange && !formData.souvenirLink.trim()) {
      setErrorMessage('Пожалуйста, укажи ссылку на твой сувенир или проект!');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const payload: SurveyFormData = {
      ...formData,
      recommendationTitle: currentTitle,
      recommendationCreator: (formData.recommendationCreator || formData.bookAuthor || '').trim(),
      recommendationReview: (formData.recommendationReview || formData.bookReview || '').trim(),
      bookTitle: currentTitle,
      bookAuthor: (formData.recommendationCreator || formData.bookAuthor || '').trim(),
      bookReview: (formData.recommendationReview || formData.bookReview || '').trim(),
      quizScore,
    };

    const newEntry = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      createdAtFormatted: new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date()),
      name: String(payload.name).trim(),
      countryCity: payload.countryCity ? String(payload.countryCity).trim() : 'Не указано',
      howMet: payload.howMet ? String(payload.howMet).trim() : '',
      interests: payload.interests || [],
      recommendationType: payload.recommendationType || 'book',
      lovesReading: Boolean(payload.lovesReading),
      recommendationTitle: currentTitle,
      recommendationCreator: payload.recommendationCreator || '',
      recommendationReview: payload.recommendationReview || '',
      bookTitle: currentTitle,
      bookAuthor: payload.recommendationCreator || '',
      bookReview: payload.recommendationReview || '',
      favoriteQuote: payload.favoriteQuote ? String(payload.favoriteQuote).trim() : '',
      recommendationTarget: payload.recommendationTarget ? String(payload.recommendationTarget).trim() : '',
      hasSouvenirToExchange: Boolean(payload.hasSouvenirToExchange),
      souvenirLink: payload.souvenirLink ? String(payload.souvenirLink).trim() : '',
      contact: payload.contact ? String(payload.contact).trim() : '',
      quizScore: typeof quizScore === 'number' ? quizScore : null,
    };

    // Save locally in browser storage
    try {
      const stored = localStorage.getItem('arina_local_submissions');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newEntry);
      localStorage.setItem('arina_local_submissions', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }

    // Try direct email sending via FormSubmit to arinast101@gmail.com
    try {
      const recLabel =
        payload.recommendationType === 'game'
          ? 'Игра'
          : payload.recommendationType === 'movie'
          ? 'Фильм'
          : payload.recommendationType === 'series'
          ? 'Сериал'
          : payload.recommendationType === 'article'
          ? 'Статья'
          : 'Книга';
      fetch('https://formsubmit.co/ajax/arinast101@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[МФМ 2026] Новое послание и сувенир от ${payload.name} (${payload.countryCity || 'МФМ'})`,
          _template: 'table',
          Имя: payload.name,
          Город_или_Страна: payload.countryCity || 'Не указано',
          Контакты: payload.contact || 'Не указаны',
          Как_познакомились: payload.howMet || 'Не указано',
          Интересы: payload.interests?.join(', ') || 'Не выбраны',
          Сувенир_на_обмен: payload.hasSouvenirToExchange ? payload.souvenirLink : 'Нет',
          Рекомендация: payload.lovesReading
            ? `${recLabel}: "${currentTitle}" (автор/создатель/студия: ${payload.recommendationCreator || '-'})`
            : 'Только теплое послание',
          Отзыв: payload.recommendationReview || '-',
          Любимая_цитата: payload.favoriteQuote || '-',
          Кому_рекомендует: payload.recommendationTarget || '-',
          Баллы_викторины: quizScore !== null ? `${quizScore}/5` : 'Не проходил',
        }),
      }).catch((e) => console.log('Formsubmit background status:', e));
    } catch (e) {
      console.log('Formsubmit setup error', e);
    }

    try {
      const res = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedResult({
          success: true,
          mailtoUrl: data.mailtoUrl,
          targetEmail: data.targetEmail || 'arinast101@gmail.com',
        });
        playVictorySound();
        onUnlockStamp('stamp-mfm');
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#b45309', '#f59e0b', '#3b82f6', '#10b981'],
        });
      } else {
        setErrorMessage(data.error || 'Произошла ошибка при отправке.');
      }
    } catch (err: any) {
      // Fallback: build mailto on client if offline or dev server fallback
      const subject = encodeURIComponent(`[МФМ 2026] Привет от ${formData.name}! Рекомендация и послание`);
      const body = encodeURIComponent(
        `Привет, Арина!\n\n` +
        `Пишет: ${formData.name} (${formData.countryCity || 'МФМ 2026'})\n` +
        `Контакты: ${formData.contact}\n` +
        (formData.hasSouvenirToExchange ? `Ссылка на мой сувенир: ${formData.souvenirLink}\n` : '') +
        (formData.lovesReading ? `\nМоя рекомендация (${formData.recommendationType}):\nНазвание: ${currentTitle}\nСоздатель/Автор: ${payload.recommendationCreator}\nОтзыв: ${payload.recommendationReview}\n` : '')
      );
      setSubmittedResult({
        success: true,
        mailtoUrl: `mailto:arinast101@gmail.com?subject=${subject}&body=${body}`,
        targetEmail: 'arinast101@gmail.com',
      });
      playVictorySound();
      onUnlockStamp('stamp-mfm');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="survey" className="py-16 px-4 sm:px-6 bg-[#f5efe4]/60 border-t border-stone-200 relative">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-rose-700" />
            Книга гостей & Обмен сувенирами
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Оставь послание и посоветуй книгу
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans-ui">
            Давай обменяемся контактами, интересами и любимыми произведениями! А если у тебя тоже есть свой сувенир или проект — поделись ссылкой на него.
          </p>
        </div>

        {submittedResult ? (
          /* Confirmation card after submission */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fffefc] rounded-3xl p-8 sm:p-10 border-2 border-emerald-400 shadow-xl text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center border-2 border-emerald-300">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-display text-3xl font-bold text-stone-900">
                Спасибо огромное, {formData.name}! ✨
              </h3>
              <p className="text-stone-600 font-sans-ui text-sm max-w-lg mx-auto">
                Твоё послание {formData.lovesReading ? 'и рекомендация книги' : ''} успешно сохранены! Ты получил(а) памятную печать участника МФМ 2026!
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-stone-700 font-sans-ui space-y-2 max-w-md mx-auto text-left">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Отправка на личную почту Арины:</span>
              </div>
              <p>
                Послание направлено на <strong>{submittedResult.targetEmail}</strong>. Если хочешь продублировать его лично через своё почтовое приложение — нажми кнопку ниже:
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={submittedResult.mailtoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Открыть в почтовом клиенте</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={() => setSubmittedResult(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold inline-flex items-center gap-2 transition-all font-sans-ui"
              >
                <span>Написать ещё одно послание</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Interactive Survey Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#fffefc] rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md text-left space-y-8"
          >
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-semibold font-sans-ui">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Block 1: About the Guest */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <User className="w-4 h-4 text-rose-700" />
                <h3 className="font-serif-display text-xl font-bold text-stone-900">
                  1. Расскажи о себе
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-sans-ui">
                    Как тебя зовут? (Имя или никнейм) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Например: Даниил / Ли Вэй / Анна"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-hidden focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all font-sans-ui bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 font-sans-ui">
                    Откуда ты приехал(а)? (Город, страна)
                  </label>
                  <input
                    type="text"
                    value={formData.countryCity}
                    onChange={(e) => setFormData({ ...formData, countryCity: e.target.value })}
                    placeholder="Например: Казань, Россия / Сеул, Корея"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-hidden focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all font-sans-ui bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 font-sans-ui">
                  Где мы пересеклись на МФМ 2026 или тёплый привет
                </label>
                <input
                  type="text"
                  value={formData.howMet}
                  onChange={(e) => setFormData({ ...formData, howMet: e.target.value })}
                  placeholder="Например: Познакомились на церемонии открытия / в зоне IT-трека / обмен сувенирами"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-hidden focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all font-sans-ui bg-stone-50/50"
                />
              </div>
            </div>

            {/* Block 2: Interests & Categories */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif-display text-xl font-bold text-stone-900">
                  2. Чем ты увлекаешься? Выбери свои интересы
                </h3>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui">
                Отметь категории, которые тебе близки (включая медиа, влоги, фото, языки, кино, мультфильмы, спорт и др.):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {INTEREST_OPTIONS.map((item) => {
                  const isChecked = formData.interests.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[78px] ${
                        isChecked
                          ? 'bg-rose-50 border-rose-500 text-rose-950 font-semibold shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-xs font-sans-ui font-bold leading-tight">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-sans-ui mt-1 line-clamp-1">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Block 3: SOUVENIR EXCHANGE (Exchange link to souvenir) */}
            <div className="space-y-4 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-5 h-5 text-indigo-700" />
                  <div>
                    <h4 className="font-serif-display font-bold text-lg text-indigo-950">
                      Обмен ссылкой на твой сувенир
                    </h4>
                    <p className="text-xs text-indigo-800 font-sans-ui">
                      У тебя тоже есть цифровой подарок, ссылка, сайт, открытка или проект?
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasSouvenirToExchange}
                    onChange={(e) => {
                      playStampSound();
                      setFormData({ ...formData, hasSouvenirToExchange: e.target.checked });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {formData.hasSouvenirToExchange && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2 space-y-2"
                >
                  <label className="block text-xs font-semibold text-indigo-950 font-sans-ui">
                    Вставь ссылку на твой сувенир или проект (веб-сайт, Telegram-канал, GitHub, портфолио): *
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-indigo-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required={formData.hasSouvenirToExchange}
                      value={formData.souvenirLink}
                      onChange={(e) => setFormData({ ...formData, souvenirLink: e.target.value })}
                      placeholder="https://mysite.com или @username"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-indigo-300 bg-white text-stone-800 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-sans-ui"
                    />
                  </div>
                  <p className="text-[11px] text-indigo-700 font-sans-ui">
                    Арина обязательно перейдет по твоей ссылке, посмотрит твой сувенир и сохранит его на память!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Block 4: CONDITIONAL RECOMMENDATION (Book, Movie, Series, Article) */}
            {formData.lovesReading ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                  <BookOpen className="w-5 h-5 text-amber-800" />
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-stone-900">
                      3. Посоветуй мне что-нибудь классное! ✨
                    </h3>
                    <p className="text-xs text-amber-900 font-sans-ui">
                      Арина обожает читать новеллы, смотреть дорамы, играть в игры и узнавать новое. Выбери формат рекомендации:
                    </p>
                  </div>
                </div>

                {/* Recommendation Type Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'book', label: 'Книга / Новелла', icon: '📖' },
                    { id: 'movie', label: 'Фильм / Кино', icon: '🍿' },
                    { id: 'series', label: 'Сериал / Дорама', icon: '📺' },
                    { id: 'game', label: 'Видеоигра', icon: '🎮' },
                    { id: 'article', label: 'Статья / Лонгрид', icon: '📰' },
                  ].map((t) => {
                    const isSelected = formData.recommendationType === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => handleRecTypeChange(t.id as any)}
                        className={`px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                            : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-100/60'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1 font-sans-ui">
                      {formData.recommendationType === 'game'
                        ? 'Название видеоигры *'
                        : formData.recommendationType === 'movie'
                        ? 'Название фильма *'
                        : formData.recommendationType === 'series'
                        ? 'Название сериала или дорамы *'
                        : formData.recommendationType === 'article'
                        ? 'Тема или название материала *'
                        : 'Название книги / новеллы / манхвы *'}
                    </label>
                    <input
                      type="text"
                      required={formData.lovesReading}
                      value={formData.recommendationTitle || formData.bookTitle || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recommendationTitle: e.target.value,
                          bookTitle: e.target.value,
                        })
                      }
                      placeholder={
                        formData.recommendationType === 'game'
                          ? 'Например: Genshin Impact / The Witcher 3 / Detroit / Hollow Knight'
                          : formData.recommendationType === 'movie'
                          ? 'Например: Интерстеллар / Унесённые призраками'
                          : formData.recommendationType === 'series'
                          ? 'Например: Счастье / Необычный адвокат У Ён У / Винченцо'
                          : formData.recommendationType === 'article'
                          ? 'Например: Статья про исследование космоса / разработку игр'
                          : 'Например: Магистр дьявольского культа / Гарри Поттер'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-stone-800 text-sm focus:outline-hidden focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white font-sans-ui"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1 font-sans-ui">
                      {formData.recommendationType === 'game'
                        ? 'Разработчик, студия или платформа'
                        : formData.recommendationType === 'movie'
                        ? 'Режиссёр или страна'
                        : formData.recommendationType === 'series'
                        ? 'Страна / Актёры / Студия'
                        : formData.recommendationType === 'article'
                        ? 'Автор / Источник публикации'
                        : 'Автор произведения'}
                    </label>
                    <input
                      type="text"
                      value={formData.recommendationCreator || formData.bookAuthor || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recommendationCreator: e.target.value,
                          bookAuthor: e.target.value,
                        })
                      }
                      placeholder={
                        formData.recommendationType === 'game'
                          ? 'Например: miHoYo / Team Cherry / CD Projekt / PC, Консоли'
                          : formData.recommendationType === 'movie' || formData.recommendationType === 'series'
                          ? 'Например: Кристофер Нолан / Южная Корея'
                          : formData.recommendationType === 'article'
                          ? 'Например: Habr / Nature / Telegram'
                          : 'Например: Мосян Тунсю / Ю Рё Хан'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-stone-800 text-sm focus:outline-hidden focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white font-sans-ui"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1 font-sans-ui">
                    {formData.recommendationType === 'game'
                      ? 'О чем игра, какой геймплей или сюжет? Почему стоит поиграть? *'
                      : formData.recommendationType === 'movie' || formData.recommendationType === 'series'
                      ? 'О чем сюжет и почему это стоит посмотреть? Чем зацепило? *'
                      : formData.recommendationType === 'article'
                      ? 'О чем этот материал и какая ключевая мысль тебя зацепила? *'
                      : 'О чем эта книга и почему она тебе так понравилась? Чем зацепила? *'}
                  </label>
                  <textarea
                    rows={4}
                    required={formData.lovesReading}
                    value={formData.recommendationReview || formData.bookReview || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recommendationReview: e.target.value,
                        bookReview: e.target.value,
                      })
                    }
                    placeholder={
                      formData.recommendationType === 'game'
                        ? 'Поделись впечатлениями: атмосфера, геймплейные механики, музыка, визуал или сюжетные повороты...'
                        : 'Поделись своими впечатлениями: атмосфера, любимые моменты, эмоции или неожиданные повороты...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-stone-800 text-sm focus:outline-hidden focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white font-sans-ui"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1 font-sans-ui">
                      {formData.recommendationType === 'game'
                        ? 'Любимый персонаж, фраза или яркий момент'
                        : 'Любимая мысль, цитата или сцена (если помнишь)'}
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteQuote}
                      onChange={(e) => setFormData({ ...formData, favoriteQuote: e.target.value })}
                      placeholder={
                        formData.recommendationType === 'game'
                          ? 'Например: Саундтрек, любимый босс или цитата героя'
                          : '«...»'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-stone-800 text-sm focus:outline-hidden focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white font-sans-ui"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1 font-sans-ui">
                      {formData.recommendationType === 'game'
                        ? 'Кому бы ты посоветовал(а) сыграть в эту игру?'
                        : formData.recommendationType === 'movie' || formData.recommendationType === 'series'
                        ? 'Кому ты особенно советуешь это посмотреть?'
                        : formData.recommendationType === 'article'
                        ? 'Кому стоит прочитать этот материал?'
                        : 'Кому бы ты советовал(а) её прочитать?'}
                    </label>
                    <input
                      type="text"
                      value={formData.recommendationTarget}
                      onChange={(e) => setFormData({ ...formData, recommendationTarget: e.target.value })}
                      placeholder={
                        formData.recommendationType === 'game'
                          ? 'Любителям хорошего сюжета / тем, кто любит уютные игры'
                          : 'Всем, кто ищет вдохновение / мечтателям'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-stone-800 text-sm focus:outline-hidden focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white font-sans-ui"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 font-sans-ui flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span>В твоих интересах не выбраны медиа (кино, книги, сериалы, игры). Хочешь всё равно порекомендовать Арине что-нибудь классное?</span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, lovesReading: true }))}
                  className="px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-lg font-bold hover:bg-amber-200 cursor-pointer text-xs whitespace-nowrap"
                >
                  + Посоветовать что-то классное ✨
                </button>
              </div>
            )}

            {/* Block 5: Contact for reply */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 font-sans-ui">
                Твой контакт (Telegram / VK / Email / Instagram), чтобы Арина могла написать в ответ:
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="@username в Telegram или почта"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-hidden focus:border-rose-600 focus:ring-1 focus:ring-rose-600 font-sans-ui bg-stone-50/50"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                id="btn-submit-survey"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[280px] py-3.5 px-8 rounded-2xl bg-gradient-to-r from-rose-700 via-red-700 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 font-sans-ui cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Сохраняем ответ...' : 'Отправить послание и сувенир Арине ✨'}
                </span>
              </button>
              <p className="mt-2 text-[11px] text-stone-500 font-sans-ui">
                Ответ сохранится на сервере сувенира и подготовит отправку на почту arinast101@gmail.com
              </p>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
