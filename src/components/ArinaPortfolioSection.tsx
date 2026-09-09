import { ExternalLink, Headphones, Camera, BookOpen, Award, Heart, Skull, Mail, Gamepad2 } from 'lucide-react';
import { playChimeSound } from '../utils/audioSynth';

export function ArinaPortfolioSection() {
  const handleLinkClick = () => {
    playChimeSound();
  };

  return (
    <section id="portfolio" className="pt-2 pb-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Section Header - Clean & Simple */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-amber-800 tracking-wider uppercase">
            Учебные и авторские работы
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
            Мои проекты
          </h3>
          <p className="text-stone-600 font-sans-ui text-sm leading-relaxed">
            В свободное время я люблю программировать, создавать полезные веб-инструменты и небольшие игры:
          </p>
        </div>

        {/* 1. MAIN PROJECT: My English Journal (Clean, elegant, without screaming elements or dark mockup) */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                  My English Journal
                </h4>
                <span className="text-base" title="English Learning">🇬🇧</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-sans-ui mt-0.5">
                Веб-сайт для изучения английского языка
              </p>
            </div>
            <a
              href="https://my-english-journal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm transition-colors shrink-0"
            >
              <span>Перейти на сайт</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
            </a>
          </div>

          {/* Description */}
          <p className="text-stone-700 font-sans-ui text-xs sm:text-sm leading-relaxed">
            Среди своих проектов мне особенно дорог этот сервис. Я создавала его для себя, когда не смогла найти удобную бесплатную платформу, куда можно загружать свои слова и эффективно их учить. Буду очень рада, если он пригодится и вам!
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-stone-700 font-sans-ui">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf7f2] border border-stone-200/60">
              <Headphones className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">4 режима повторения</strong>
                <span className="text-stone-600 text-xs">Голосовой ввод, правописание, флеш-карточки и выбор на слух.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf7f2] border border-stone-200/60">
              <Camera className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Слова по фотографии</strong>
                <span className="text-stone-600 text-xs">Распознавание текста с книги, вывески или субтитров.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf7f2] border border-stone-200/60">
              <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Чтение книг в оригинале</strong>
                <span className="text-stone-600 text-xs">Градация сложности (A1–C2) со встроенным переводом слов в контексте.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf7f2] border border-stone-200/60">
              <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Умный словарь и аналитика</strong>
                <span className="text-stone-600 text-xs">Автоматическое определение части речи, тематики и трекер прогресса.</span>
              </div>
            </div>
          </div>

          {/* Footer note & contact */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 font-sans-ui border-t border-stone-100">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Бесплатный открытый сервис для всех изучающих язык</span>
            </span>
            <a
              href="mailto:arinast101@gmail.com?subject=Отзыв%20о%20My%20English%20Journal"
              className="hover:text-stone-800 transition-colors inline-flex items-center gap-1 text-stone-600"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Написать автору: arinast101@gmail.com</span>
            </a>
          </div>
        </div>

        {/* 2. GAME PROJECTS: Clean 2-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Game 1: Dating Simulator */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-700 font-sans-ui flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  Визуальная новелла
                </span>
                <span className="text-[11px] text-stone-400 font-mono">RPG / Story</span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-stone-900">
                Игра «Симулятор свиданий»
              </h4>
              <p className="text-stone-600 font-sans-ui text-xs sm:text-sm leading-relaxed">
                Интерактивная новелла, где три уникальных персонажа борются за сердце главной героини. Каждый выбор диалога влияет на развитие отношений и финал истории.
              </p>
              <div className="text-[11px] text-stone-500 font-sans-ui space-y-1 pt-1">
                <div>• 3 самобытных персонажа со своими характерами</div>
                <div>• Музыкальное оформление и эмоциональные сцены</div>
                <div>• Ветвление диалогов и вариативность сюжета</div>
              </div>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-sans-ui flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5 text-stone-400" />
              <span>Авторский проект в портфолио</span>
            </div>
          </div>

          {/* Game 2: Horror Time Loop */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700 font-sans-ui flex items-center gap-1">
                  <Skull className="w-3.5 h-3.5 text-stone-600" />
                  Психологический хоррор
                </span>
                <span className="text-[11px] text-stone-400 font-mono">Time Loop</span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-stone-900">
                Хоррор «Временная петля»
              </h4>
              <p className="text-stone-600 font-sans-ui text-xs sm:text-sm leading-relaxed">
                Атмосферный квест с механикой замкнутого временного круга. Здесь поражение — это не конец игры, а новая возможность разгадать тайну аномалии.
              </p>
              <div className="text-[11px] text-stone-500 font-sans-ui space-y-1 pt-1">
                <div>• Механика петли: сохранение опыта при перезапуске</div>
                <div>• Поиск улик, записок и скрытых предметов</div>
                <div>• Напряженная атмосфера и звуковой дизайн</div>
              </div>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-sans-ui flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5 text-stone-400" />
              <span>Авторский проект в портфолио</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
