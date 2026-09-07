// Background audio manager and procedural sound effect synthesizer

let audioCtx: AudioContext | null = null;
let bgmAudioElement: HTMLAudioElement | null = null;
let stateListeners: Array<(playing: boolean) => void> = [];

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

function getBgmAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!bgmAudioElement) {
    bgmAudioElement = document.getElementById('bgm-musicbox') as HTMLAudioElement | null;
    if (!bgmAudioElement) {
      bgmAudioElement = new Audio('/audio/musicbox.wav');
      bgmAudioElement.id = 'bgm-musicbox';
      bgmAudioElement.loop = true;
      bgmAudioElement.volume = 0.35;
      bgmAudioElement.preload = 'auto';
      bgmAudioElement.setAttribute('playsinline', 'true');
      document.body.appendChild(bgmAudioElement);
    }
  }
  return bgmAudioElement;
}

function isUserExplicitlyMuted(): boolean {
  try {
    return localStorage.getItem('mfm_bgm_user_muted') === 'true';
  } catch {
    return false;
  }
}

export function getIsBgmPlaying(): boolean {
  if (isUserExplicitlyMuted()) return false;
  const audio = getBgmAudio();
  if (audio) {
    return !audio.paused;
  }
  return true;
}

export function isAudioActuallyRunning(): boolean {
  return getIsBgmPlaying();
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

export function ensurePlaybackLoop(): void {
  startAmbientBgm();
}

export function startAmbientBgm(): boolean {
  try {
    localStorage.removeItem('mfm_bgm_user_muted');
  } catch {}

  const audio = getBgmAudio();
  if (audio) {
    audio.play().catch(() => {});
  }
  notifyState(true);
  return true;
}

export function stopAmbientBgm(): void {
  try {
    localStorage.setItem('mfm_bgm_user_muted', 'true');
  } catch {}

  const audio = getBgmAudio();
  if (audio) {
    audio.pause();
  }
  notifyState(false);
}

export function toggleAmbientBgm(): boolean {
  const audio = getBgmAudio();
  const isPlaying = audio ? !audio.paused : !isUserExplicitlyMuted();

  if (isPlaying) {
    stopAmbientBgm();
    return false;
  } else {
    startAmbientBgm();
    return true;
  }
}

// Procedural Interactive Sound Effects (Instantaneous, self-contained Web Audio)
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

// Global browser event hooks: ensure audio element syncs with UI state
if (typeof window !== 'undefined') {
  const syncWithAudio = () => {
    const audio = getBgmAudio();
    if (audio) {
      audio.addEventListener('play', () => notifyState(true));
      audio.addEventListener('pause', () => notifyState(false));

      if (!isUserExplicitlyMuted()) {
        audio.play().then(() => notifyState(true)).catch(() => {});
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncWithAudio);
  } else {
    syncWithAudio();
  }

  // Any user touch, swipe, or click on the screen will trigger playback if browser held it
  const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'scroll'];
  const handleInteraction = () => {
    if (!isUserExplicitlyMuted()) {
      const audio = getBgmAudio();
      if (audio && audio.paused) {
        audio.play().then(() => notifyState(true)).catch(() => {});
      }
    }
  };

  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleInteraction, { capture: true, passive: true });
    document.addEventListener(evt, handleInteraction, { capture: true, passive: true });
  });

  // Resume when returning to tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !isUserExplicitlyMuted()) {
      const audio = getBgmAudio();
      if (audio && audio.paused) {
        audio.play().then(() => notifyState(true)).catch(() => {});
      }
    }
  });
}
