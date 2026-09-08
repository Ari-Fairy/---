// Centralized Audio Manager & Sound Synthesizer

let audioCtx: AudioContext | null = null;
let bgmAudioElement: HTMLAudioElement | null = null;
let stateListeners: Array<(playing: boolean) => void> = [];
let gestureUnlockRegistered = false;

// By default, music is ALWAYS ON for every page visit and reload
let isUserMuted = false;
if (typeof window !== 'undefined') {
  try {
    // Remove any previous mute flag so sound is always enabled on site load/reload
    localStorage.removeItem('mfm_bgm_muted');
    localStorage.removeItem('mfm_bgm_user_muted');
  } catch {}
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch {
      audioCtx = null;
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
  try {
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        notifyState(true);
      }).catch(() => {
        // Expected browser autoplay policy: silently hook onto user interaction without console spam
        setupGestureUnlock();
      });
    }
  } catch {
    setupGestureUnlock();
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

  const onUserTouch = (e: Event) => {
    // Never intercept clicks destined for the sound toggle button
    const target = e.target as HTMLElement | null;
    if (target && target.closest && target.closest('#btn-toggle-sound')) {
      return;
    }

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
  playBgm();
  notifyState(true);
  return true;
}

export function stopAmbientBgm(): void {
  isUserMuted = true;
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

    const play = () => {
      try {
        const now = ctx.currentTime;
        // 1. Paper / wax seal crackle (gentle crisp textured sound)
        const bufferSize = Math.floor(ctx.sampleRate * 0.14);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.025));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, now);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);

        // 2. Welcoming folk gusli/harp chime arpeggio (C5, E5, G5, C6)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          const startTime = now + 0.04 + idx * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.22, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(play);
    } else {
      play();
    }
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

export function playWoodTapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    // Organic wooden knock: two rapid percussive pitch bursts
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    // Second smaller knock (wooden resonance)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(560, now + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.14);

    gain2.gain.setValueAtTime(0.08, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.04);
    osc2.stop(now + 0.15);
  } catch {}
}

export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    const notes = [659.25, 880.0, 1174.66]; // E5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.1, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.35);
    });
  } catch {}
}

export function playBellSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    // Rich resonant church/watch bell chord: fundamental and overtones
    const bellFrequencies = [293.66, 587.33, 880.0, 1174.66, 1480.0];
    const decays = [1.8, 1.4, 1.1, 0.8, 0.5];
    const volumes = [0.15, 0.1, 0.06, 0.04, 0.02];

    bellFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volumes[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[idx]);
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
