import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Smartphone,
  X,
  Globe2,
  Flag,
  Share2,
  Printer,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { useAudience } from '../context/AudienceContext';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Canonical public shared URL from AI Studio environment
const PUBLIC_SHARED_BASE_URL = 'https://ais-pre-ntevy5eqmnspkvpojob4xk-540843270034.us-east1.run.app';

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const { mode } = useAudience();
  const [targetAudience, setTargetAudience] = useState<'citizen' | 'international'>(mode);
  const [copied, setCopied] = useState(false);
  const [useSharedLink, setUseSharedLink] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final URL for QR Code
  const getBaseOrigin = () => {
    if (typeof window === 'undefined') return PUBLIC_SHARED_BASE_URL;
    // If running in dev environment or iframe, prioritize the public share URL
    // so participants scanning from smartphones can view without permission walls.
    if (useSharedLink) {
      return PUBLIC_SHARED_BASE_URL;
    }
    return window.location.origin;
  };

  const qrUrl = `${getBaseOrigin()}/?mode=${targetAudience}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(qrUrl);
        setCopied(true);
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
        });
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    try {
      // Create a nice branded canvas with header and footer for printing
      const qrCanvas = canvasRef.current;
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d');
      if (!exportCtx) return;

      const cardW = 600;
      const cardH = 750;
      exportCanvas.width = cardW;
      exportCanvas.height = cardH;

      // Background
      exportCtx.fillStyle = '#faf7f2';
      exportCtx.fillRect(0, 0, cardW, cardH);

      // Border frame
      exportCtx.strokeStyle = '#d97706';
      exportCtx.lineWidth = 6;
      exportCtx.strokeRect(20, 20, cardW - 40, cardH - 40);

      exportCtx.strokeStyle = '#f59e0b';
      exportCtx.lineWidth = 2;
      exportCtx.strokeRect(26, 26, cardW - 52, cardH - 52);

      // Header Text
      exportCtx.fillStyle = '#991b1b';
      exportCtx.font = 'bold 28px serif';
      exportCtx.textAlign = 'center';
      exportCtx.fillText('МФМ 2026 • РОССИЯ', cardW / 2, 75);

      exportCtx.fillStyle = '#78350f';
      exportCtx.font = '600 18px sans-serif';
      exportCtx.fillText('Интерактивный сувенир от Арины', cardW / 2, 105);

      exportCtx.fillStyle = '#78716c';
      exportCtx.font = '14px sans-serif';
      const sub = targetAudience === 'international' ? 'International Edition (English)' : 'Русская версия для гостей и участников';
      exportCtx.fillText(sub, cardW / 2, 130);

      // Draw QR Code centered
      const qrSize = 380;
      const qrX = (cardW - qrSize) / 2;
      const qrY = 160;

      // White card background for QR code
      exportCtx.fillStyle = '#ffffff';
      exportCtx.shadowColor = 'rgba(0,0,0,0.1)';
      exportCtx.shadowBlur = 12;
      exportCtx.fillRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 30);
      exportCtx.shadowColor = 'transparent';

      exportCtx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

      // Footer callout
      exportCtx.fillStyle = '#1c1917';
      exportCtx.font = 'bold 18px sans-serif';
      exportCtx.fillText('Отсканируйте камерой смартфона!', cardW / 2, 600);

      exportCtx.fillStyle = '#a8a29e';
      exportCtx.font = '13px monospace';
      exportCtx.fillText(qrUrl, cardW / 2, 630);

      exportCtx.fillStyle = '#b45309';
      exportCtx.font = '14px sans-serif';
      exportCtx.fillText('✨ Реутов • Культура России • Викторина & Книга пожеланий ✨', cardW / 2, 680);

      // Download
      const dataUrl = exportCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `QR_MFM2026_Arina_${targetAudience}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error('Failed to download QR code', e);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'МФМ 2026 • Интерактивный сувенир от Арины',
          text: 'Отсканируй или перейди по ссылке, чтобы открыть памятный интерактивный сувенир с Всемирного фестиваля молодежи 2026 в России!',
          url: qrUrl,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          className="relative w-full max-w-lg bg-[#fffefb] border-2 border-amber-400/80 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 space-y-5 text-stone-800 text-left my-auto"
        >
          {/* Close button */}
          <button
            type="button"
            id="btn-close-qr-modal"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-amber-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer border border-stone-200"
            title="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5 text-amber-700" />
              <span>QR-код для гостей и друзей</span>
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mt-1.5 leading-snug">
              Отсканируй и открой сувенир
            </h3>
            <p className="text-xs text-stone-600 font-sans-ui mt-0.5">
              Покажи этот QR-код на экране телефона или распечатай для бейджа, чтобы любой участник мгновенно открыл сайт!
            </p>
          </div>

          {/* Audience Version Selector */}
          <div className="bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200 flex items-center gap-1 text-xs">
            <button
              type="button"
              id="btn-qr-mode-citizen"
              onClick={() => setTargetAudience('citizen')}
              className={`flex-1 py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                targetAudience === 'citizen'
                  ? 'bg-white text-stone-900 shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-red-600" />
              <span>🇷🇺 Россия (РФ)</span>
            </button>
            <button
              type="button"
              id="btn-qr-mode-intl"
              onClick={() => setTargetAudience('international')}
              className={`flex-1 py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                targetAudience === 'international'
                  ? 'bg-white text-stone-900 shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>🌍 International</span>
            </button>
          </div>

          {/* QR Code Presentation Box */}
          <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-amber-50/60 to-stone-50 rounded-2xl border border-amber-200/90 shadow-inner relative">
            
            {/* Souvenir Badge Header */}
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full border border-amber-300">
                WYF 2026 • МФМ РОССИЯ
              </span>
              <p className="text-[13px] font-serif-display font-semibold text-stone-800 mt-1">
                Открытка-сувенир от Арины
              </p>
            </div>

            {/* Rendered Canvas QR Code */}
            <div className="p-3.5 bg-white rounded-2xl shadow-md border border-stone-200/80 transition-transform hover:scale-102">
              <QRCodeCanvas
                ref={canvasRef}
                value={qrUrl}
                size={210}
                level="Q"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#1c1917"
              />
            </div>

            {/* Quick scan instruction */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-3 font-medium">
              <Smartphone className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>Наведите камеру любого телефона на этот код</span>
            </div>

            {/* Link Preview */}
            <div className="mt-2 w-full max-w-sm px-3 py-1.5 rounded-xl bg-white/90 border border-stone-200 text-center">
              <p className="text-[11px] font-mono text-stone-500 truncate" title={qrUrl}>
                {qrUrl}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-sans-ui">
            <button
              type="button"
              id="btn-download-qr-png"
              onClick={handleDownloadPng}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Скачать открытку с QR (PNG)</span>
            </button>

            <button
              type="button"
              id="btn-copy-qr-url"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-amber-100/80 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 border border-stone-300 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
              <span>{copied ? 'Ссылка скопирована!' : 'Скопировать ссылку'}</span>
            </button>
          </div>

          {/* Secondary actions: Share and Open in new tab */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100 font-sans-ui">
            <button
              type="button"
              onClick={handleShareNative}
              className="hover:text-amber-800 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Поделиться через мессенджер</span>
            </button>

            <a
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-800 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Проверить ссылку</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
