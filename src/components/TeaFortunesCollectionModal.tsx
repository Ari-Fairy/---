import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Coffee, Sparkles } from 'lucide-react';
import {
  FORTUNES_COLLECTION,
  UserFortuneState,
} from '../data/fortunesData';

interface TeaFortunesCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  fortuneState: UserFortuneState;
  onBrewMore?: () => void;
}

export function TeaFortunesCollectionModal({
  isOpen,
  onClose,
  fortuneState,
  onBrewMore,
}: TeaFortunesCollectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const safeCollectedIds = Array.from(
    new Set(fortuneState?.collectedIds || fortuneState?.unlockedFortuneIds || [])
  ).filter((id) => FORTUNES_COLLECTION.some((f) => f.id === id));
  const collectedCount = safeCollectedIds.length;
  const totalCount = FORTUNES_COLLECTION.length;
  const percentCollected = Math.round((collectedCount / totalCount) * 100);

  const filteredFortunes = FORTUNES_COLLECTION.filter((f) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'soulful') return f.tone === 'soulful';
    if (selectedCategory === 'good') return f.tone === 'good';
    if (selectedCategory === 'funny') return f.tone === 'funny';
    if (selectedCategory === 'caution') return f.tone === 'caution';
    if (selectedCategory === 'love') return f.tone === 'love';
    if (selectedCategory === 'study') return f.tone === 'study';
    if (selectedCategory === 'rare') return f.rarity === 'rare' || f.rarity === 'legendary';
    return true;
  });

  const CATEGORY_TABS: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'Все свитки', count: totalCount },
    { id: 'soulful', label: 'Душевные 🕊️', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'soulful').length },
    { id: 'good', label: 'Хорошие знаки 🌟', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'good').length },
    { id: 'funny', label: 'Смешные & Ироничные 🤭', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'funny').length },
    { id: 'caution', label: 'С перчинкой 🌶️', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'caution').length },
    { id: 'rare', label: 'Редкие & Легендарные ✨', count: FORTUNES_COLLECTION.filter((f) => f.rarity === 'rare' || f.rarity === 'legendary').length },
    { id: 'love', label: 'Любовь 💖', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'love').length },
    { id: 'study', label: 'Экзамены & Учёба 🎓', count: FORTUNES_COLLECTION.filter((f) => f.tone === 'study').length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#fffefc] rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-left"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-200 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 text-xl shadow-xs">
              🫖
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                  Коллекция свитков от самовара
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-bold text-xs">
                  {collectedCount} из {totalCount} открыто
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui mt-0.5">
                Душевные, смешные, романтические и с перчинкой — заваривай чай раз в день, чтобы открывать новые свитки!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3 bg-stone-50/70 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span className="font-medium">Прогресс коллекции чайных свитков:</span>
              <span className="font-bold text-amber-800">{percentCollected}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-700 transition-all duration-500"
                style={{ width: `${percentCollected}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBrewMore?.();
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-200" />
            <span>К самовару</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="p-3 sm:px-6 bg-white border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Scrollable Fortunes Grid */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFortunes.map((item) => {
              const isUnlocked = safeCollectedIds.includes(item.id);
              const isToday = fortuneState?.dailyFortuneId === item.id;

              if (!isUnlocked) {
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center flex flex-col items-center justify-center min-h-[160px] opacity-60 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-3xl mb-2 filter grayscale">📜</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Неизведанный свиток
                    </span>
                    <p className="text-[11px] text-stone-400 mt-1 max-w-xs">
                      Заваривайте чай в самоваре каждый день, чтобы открыть это предсказание!
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap justify-center">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 font-medium">
                        {item.toneLabel}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                        {item.rarityLabel}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="relative p-5 rounded-2xl border transition-all text-left flex flex-col justify-between bg-[#fffefc] border-amber-200/80 shadow-xs hover:border-amber-400"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-xs font-bold text-stone-800">
                          {item.headline}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold">
                            Сегодня ⭐
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.categoryBadgeBg} ${item.categoryTextColor} border`}>
                          {item.toneLabel}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[9px] font-mono">
                          {item.rarityLabel}
                        </span>
                      </div>
                    </div>

                    {/* Fortune Text */}
                    <p className="text-stone-800 font-serif-display text-sm sm:text-base leading-relaxed mt-1">
                      «{item.text}»
                    </p>
                  </div>

                  {/* Footer suggestion */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans-ui">
                    <span className="flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{item.teaSuggestion}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
