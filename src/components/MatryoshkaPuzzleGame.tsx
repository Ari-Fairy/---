import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  Eye,
  CheckCircle2,
  HelpCircle,
  Upload,
  Image as ImageIcon,
  Shuffle,
  Download,
  Share2,
  Award,
  Clock,
  Zap,
} from 'lucide-react';
import { playWoodTapSound, playVictorySound, playChimeSound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface PuzzleTile {
  currentPos: number; // current slot (0..N-1)
  originalPos: number; // correct slot
}

interface PresetImage {
  id: string;
  name: string;
  category: 'holidays' | 'nature';
  url: string;
}

const PRESET_IMAGES: PresetImage[] = [
  // Праздники России
  { id: 'maslenitsa', name: 'Праздник Масленица', category: 'holidays', url: '/images/festival_maslenitsa.jpg' },
  { id: 'ivan_kupala', name: 'Праздник Иван Купала', category: 'holidays', url: '/images/festival_ivan_kupala.jpg' },
  { id: 'krasnaya_gorka', name: 'Красная Горка', category: 'holidays', url: '/images/festival_krasnaya_gorka.jpg' },
  { id: 'yablochny_spas', name: 'Яблочный Спас (Сбор урожая)', category: 'holidays', url: '/images/festival_yablochny_spas.jpg' },
  // Природа и уголки России
  { id: 'baikal', name: 'Озеро Байкал', category: 'nature', url: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?auto=format&fit=crop&w=1000&q=80' },
  { id: 'altai', name: 'Золотой Алтай', category: 'nature', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' },
  { id: 'kamchatka', name: 'Вулканы Камчатки', category: 'nature', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80' },
  { id: 'karelia', name: 'Природа Карелии', category: 'nature', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80' },
];

export function MatryoshkaPuzzleGame({ onComplete }: { onComplete?: () => void }) {
  // Grid size: 3 for "Лёгкий" (3x3 = 9 tiles), 4 for "Мастер" (4x4 = 16 tiles)
  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'holidays' | 'nature'>('all');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_IMAGES[0].url);
  const [customImageName, setCustomImageName] = useState<string>('');

  const [tiles, setTiles] = useState<PuzzleTile[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Certificate Modal State
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>('Участник МФМ 2026');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isSolved) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isSolved]);

  // Initialize and shuffle
  const initPuzzle = (size: 3 | 4 = gridSize) => {
    const count = size * size;
    const initial: PuzzleTile[] = Array.from({ length: count }, (_, i) => ({
      currentPos: i,
      originalPos: i,
    }));

    // Randomize
    const shuffled = [...initial];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].originalPos;
      shuffled[i].originalPos = shuffled[j].originalPos;
      shuffled[j].originalPos = temp;
    }

    // Ensure it's not accidentally solved
    let alreadySolved = true;
    for (let i = 0; i < count; i++) {
      if (shuffled[i].originalPos !== shuffled[i].currentPos) {
        alreadySolved = false;
        break;
      }
    }
    if (alreadySolved && count > 1) {
      const temp = shuffled[0].originalPos;
      shuffled[0].originalPos = shuffled[1].originalPos;
      shuffled[1].originalPos = temp;
    }

    setTiles(shuffled);
    setSelectedTileIndex(null);
    setMovesCount(0);
    setTimeSeconds(0);
    setTimerActive(false);
    setIsSolved(false);
    setIsCertificateOpen(false);
  };

  useEffect(() => {
    initPuzzle(gridSize);
  }, [gridSize, selectedImage]);

  // Handle tile click (swap mechanism)
  const handleTileClick = (index: number) => {
    if (isSolved) return;
    if (!timerActive) setTimerActive(true);
    playWoodTapSound();

    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else if (selectedTileIndex === index) {
      setSelectedTileIndex(null);
    } else {
      const nextTiles = [...tiles];
      const temp = nextTiles[selectedTileIndex].originalPos;
      nextTiles[selectedTileIndex].originalPos = nextTiles[index].originalPos;
      nextTiles[index].originalPos = temp;

      setTiles(nextTiles);
      setSelectedTileIndex(null);
      setMovesCount((prev) => prev + 1);

      // Check win condition
      const won = nextTiles.every((t) => t.currentPos === t.originalPos);
      if (won) {
        setIsSolved(true);
        setTimerActive(false);
        setIsCertificateOpen(true);
        playVictorySound();
        try {
          localStorage.setItem('mfm_puzzle_solved', 'true');
        } catch {}
        if (onComplete) onComplete();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#dc2626', '#10b981', '#6366f1'],
        });
      }
    }
  };

  // Auto solve / cheat / preview
  const handleAutoSolve = () => {
    playWoodTapSound();
    const count = gridSize * gridSize;
    const solved: PuzzleTile[] = Array.from({ length: count }, (_, i) => ({
      currentPos: i,
      originalPos: i,
    }));
    setTiles(solved);
    setIsSolved(true);
    setTimerActive(false);
    setIsCertificateOpen(true);
    playVictorySound();
    try {
      localStorage.setItem('mfm_puzzle_solved', 'true');
    } catch {}
    if (onComplete) onComplete();
  };

  // Custom Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setCustomImageName(file.name);
          initPuzzle(gridSize);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Random preset image (optionally within category)
  const handleRandomImage = () => {
    const pool = selectedCategory === 'all' 
      ? PRESET_IMAGES 
      : PRESET_IMAGES.filter((p) => p.category === selectedCategory);
    const others = pool.filter((p) => p.url !== selectedImage);
    const chosen = others.length > 0 ? others[Math.floor(Math.random() * others.length)] : pool[0];
    if (chosen) {
      setSelectedImage(chosen.url);
      setCustomImageName('');
      initPuzzle(gridSize);
    }
  };

  // Switch category: automatically select a random picture from that category and reset puzzle
  const handleSelectCategory = (cat: 'all' | 'holidays' | 'nature') => {
    setSelectedCategory(cat);
    playWoodTapSound();
    if (cat === 'all') return;
    const pool = PRESET_IMAGES.filter((p) => p.category === cat);
    if (pool.length > 0) {
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      setSelectedImage(chosen.url);
      setCustomImageName('');
      initPuzzle(gridSize);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#fffefc] rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6 text-left relative">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Интерактивная игра-мозаика
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Мозаика дружбы: Собери частички в целое
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans-ui mt-0.5">
            Нажимай по очереди на две любые плитки, чтобы поменять их местами и восстановить картину. За победу ты получишь именной Сертификат Мастера Мозаики МФМ 2026!
          </p>
        </div>

        {/* Level toggle: Easy (3x3) vs Master (4x4) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setGridSize(3);
                initPuzzle(3);
              }}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                gridSize === 3 ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Лёгкий (3×3)
            </button>
            <button
              type="button"
              onClick={() => {
                setGridSize(4);
                initPuzzle(4);
              }}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                gridSize === 4 ? 'bg-white text-purple-950 shadow-xs font-bold ring-1 ring-purple-300' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Мастер (4×4)
            </button>
          </div>
        </div>
      </div>

      {/* Picture Selection Bar: Presets + Random + Upload Custom Photo */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Category Tabs: Все, Праздники России, Природа России */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold text-xs ${
                selectedCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Все темы
            </button>
            <button
              type="button"
              onClick={() => handleSelectCategory('holidays')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold text-xs flex items-center gap-1 ${
                selectedCategory === 'holidays'
                  ? 'bg-rose-100 text-rose-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🎉</span>
              <span>Праздники России</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectCategory('nature')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-semibold text-xs flex items-center gap-1 ${
                selectedCategory === 'nature'
                  ? 'bg-emerald-100 text-emerald-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🌲</span>
              <span>Природа России</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRandomImage}
              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Shuffle className="w-3 h-3 text-amber-700" />
              <span>Случайная картина</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Upload className="w-3 h-3 text-purple-700" />
              <span>Загрузить своё фото</span>
            </button>
          </div>
        </div>

        {/* Thumbnails list filtered by category */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {PRESET_IMAGES.filter((img) => selectedCategory === 'all' || img.category === selectedCategory).map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => {
                setSelectedImage(img.url);
                setCustomImageName('');
                initPuzzle(gridSize);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border shrink-0 transition-all ${
                selectedImage === img.url
                  ? 'bg-purple-100 border-purple-500 text-purple-950 font-bold shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>{img.name}</span>
            </button>
          ))}
          {customImageName && (
            <span className="px-2.5 py-1 rounded-xl bg-purple-200 text-purple-950 font-bold text-xs border border-purple-300 shrink-0">
              Своё фото: {customImageName}
            </span>
          )}
        </div>
      </div>

      {/* Game Stage & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Interactive Puzzle Grid Canvas */}
        <div className="md:col-span-8 flex flex-col items-center justify-center">
          <div
            className="w-full max-w-[420px] aspect-square bg-stone-900 rounded-2xl p-2 shadow-inner grid gap-1.5 relative select-none"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((tile, index) => {
              const isSelected = selectedTileIndex === index;
              const isCorrectSlot = tile.originalPos === tile.currentPos;
              const col = tile.originalPos % gridSize;
              const row = Math.floor(tile.originalPos / gridSize);

              // Percentage offsets for background position
              const bgPosX = (col / (gridSize - 1)) * 100;
              const bgPosY = (row / (gridSize - 1)) * 100;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTileClick(index)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-150 cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'ring-4 ring-purple-500 scale-95 z-10 shadow-lg'
                      : 'hover:opacity-95'
                  }`}
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  }}
                >
                  {/* Indicator for correct spot */}
                  {isCorrectSlot && !isSolved && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 shadow-xs"></div>
                  )}

                  {/* Slot Number watermark */}
                  <span className="absolute bottom-0.5 left-1 text-[9px] font-mono text-white/50 drop-shadow-md">
                    {index + 1}
                  </span>
                </button>
              );
            })}

            {/* Solved Overlay */}
            {isSolved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-serif-display text-2xl font-bold">Картина восстановлена!</h4>
                  <p className="text-xs text-stone-300 font-sans-ui mt-1">
                    Сложность: {gridSize === 3 ? 'Лёгкий 3×3' : 'Мастер 4×4'} • Ходов: {movesCount} • Время: {formatTime(timeSeconds)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCertificateOpen(true)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>Посмотреть сертификат мастера</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => initPuzzle(gridSize)}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Собрать заново</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Info, Original Preview & Actions */}
        <div className="md:col-span-4 space-y-4">
          
          {/* Metrics Box */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block font-sans-ui">
                Ходов сделано
              </span>
              <span className="text-xl font-bold text-stone-900 font-mono">
                {movesCount}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block font-sans-ui">
                Время в игре
              </span>
              <span className="text-xl font-bold text-stone-900 font-mono">
                {formatTime(timeSeconds)}
              </span>
            </div>
          </div>

          {/* Original Preview Button / Thumbnail */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 font-sans-ui">
                Образец картины:
              </span>
              <button
                type="button"
                onClick={() => setShowOriginal(!showOriginal)}
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3 h-3" />
                <span>{showOriginal ? 'Скрыть' : 'Показать'}</span>
              </button>
            </div>

            {showOriginal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl overflow-hidden border border-stone-300 shadow-sm"
              >
                <img
                  src={selectedImage}
                  alt="Образец картины"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                />
              </motion.div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => initPuzzle(gridSize)}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Перемешать плитки</span>
            </button>

            {!isSolved && (
              <button
                type="button"
                onClick={handleAutoSolve}
                className="w-full py-2 px-3 rounded-xl text-stone-400 hover:text-stone-600 text-[11px] flex items-center justify-center gap-1 cursor-pointer hover:underline"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Собрать автоматически (подсказка)</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* POPUP: Праздничный Сертификат Мастера Мозаики Дружбы МФМ 2026 */}
      <AnimatePresence>
        {isCertificateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#fffefb] border-4 border-amber-300/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCertificateOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>

              {/* Certificate Header */}
              <div className="space-y-1">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-xs">
                  🏆
                </div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest block font-sans-ui">
                  Международный фестиваль молодёжи 2026 • Екатеринбург
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                  Сертификат Мастера Мозаики Дружбы
                </h3>
              </div>

              {/* Name Input */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <label className="text-xs text-stone-500 font-sans-ui block">
                  Имя мастера (нажми, чтобы изменить):
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-center font-serif-display text-xl sm:text-2xl font-bold text-purple-950 bg-white border border-purple-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 text-xs font-sans-ui">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-700 block">Уровень</span>
                  <span className="font-bold text-stone-900">
                    {gridSize === 3 ? 'Лёгкий (3×3)' : 'Мастер (4×4)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-700 block">Ходов</span>
                  <span className="font-bold text-stone-900">{movesCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-700 block">Время</span>
                  <span className="font-bold text-stone-900">{formatTime(timeSeconds)}</span>
                </div>
              </div>

              {/* Warm Narrative Text */}
              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui text-left space-y-1.5">
                <p>
                  Настоящим удостоверяется, что обладатель сего сертификата проявил терпение, зоркость и душевное тепло, восстановив целое из разрозненных частей!
                </p>
                <p className="font-handwriting text-xl sm:text-2xl text-stone-900 pt-1">
                  «Точно так же, как этот пазл, наш фестиваль объединяет сотни городов и сердец в единую прекрасную картину дружбы!» — Арина, г. Реутов
                </p>
              </div>

              {/* Buttons: Close or Copy */}
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    playChimeSound();
                    navigator.clipboard?.writeText(
                      `🏆 Сертификат Мастера Мозаики Дружбы МФМ 2026: ${recipientName} собрал(а) мозаику дружбы (${gridSize === 3 ? '3x3' : '4x4'}) за ${movesCount} ходов и ${formatTime(timeSeconds)}!`
                    );
                    alert('Текст сертификата скопирован в буфер обмена!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Скопировать результат</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCertificateOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold cursor-pointer transition-colors"
                >
                  Закрыть
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
