import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Sparkles,
  BookOpen,
  Camera,
  Headphones,
  FileEdit,
  Layers,
  CheckCircle2,
  Heart,
  Gamepad2,
  Skull,
  Mail,
  Award,
  Volume2,
  Clock,
  Compass,
} from 'lucide-react';
import { playChimeSound } from '../utils/audioSynth';

export function ArinaPortfolioSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'english' | 'games'>('all');
  const [activeEnglishMode, setActiveEnglishMode] = useState<'modes' | 'camera' | 'books' | 'progress'>('modes');

  const handleLinkClick = () => {
    playChimeSound();
  };

  return (
    <section id="portfolio" className="pt-4 pb-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300/80 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
            Портфолио & Авторские проекты
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-snug">
            Проекты, созданные с душой и кодом 💻
          </h3>
          <p className="text-stone-600 font-sans-ui text-sm sm:text-base leading-relaxed">
            Я учусь на 3-м курсе колледжа и с увлечением создаю интерактивные веб-сервисы и игры. Хочу поделиться своими работами — возможно, они будут полезны и тебе!
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-stone-900 text-amber-200 border-stone-900 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              Все проекты (3)
            </button>
            <button
              onClick={() => setActiveTab('english')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'english'
                  ? 'bg-rose-900 text-rose-100 border-rose-900 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-rose-50'
              }`}
            >
              <span>🇬🇧</span>
              <span>My English Journal</span>
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'games'
                  ? 'bg-purple-900 text-purple-100 border-purple-900 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-purple-50'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Видеоигры (2)</span>
            </button>
          </div>
        </div>

        {/* 1. MAIN FEATURED PROJECT: My English Journal */}
        {(activeTab === 'all' || activeTab === 'english') && (
          <div className="bg-gradient-to-br from-[#fffdfa] via-white to-amber-50/40 rounded-3xl border-2 border-amber-300/90 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
            {/* Background Decorative Stamp */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* Left Column: Story, Title & CTAs */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-bold text-xs shadow-xs tracking-wide">
                    ★ МОЯ ГЛАВНАЯ ГОРДОСТЬ • АВТОРСКИЙ ПРОЕКТ
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-semibold">
                    🇬🇧 English Learning Platform
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    Веб-сайт для изучения английского языка — My English Journal
                  </h4>
                  <p className="text-stone-700 font-sans-ui text-sm sm:text-base leading-relaxed">
                    Среди всех созданных проектов больше всего я горжусь именно этим сервисом! Изначально я создавала его для себя: никак не могла найти удобное бесплатное место, куда можно загружать свои слова и легко учить их. Поэтому решила воплотить идеальную платформу в жизнь!
                  </p>
                </div>

                {/* Sub-Tabs for exploring features */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Исследуйте ключевые возможности сервиса:
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
                    <button
                      onClick={() => setActiveEnglishMode('modes')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeEnglishMode === 'modes'
                          ? 'bg-rose-800 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                      }`}
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>4 режима повторения</span>
                    </button>

                    <button
                      onClick={() => setActiveEnglishMode('camera')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeEnglishMode === 'camera'
                          ? 'bg-rose-800 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Слова по фото</span>
                    </button>

                    <button
                      onClick={() => setActiveEnglishMode('books')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeEnglishMode === 'books'
                          ? 'bg-rose-800 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Книги по уровням</span>
                    </button>

                    <button
                      onClick={() => setActiveEnglishMode('progress')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeEnglishMode === 'progress'
                          ? 'bg-rose-800 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Аналитика & Словарь</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Feature Details Panel */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-stone-800 font-sans-ui text-xs sm:text-sm">
                  {activeEnglishMode === 'modes' && (
                    <div className="space-y-2">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-rose-600" />
                        4 способа тренировки и повторения:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                        <div className="p-2 rounded-lg bg-white border border-stone-200/80">
                          <strong className="text-stone-900 block">🎤 Голосовой ввод</strong>
                          Тренировка произношения и уверенной речи.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-stone-200/80">
                          <strong className="text-stone-900 block">✍ Письменный ввод</strong>
                          Закрепление точного правописания без опечаток.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-stone-200/80">
                          <strong className="text-stone-900 block">🃏 Флеш-карточки</strong>
                          Быстрое зрительное повторение и метод интервалов.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-stone-200/80">
                          <strong className="text-stone-900 block">🎧 Выбор на слух</strong>
                          Распознавание речи на слух и тренировка аудирования.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeEnglishMode === 'camera' && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-rose-600" />
                        Умное добавление слов по фотографии (Photo-to-Word):
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        Сфотографируй незнакомое слово в книге, вывеску на улице или скриншот из фильма — сервис распознает текст, автоматически определит <strong>часть речи</strong>, подберет подходящую <strong>тематику</strong> и добавит слово прямо в твой личный словарь!
                      </p>
                    </div>
                  )}

                  {activeEnglishMode === 'books' && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-rose-600" />
                        Чтение англоязычной литературы под свой уровень:
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        Погружайся в увлекательные книги с градацией по сложности (A1–C2). Можно нажимать на любое незнакомое слово в тексте, мгновенно видеть перевод в контексте и сразу сохранять его на повторение.
                      </p>
                    </div>
                  )}

                  {activeEnglishMode === 'progress' && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-rose-600" />
                        Наглядная аналитика и личный прогресс:
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        Отслеживай изученные слова по дням, неделям и темам. Автоматическая группировка по частям речи помогает видеть, насколько богат твой словарный запас глаголов, прилагательных и идиом!
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://my-english-journal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Перейти на сайт</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href="mailto:arinast101@gmail.com?subject=Отзыв%20о%20My%20English%20Journal"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200/90 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-300 transition-all"
                  >
                    <Mail className="w-4 h-4 text-stone-600" />
                    <span>Написать автору</span>
                  </a>
                </div>

                <div className="text-xs text-stone-500 font-sans-ui flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Бесплатный открытый сервис для всех, кто изучает язык!</span>
                </div>
              </div>

              {/* Right Column: Visual Interactive Card Preview */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="bg-stone-900 text-white rounded-3xl p-6 border-4 border-amber-400/90 shadow-2xl relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-stone-400 ml-2">my-english-journal.vercel.app</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono">
                      v2.0
                    </span>
                  </div>

                  {/* Vocabulary Card Preview */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700/80 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-mono text-rose-400">Word of the Day</div>
                          <div className="text-xl font-bold font-serif-display text-white">Perseverance</div>
                          <div className="text-xs text-stone-400">/ˌpɜːsɪˈvɪərəns/ • noun (сущ.)</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">
                          B2 / C1
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 italic border-l-2 border-amber-400 pl-2">
                        «Настойчивость, упорство перед трудностями»
                      </p>
                      <div className="text-[11px] text-stone-400 font-mono">
                        Theme: Mindset & Growth
                      </div>
                    </div>

                    {/* Quick Features List inside the box */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-800/60 text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Голосовой тест</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-800/60 text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Слова по фото</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-800/60 text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Чтение книг</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-800/60 text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Умные карточки</span>
                      </div>
                    </div>

                    <a
                      href="https://my-english-journal.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md transition-all block"
                    >
                      <span>Открыть My English Journal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. GAME PROJECTS: Dating Simulator & Horror Loop */}
        {(activeTab === 'all' || activeTab === 'games') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Game 1: Dating Simulator */}
            <div className="bg-[#fffefc] rounded-3xl border border-rose-200/90 p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden group hover:border-rose-400 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold">
                    <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                    2 года разработки • Романтика
                  </div>
                  <span className="text-xs text-stone-400 font-mono">RPG / Visual Novel</span>
                </div>

                <div>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <span>Игра «Симулятор свиданий»</span>
                    <span>💖</span>
                  </h4>
                  <p className="mt-2 text-stone-700 font-sans-ui text-xs sm:text-sm leading-relaxed">
                    Увлекательная визуальная новелла, где три обаятельных персонажа борются за твоё сердце! Каждый сюжетный выбор имеет долгосрочные последствия.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-stone-800">Ключевые особенности игры:</div>
                  <ul className="space-y-1.5 text-xs text-stone-600 font-sans-ui">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✔</span>
                      <span><strong>3 уникальных персонажа:</strong> каждый со своим характером, историей и секретами.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✔</span>
                      <span><strong>Музыкальное оформление:</strong> атмосферные мелодии, подчеркивающие эмоциональные моменты.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✔</span>
                      <span><strong>Мини-квесты и ветвления:</strong> сюжет чутко реагирует на каждое твоё решение.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✔</span>
                      <span><strong>Система достижений:</strong> секретные ветки диалогов и памятные трофеи.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  Авторский сюжет & Музыка
                </span>
                <span className="font-medium text-rose-900 bg-rose-50 px-2.5 py-1 rounded-lg">
                  В портфолио автора
                </span>
              </div>
            </div>

            {/* Game 2: Horror Time Loop */}
            <div className="bg-[#fffefc] rounded-3xl border border-stone-300 p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden group hover:border-stone-500 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-bold">
                    <Skull className="w-3.5 h-3.5 text-red-400" />
                    Психологический хоррор
                  </div>
                  <span className="text-xs text-stone-400 font-mono">Time Loop / Mystery</span>
                </div>

                <div>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <span>Хоррор «Временная петля»</span>
                    <span>⏳💀</span>
                  </h4>
                  <p className="mt-2 text-stone-700 font-sans-ui text-xs sm:text-sm leading-relaxed">
                    Атмосферный хоррор-квест с механикой замкнутого временного круга. Здесь смерть — это не конец, а новая попытка разгадать загадку аномалии.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-stone-800">Ключевые особенности игры:</div>
                  <ul className="space-y-1.5 text-xs text-stone-600 font-sans-ui">
                    <li className="flex items-start gap-2">
                      <span className="text-stone-900 font-bold shrink-0">✔</span>
                      <span><strong>Механика петли:</strong> после каждой гибели ты возрождаешься на исходной точке с сохраненными знаниями.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-900 font-bold shrink-0">✔</span>
                      <span><strong>Выживание и саспенс:</strong> осторожность превыше всего, любая ошибка возвращает в начало.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-900 font-bold shrink-0">✔</span>
                      <span><strong>Тайна временной петли:</strong> сбор зацепок и документов для раскрытия истинной причины катастрофы.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-900 font-bold shrink-0">✔</span>
                      <span><strong>Гнетущая атмосфера:</strong> звуковой дизайн и неожиданные сюжетные повороты.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-700" />
                  Перерождение & Выживание
                </span>
                <span className="font-medium text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                  В портфолио автора
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
