// Centralized Audio Manager & Sound Synthesizer

let audioCtx: AudioContext | null = null;
let bgmAudioElement: HTMLAudioElement | null = null;
let stateListeners: Array<(playing: boolean) => void> = [];
let gestureUnlockRegistered = false;

// By default, music is ALWAYS ON unless the user explicitly muted it
let isUserMuted = false;
if (typeof window !== 'undefined') {
  try {
    isUserMuted = localStorage.getItem('mfm_bgm_muted') === 'true';
  } catch {
    isUserMuted = false;
  }
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function getBgmAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!bgmAudioElement) {
    bgmAudioElement = document.getElementById('bgm-musicbox') as HTMLAudioElement | null;
    if (!bgmAudioElement) {
      bgmAudioElement = new Audio('/audio/musicbox.mp3');
      bgmAudioElement.id = 'bgm-musicbox';
      bgmAudioElement.loop = true;
      bgmAudioElement.preload = 'auto';
      bgmAudioElement.setAttribute('playsinline', 'true');
      document.body.appendChild(bgmAudioElement);
    }
  }
  return bgmAudioElement;
}

function playBgm() {
  if (isUserMuted) return;
  const audio = getBgmAudio();
  if (!audio) return;

  audio.volume = 0.35;
  const p = audio.play();
  if (p !== undefined) {
    p.then(() => {
      notifyState(true);
    }).catch(() => {
      setupGestureUnlock();
    });
  }
}

function pauseBgm() {
  const audio = getBgmAudio();
  if (audio) {
    audio.pause();
  }
}

function setupGestureUnlock() {
  if (gestureUnlockRegistered || typeof window === 'undefined') return;
  gestureUnlockRegistered = true;

  const events = [
    'pointerdown',
    'touchstart',
    'touchend',
    'mousedown',
    'mouseup',
    'click',
    'keydown',
    'scroll',
    'wheel'
  ];

  const onUserTouch = () => {
    if (!isUserMuted) {
      const audio = getBgmAudio();
      if (audio && audio.paused) {
        audio.volume = 0.35;
        const p = audio.play();
        if (p !== undefined) {
          p.then(() => {
            notifyState(true);
            cleanup();
          }).catch(() => {});
        }
      } else if (audio && !audio.paused) {
        cleanup();
      }
    }
  };

  const cleanup = () => {
    events.forEach((evt) => {
      window.removeEventListener(evt, onUserTouch, true);
      document.removeEventListener(evt, onUserTouch, true);
    });
    gestureUnlockRegistered = false;
  };

  events.forEach((evt) => {
    window.addEventListener(evt, onUserTouch, { capture: true, passive: true });
    document.addEventListener(evt, onUserTouch, { capture: true, passive: true });
  });
}

function notifyState(playing: boolean) {
  stateListeners.forEach((l) => {
    try {
      l(playing);
    } catch {}
  });
}

export function subscribeBgmState(listener: (playing: boolean) => void): () => void {
  stateListeners.push(listener);
  listener(getIsBgmPlaying());
  return () => {
    stateListeners = stateListeners.filter((l) => l !== listener);
  };
}

export function subscribeAudioActiveState(listener: (active: boolean) => void): () => void {
  return subscribeBgmState(listener);
}

export function isAudioActuallyRunning(): boolean {
  return getIsBgmPlaying();
}

export function getIsBgmPlaying(): boolean {
  if (isUserMuted) return false;
  const audio = getBgmAudio();
  return audio ? !audio.paused : true;
}

export function ensurePlaybackLoop(): void {
  startAmbientBgm();
}

export function startAmbientBgm(): boolean {
  isUserMuted = false;
  try {
    localStorage.removeItem('mfm_bgm_muted');
  } catch {}

  playBgm();
  notifyState(true);
  return true;
}

export function stopAmbientBgm(): void {
  isUserMuted = true;
  try {
    localStorage.setItem('mfm_bgm_muted', 'true');
  } catch {}

  pauseBgm();
  notifyState(false);
}

export function toggleAmbientBgm(): boolean {
  const audio = getBgmAudio();
  const isActuallyPlaying = audio ? (!audio.paused && audio.currentTime > 0) : false;

  if (isActuallyPlaying) {
    stopAmbientBgm();
    return false;
  } else {
    startAmbientBgm();
    return true;
  }
}

// Procedural Interactive Sound Effects
export function playSealBreakSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch {}
}

export function playStampSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {}
}

export function playTeaSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    [440, 554, 659, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.08, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.25);
    });
  } catch {}
}

export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.12, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  } catch {}
}

// Initial auto-start and interaction hooks
if (typeof window !== 'undefined') {
  setupGestureUnlock();

  const initAudio = () => {
    if (!isUserMuted) {
      playBgm();
    }
  };

  if (document.readyState === 'complete') {
    initAudio();
  } else {
    window.addEventListener('load', initAudio, { once: true });
    window.addEventListener('DOMContentLoaded', initAudio, { once: true });
  }

  // Hook directly into audio element state changes
  const bindAudioEvents = () => {
    const audio = getBgmAudio();
    if (audio) {
      audio.addEventListener('play', () => notifyState(true));
      audio.addEventListener('pause', () => {
        if (isUserMuted) notifyState(false);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAudioEvents, { once: true });
  } else {
    bindAudioEvents();
  }

  // Resume when returning to the tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !isUserMuted) {
      const audio = getBgmAudio();
      if (audio && audio.paused) {
        audio.play().then(() => notifyState(true)).catch(() => {});
      }
    }
  });
}
