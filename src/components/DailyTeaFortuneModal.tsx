import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Coffee, Calendar, HeartHandshake } from 'lucide-react';
import { FortuneItem, getFormattedTodayRussian } from '../data/fortunesData';

interface DailyTeaFortuneModalProps {
  isOpen: boolean;
  onClose: () => void;
  fortune: FortuneItem | null;
  isFirstTimeToday: boolean;
}

export function DailyTeaFortuneModal({
  isOpen,
  onClose,
  fortune,
  isFirstTimeToday,
}: DailyTeaFortuneModalProps) {
  if (!isOpen || !fortune) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#fffdf9] rounded-3xl shadow-2xl border-2 border-amber-300/80 p-6 sm:p-8 text-stone-800 text-left my-auto overflow-hidden"
        >
          {/* Decorative background glow & ornament */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Закрыть предсказание"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badge & Date */}
          <div className="flex flex-wrap items-center justify-between gap-2 pr-10 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-bold font-sans-ui">
              <span>🫖</span>
              <span>Предсказание от самовара</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-stone-500 font-sans-ui font-medium">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{getFormattedTodayRussian()}</span>
            </div>
          </div>

          {/* Status Message (First time today vs already drawn) */}
          {isFirstTimeToday ? (
            <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900 font-sans-ui">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
              <span>
                <strong>Свиток открыт!</strong> Самовар дарит тебе послание на сегодня.
              </span>
            </div>
          ) : (
            <div className="mb-4 p-2.5 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-2 text-xs text-stone-700 font-sans-ui">
              <Sparkles className="w-4 h-4 text-stone-500 shrink-0" />
              <span>
                <strong>Предсказание на сегодня уже получено!</strong> Самовар бережно сохранил его для тебя. Новое откроется завтра!
              </span>
            </div>
          )}

          {/* Category Tag */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-sans-ui border ${fortune.categoryBadgeBg} ${fortune.categoryTextColor}`}
            >
              <span>{fortune.icon}</span>
              <span>{fortune.categoryLabel}</span>
            </span>
          </div>

          {/* Headline */}
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-3">
            {fortune.headline}
          </h3>

          {/* Prediction Scroll Body */}
          <div className="relative p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-inner mb-5">
            <p className="font-serif-display text-base sm:text-lg text-stone-800 leading-relaxed font-medium italic">
              «{fortune.text}»
            </p>
          </div>

          {/* Tea Pairing Tip */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5 mb-6 text-xs font-sans-ui">
            <Coffee className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block">Чайное напутствие:</span>
              <span className="text-stone-600 leading-relaxed">{fortune.teaSuggestion}</span>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-200">
            <span className="text-[11px] text-stone-500 font-sans-ui text-center sm:text-left flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>1 предсказание в день • Сохранено в памяти</span>
            </span>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-rose-900 hover:from-amber-800 hover:to-stone-900 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Принять с теплом в сердце ✨
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
