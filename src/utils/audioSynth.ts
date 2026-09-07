// Web Audio API procedural sound synthesizer (100% self-contained, no external assets needed)

let audioCtx: AudioContext | null = null;
let bgmInterval: any = null;
let isBgmPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle pleasant chime when opening the seal
export function playSealBreakSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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
  } catch (e) {
    // Ignore audio restrictions
  }
}

// Stamp collecting click sound
export function playStampSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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
  } catch (e) {
    // Ignore
  }
}

// Tea pouring bubbling sound
export function playTeaSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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
  } catch (e) {
    // Ignore
  }
}

// Victory sound for quiz
export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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
  } catch (e) {
    // Ignore
  }
}

// Gentle ambient music box loop
const PENTATONIC_MELODY = [
  523.25, 587.33, 659.25, 783.99, 880.00,
  1046.50, 880.00, 783.99, 659.25, 587.33
];

let stateListeners: Array<(playing: boolean) => void> = [];

export function subscribeBgmState(listener: (playing: boolean) => void): () => void {
  stateListeners.push(listener);
  listener(isBgmPlaying);
  return () => {
    stateListeners = stateListeners.filter((l) => l !== listener);
  };
}

function notifyState(playing: boolean) {
  stateListeners.forEach((l) => {
    try {
      l(playing);
    } catch {
      // ignore
    }
  });
}

export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}

export function startAmbientBgm(): boolean {
  try {
    if (isBgmPlaying) return true;
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    isBgmPlaying = true;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!isBgmPlaying || !ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const freq = PENTATONIC_MELODY[noteIndex % PENTATONIC_MELODY.length];
      noteIndex++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    };

    playNextNote();
    bgmInterval = setInterval(playNextNote, 1400);
    notifyState(true);
    return true;
  } catch (e) {
    return false;
  }
}

export function stopAmbientBgm(): void {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  isBgmPlaying = false;
  notifyState(false);
}

export function toggleAmbientBgm(onStateChange?: (playing: boolean) => void): boolean {
  if (isBgmPlaying) {
    stopAmbientBgm();
    onStateChange?.(false);
    return false;
  } else {
    const started = startAmbientBgm();
    onStateChange?.(started);
    return started;
  }
}

// Auto-activate audio on first user gesture anywhere on the site to conform to browser policies
if (typeof window !== 'undefined') {
  const tryAutoPlay = () => {
    const started = startAmbientBgm();
    if (started) {
      window.removeEventListener('pointerdown', tryAutoPlay);
      window.removeEventListener('keydown', tryAutoPlay);
      window.removeEventListener('scroll', tryAutoPlay);
    }
  };

  window.addEventListener('pointerdown', tryAutoPlay, { passive: true });
  window.addEventListener('keydown', tryAutoPlay, { passive: true });
  window.addEventListener('scroll', tryAutoPlay, { passive: true, once: true });

  // Also try immediately in case the environment allows it
  try {
    startAmbientBgm();
  } catch {
    // browser requires gesture
  }
}
