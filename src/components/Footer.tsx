import { useState } from 'react';
import { Share2, Check, Sparkles, Heart, Code2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudience } from '../context/AudienceContext';

export function Footer() {
  const { mode, getShareUrl } = useAudience();
  const [copied, setCopied] = useState(false);

  const isInternational = mode === 'international';

  const handleShare = async () => {
    const shareUrl = getShareUrl ? getShareUrl(mode) : window.location.href;
    const shareTitle = isInternational
      ? 'Interactive Souvenir Postcard • WYF 2026 Russia from Arina'
      : 'Интерактивная открытка-сувенир МФМ 2026 от Арины';
    const shareText = isInternational
      ? 'Hello! Here is a memorable digital souvenir postcard from WYF 2026 in Russia created by Arina:'
      : 'Привет! Лови памятную открытку-сувенир с МФМ 2026 от Арины:';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (e) {
        // User cancelled share dialog or not supported, proceed to clipboard
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 border-t border-stone-800 text-left">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-2xl font-bold text-white tracking-wide">
                МФМ 2026 • Россия
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold uppercase">
                Цифровой сувенир
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans-ui mt-1 max-w-md">
              Интерактивная открытка-сувенир от студентки-программиста Арины для участников Международного молодежного фестиваля 2026.
            </p>
          </div>

          <button
            id="btn-share-souvenir"
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all font-sans-ui cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            <span>
              {isInternational
                ? (copied ? 'Link copied to clipboard!' : 'Share postcard link')
                : (copied ? 'Ссылка скопирована!' : 'Скопировать ссылку на открытку')}
            </span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500 font-sans-ui">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span>Разработано Ариной с любовью к коду, новеллам и дружбе</span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>До новых встреч на МФМ 2026!</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
