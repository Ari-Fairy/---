import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, CITIZEN_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { useAudience } from '../context/AudienceContext';
import { playStampSound, playVictorySound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  onUnlockStamp: (id: string) => void;
  onScoreUpdated: (score: number) => void;
}

export function QuizSection({ onUnlockStamp, onScoreUpdated }: QuizSectionProps) {
  const { mode } = useAudience();
  const questions = mode === 'citizen' ? CITIZEN_QUIZ_QUESTIONS : QUIZ_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Reset quiz progress smoothly whenever the audience mode is switched
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsCompleted(false);
    setScore(0);
  }, [mode]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already chosen
    setSelectedOption(idx);
    playStampSound();

    const isCorrect = idx === currentQ.correctIndex;
    const newAnswers = { ...answers, [currentQ.id]: idx };
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed! Calculate strictly by verifying every question in the active questions array
      const currentAnswers = {
        ...answers,
        ...(selectedOption !== null ? { [currentQ.id]: selectedOption } : {}),
      };
      const finalScore = questions.reduce((acc, q) => {
        return currentAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
      }, 0);

      setScore(finalScore);
      setIsCompleted(true);
      onScoreUpdated(finalScore);
      onUnlockStamp('stamp-cosmos');
      playVictorySound();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#b45309', '#e11d48', '#3b82f6', '#10b981', '#f59e0b'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <section id="quiz" className="py-16 px-4 sm:px-6 bg-[#faf7f2] relative">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header tailored to audience mode */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            {mode === 'citizen' ? 'Интерактивная викторина' : 'Интерактивный тест'}
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            {mode === 'citizen'
              ? 'Викторина: Насколько хорошо ты знаешь родную культуру?'
              : 'Викторина: Что ты узнал о России?'}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans-ui">
            {mode === 'citizen'
              ? '6 душевных вопросов о русских традициях, чаепитии, ремёслах, наукограде Реутов и сувенире Арины. Проверь себя и получи памятную грамоту!'
              : '6 интересных вопросов о культуре, традициях чая, масштабе, космосе, наукограде Реутов и сувенире Арины. Проверь себя и получи памятный диплом участника!'}
          </p>
        </div>

        {!isCompleted ? (
          /* Active Question Card */
          <div className="bg-[#fffefc] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md text-left space-y-6">
            
            {/* Progress Bar & Header */}
            <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-4 pb-3 border-b border-stone-200">
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-800 font-sans-ui whitespace-nowrap">
                  Вопрос {currentIndex + 1} из {questions.length}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans-ui whitespace-nowrap shrink-0">
                  Правильно: {score}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="w-12 sm:w-28 h-1.5 sm:h-2 bg-stone-100 rounded-full overflow-hidden shrink-0">
                  <div
                    className="h-full bg-purple-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-stone-400 whitespace-nowrap shrink-0">
                  {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const showFeedback = selectedOption !== null;

                let btnStyles = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
                if (showFeedback) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    btnStyles = 'bg-rose-50 border-rose-500 text-rose-950';
                  } else {
                    btnStyles = 'bg-stone-50 border-stone-200 opacity-60 text-stone-600';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-sans-ui transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-stone-200/80 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card appears after choosing */}
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3 text-xs text-stone-800 font-sans-ui"
                >
                  {/* Explicit Correct or Incorrect Banner */}
                  {selectedOption === currentQ.correctIndex ? (
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm bg-emerald-100/90 px-3 py-2 rounded-xl border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>🎉 Верно! Ты абсолютно прав(а)!</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-rose-950 font-bold text-sm bg-rose-100/90 px-3 py-2 rounded-xl border border-rose-300">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span>❌ Неверно!</span>
                        <div className="text-xs font-semibold text-rose-900 mt-0.5">
                          Правильный ответ: «{currentQ.options[currentQ.correctIndex]}»
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="font-medium text-stone-800 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <p className="text-stone-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong>Факт:</strong> {currentQ.funFact}</span>
                  </p>

                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>
                        {currentIndex < questions.length - 1
                          ? 'Следующий вопрос'
                          : 'Посмотреть результаты'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          /* Completed Certificate & Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fffefc] rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Stamp on certificate */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-sans-ui">
                МФМ 2026 • Памятная грамота
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
                {mode === 'citizen'
                  ? 'Сертификат знатока родных традиций'
                  : 'Сертификат знатока России'}
              </h3>
            </div>

            <div className="max-w-md mx-auto p-5 bg-amber-50/80 rounded-2xl border border-amber-200 font-sans-ui text-stone-800 space-y-3">
              <div className="flex items-center justify-center gap-6 pb-2 border-b border-amber-200/80">
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-emerald-600 font-serif-display">
                    {score}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    Правильных ответов
                  </span>
                </div>
                <div className="text-2xl text-stone-300 font-light select-none">/</div>
                <div className="text-center">
                  <span className="block text-3xl sm:text-4xl font-black text-stone-700 font-serif-display">
                    {questions.length}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Всего вопросов
                  </span>
                </div>
              </div>

              <p className="text-sm font-semibold text-stone-800">
                Правильно: <span className="text-emerald-700 font-bold">{score}</span> из <span className="text-stone-700 font-bold">{questions.length}</span> вопросов!
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {score >= 5
                  ? 'Потрясающе! Ты великолепно чувствуешь культуру и душевные традиции!'
                  : score >= 3
                  ? 'Отличный результат! Приятно встретить человека, любящего культуру и общение.'
                  : 'Спасибо за участие! Здорово, что мы провели это время вместе!'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold inline-flex items-center gap-2 transition-all font-sans-ui cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Пройти заново</span>
              </button>

              <button
                type="button"
                disabled
                title="Переход к опросу отключен"
                className="px-5 py-2.5 rounded-xl bg-stone-200 text-stone-400 text-xs font-semibold inline-flex items-center gap-2 font-sans-ui cursor-not-allowed border border-stone-200 opacity-60 select-none"
              >
                <span>Перейти к обмену книгами и опросу ↓</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
