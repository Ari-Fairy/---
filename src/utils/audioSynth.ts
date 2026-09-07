// Web Audio API procedural sound synthesizer (100% self-contained, no external assets needed)

let audioCtx: AudioContext | null = null;
let bgmInterval: ReturnType<typeof setInterval> | null = null;
let isBgmPlaying = true;
let isBgmDesired = true;

// Sound is ALWAYS enabled by default on site entry as requested
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('mfm_bgm_muted');
  } catch {
    // ignore
  }
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Gentle pleasant chime when opening the seal
export function playSealBreakSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    // Subtle paper crinkle / chime
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
  } catch {
    // Ignore audio restrictions
  }
}

// Stamp collecting click sound
export function playStampSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Ignore
  }
}

// Tea pouring bubbling sound
export function playTeaSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
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
  } catch {
    // Ignore
  }
}

// Victory sound for quiz
export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
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
  } catch {
    // Ignore
  }
}

// Gentle ambient music box loop (Russian folk music box harmony)
const PENTATONIC_MELODY = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50, // C6
  880.00,  // A5
  783.99,  // G5
  659.25,  // E5
  587.33,  // D5
  659.25,  // E5
  523.25   // C5
];

let noteIndex = 0;
let stateListeners: Array<(playing: boolean) => void> = [];
let audioActiveListeners: Array<(active: boolean) => void> = [];

export function subscribeBgmState(listener: (playing: boolean) => void): () => void {
  stateListeners.push(listener);
  listener(isBgmPlaying);
  return () => {
    stateListeners = stateListeners.filter((l) => l !== listener);
  };
}

export function subscribeAudioActiveState(listener: (active: boolean) => void): () => void {
  audioActiveListeners.push(listener);
  listener(isAudioActuallyRunning());
  return () => {
    audioActiveListeners = audioActiveListeners.filter((l) => l !== listener);
  };
}

function notifyState(playing: boolean) {
  isBgmPlaying = playing;
  stateListeners.forEach((l) => {
    try {
      l(playing);
    } catch {
      // ignore
    }
  });
  notifyAudioActiveState();
}

function notifyAudioActiveState() {
  const active = isAudioActuallyRunning();
  audioActiveListeners.forEach((l) => {
    try {
      l(active);
    } catch {
      // ignore
    }
  });
}

export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}

export function isAudioActuallyRunning(): boolean {
  return isBgmPlaying && isBgmDesired && audioCtx !== null && audioCtx.state === 'running';
}

function playSingleChime(ctx: AudioContext, freq: number) {
  try {
    const now = ctx.currentTime;

    // Primary fundamental bell
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm bell-envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.35);

    // Subtle soft octave overtone for music-box sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    gain2.gain.setValueAtTime(0.0005, now);
    gain2.gain.linearRampToValueAtTime(0.015, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.00005, now + 0.5);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now);
    osc2.stop(now + 0.5);
  } catch {
    // ignore
  }
}

export function ensurePlaybackLoop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }

  notifyState(true);

  const step = () => {
    if (!isBgmDesired) {
      stopAmbientBgm();
      return;
    }
    const currentCtx = getAudioContext();
    if (!currentCtx) return;

    if (currentCtx.state === 'suspended') {
      currentCtx.resume().then(() => {
        if (currentCtx.state === 'running') {
          notifyAudioActiveState();
        }
      }).catch(() => {});
      // Wait until context is running before playing notes
      return;
    }

    notifyAudioActiveState();
    const freq = PENTATONIC_MELODY[noteIndex % PENTATONIC_MELODY.length];
    noteIndex++;
    playSingleChime(currentCtx, freq);
  };

  // If already running, play initial note right away
  if (ctx.state === 'running') {
    step();
  }
  bgmInterval = setInterval(step, 1350);
}

export function startAmbientBgm(): boolean {
  isBgmDesired = true;
  isBgmPlaying = true;
  try {
    localStorage.removeItem('mfm_bgm_muted');
  } catch {}

  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      ensurePlaybackLoop();
      notifyAudioActiveState();
    }).catch(() => {});
  }

  ensurePlaybackLoop();
  return true;
}

export function stopAmbientBgm(): void {
  isBgmDesired = false;
  isBgmPlaying = false;
  try {
    localStorage.setItem('mfm_bgm_muted', 'true');
  } catch {}

  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  notifyState(false);
}

export function toggleAmbientBgm(onStateChange?: (playing: boolean) => void): boolean {
  if (isBgmPlaying && isAudioActuallyRunning()) {
    stopAmbientBgm();
    onStateChange?.(false);
    return false;
  } else {
    const started = startAmbientBgm();
    onStateChange?.(started);
    return started;
  }
}

// Auto-activate audio reliably across Chrome, Yandex, mobile, tablets & desktops
if (typeof window !== 'undefined') {
  const unlockEvents = [
    'pointerdown',
    'touchstart',
    'touchend',
    'click',
    'keydown',
    'scroll'
  ];

  const handleUserGesture = () => {
    if (!isBgmDesired) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const detachIfRunning = () => {
      if (ctx.state === 'running') {
        unlockEvents.forEach((evt) => {
          window.removeEventListener(evt, handleUserGesture, true);
          document.removeEventListener(evt, handleUserGesture, true);
        });
        notifyAudioActiveState();
      }
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (isBgmDesired) {
          ensurePlaybackLoop();
        }
        detachIfRunning();
      }).catch(() => {});
    }

    // Silent buffer unlock for mobile iOS Safari and Android Chrome/Yandex
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {}

    if (isBgmDesired) {
      ensurePlaybackLoop();
    }

    detachIfRunning();
  };

  // Register capturing listener on both window and document
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
    document.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
  });

  // Start playback loop immediately on startup so sound is enabled and running right away
  ensurePlaybackLoop();

  // Attempt instant unmuted resume on page load
  const tryImmediateAutoplay = () => {
    if (!isBgmDesired) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (isBgmDesired && ctx.state === 'running') {
          ensurePlaybackLoop();
          notifyAudioActiveState();
        }
      }).catch(() => {});
    } else if (ctx.state === 'running') {
      notifyAudioActiveState();
    }
  };

  if (document.readyState === 'complete') {
    tryImmediateAutoplay();
  } else {
    window.addEventListener('load', tryImmediateAutoplay, { once: true });
    window.addEventListener('DOMContentLoaded', tryImmediateAutoplay, { once: true });
  }

  // Restore audio if tab was in background and user returns
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isBgmDesired) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (isBgmDesired) ensurePlaybackLoop();
          notifyAudioActiveState();
        }).catch(() => {});
      }
    }
  });
}

