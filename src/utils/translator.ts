export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  popular?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  // Top Festival Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', popular: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', popular: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', popular: true },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳', popular: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', popular: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', popular: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', popular: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', popular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', popular: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', popular: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', popular: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', popular: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', popular: true },

  // CIS and Regional Languages
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha', flag: '🇺🇿', popular: true },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿', popular: true },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycanca', flag: '🇦🇿' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },

  // Asia & Middle East
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол хэл', flag: '🇲🇳' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ', flag: '🇲🇲' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },

  // Europe & Americas
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'tl', name: 'Filipino', nativeName: 'Tagalog', flag: '🇵🇭' },

  // Africa
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
];

export function getCurrentLanguage(): string {
  try {
    // 1. Check audience mode from URL or localStorage
    let audienceMode: string | null = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode') || params.get('audience');
      if (urlMode === 'citizen' || urlMode === 'rf' || urlMode === 'russia') {
        audienceMode = 'citizen';
      } else if (urlMode === 'international' || urlMode === 'foreigner' || urlMode === 'world') {
        audienceMode = 'international';
      } else {
        audienceMode = localStorage.getItem('mfm_audience_mode');
      }
    }

    if (!audienceMode && typeof navigator !== 'undefined') {
      const isRu = navigator.language?.toLowerCase().startsWith('ru');
      audienceMode = isRu ? 'citizen' : 'international';
    }

    // Check if user manually selected a language in the modal
    const isExplicit = localStorage.getItem('mfm_explicit_choice') === 'true';
    const saved = localStorage.getItem('mfm_lang');
    if (isExplicit && saved) {
      return saved;
    }

    // Automatic default:
    // Citizen of RF -> Russian ('ru')
    // Foreigner / International -> English ('en')
    return audienceMode === 'citizen' ? 'ru' : 'en';
  } catch (e) {
    return 'ru';
  }
}

export function setGoogleTransCookie(langCode: string) {
  try {
    const target = `/ru/${langCode}`;
    const domain = window.location.hostname;
    document.cookie = `googtrans=${target}; path=/;`;
    if (domain) {
      document.cookie = `googtrans=${target}; path=/; domain=${domain};`;
      document.cookie = `googtrans=${target}; path=/; domain=.${domain};`;
    }
  } catch (e) {
    console.warn('Could not write googtrans cookie', e);
  }
}

export function triggerGoogleCombo(langCode: string): boolean {
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (!combo || !combo.options || combo.options.length === 0) {
    return false;
  }

  // Set the value
  combo.value = langCode === 'ru' ? '' : langCode;

  // Google Translate relies on both direct onchange property and standard Event dispatch
  try {
    if (typeof (combo as any).onchange === 'function') {
      (combo as any).onchange();
    }
  } catch (e) {}

  combo.dispatchEvent(new Event('change', { bubbles: true }));
  combo.dispatchEvent(new Event('input', { bubbles: true }));
  return true;
}

export function ensureGoogleTranslateScriptLoaded(onReady?: () => void) {
  if (typeof window === 'undefined') return;

  if ((window as any).google && (window as any).google.translate) {
    if (onReady) onReady();
    return;
  }

  const prevInit = (window as any).googleTranslateElementInit;
  (window as any).googleTranslateElementInit = function() {
    try {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'ru',
          autoDisplay: false
        }, 'google_translate_element');
      }
    } catch (e) {}
    if (prevInit) {
      try { prevInit(); } catch(e) {}
    }
    if (onReady) onReady();
  };

  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      // Fail silently without error
    };
    document.head.appendChild(script);
  }
}

export function applyLanguage(langCode: string, reloadIfRu = true) {
  try {
    localStorage.setItem('mfm_lang', langCode);
  } catch (e) {}

  setGoogleTransCookie(langCode);

  // If selecting Russian (original language)
  if (langCode === 'ru') {
    try {
      const domain = window.location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    } catch (e) {}

    triggerGoogleCombo('ru');
    // If the DOM was already modified by Google Translate, reload to cleanly restore pristine Russian
    if (reloadIfRu && typeof document !== 'undefined' && (document.querySelector('.goog-te-banner-frame, #goog-gt-tt, .translated-ltr, .translated-rtl') || document.body.classList.contains('translated-ltr'))) {
      setTimeout(() => {
        window.location.reload();
      }, 60);
    }
    return;
  }

  // Ensure Google Translate script is injected and ready
  ensureGoogleTranslateScriptLoaded(() => {
    triggerGoogleCombo(langCode);
  });

  // Instant trigger if combo already exists
  if (!triggerGoogleCombo(langCode)) {
    // If combo is still loading, retry every 30ms for up to 3 seconds
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (triggerGoogleCombo(langCode) || attempts > 100) {
        clearInterval(interval);
      }
    }, 30);
  }
}
