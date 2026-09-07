// Web Audio API procedural sound synthesizer (100% self-contained, zero external audio files needed)

let audioCtx: AudioContext | null = null;
let isBgmPlaying = true;
let isBgmDesired = true;
let schedulerTimer: ReturnType<typeof setInterval> | null = null;
let nextNoteTime = 0;
let noteIndex = 0;
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

// Gentle sound effects
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

// Gentle ambient Russian folk music box melody
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

function scheduleChime(time: number, freq: number) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    // Primary bell tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.045, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 1.35);

    // Soft sparkle harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    gain2.gain.setValueAtTime(0.0001, time);
    gain2.gain.linearRampToValueAtTime(0.012, time + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.00005, time + 0.5);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(time);
    osc2.stop(time + 0.5);
  } catch {}
}

const NOTE_INTERVAL = 1.35; // seconds
const LOOKAHEAD_SEC = 0.5;

function runScheduler() {
  if (!isBgmDesired || !isBgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
    return;
  }

  // Catch up clock if behind (tab switch, etc.)
  if (nextNoteTime < ctx.currentTime) {
    nextNoteTime = ctx.currentTime + 0.05;
  }

  while (nextNoteTime < ctx.currentTime + LOOKAHEAD_SEC) {
    const freq = PENTATONIC_MELODY[noteIndex % PENTATONIC_MELODY.length];
    noteIndex++;
    scheduleChime(nextNoteTime, freq);
    nextNoteTime += NOTE_INTERVAL;
  }
}

function startScheduler() {
  if (!schedulerTimer) {
    nextNoteTime = 0;
    schedulerTimer = setInterval(runScheduler, 100);
  }
  runScheduler();
}

function stopScheduler() {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
  }
}

function notifyState(playing: boolean) {
  isBgmPlaying = playing;
  stateListeners.forEach((l) => {
    try {
      l(playing);
    } catch {}
  });
}

export function subscribeBgmState(listener: (playing: boolean) => void): () => void {
  stateListeners.push(listener);
  listener(isBgmPlaying);
  return () => {
    stateListeners = stateListeners.filter((l) => l !== listener);
  };
}

export function subscribeAudioActiveState(listener: (active: boolean) => void): () => void {
  return subscribeBgmState(listener);
}

export function isAudioActuallyRunning(): boolean {
  return isBgmPlaying;
}

export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}

export function ensurePlaybackLoop(): void {
  startAmbientBgm();
}

export function startAmbientBgm(): boolean {
  isBgmDesired = true;
  isBgmPlaying = true;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  startScheduler();
  notifyState(true);
  return true;
}

export function stopAmbientBgm(): void {
  isBgmDesired = false;
  isBgmPlaying = false;
  stopScheduler();
  notifyState(false);
}

export function toggleAmbientBgm(): boolean {
  if (isBgmPlaying) {
    stopAmbientBgm();
    return false;
  } else {
    startAmbientBgm();
    return true;
  }
}

// Global user interaction listener to wake up AudioContext on the first tap/click anywhere
if (typeof window !== 'undefined') {
  const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];

  const handleFirstInteraction = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (isBgmDesired) {
          startScheduler();
        }
      }).catch(() => {});
    } else if (isBgmDesired) {
      startScheduler();
    }
  };

  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
    document.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
  });

  // Start scheduler immediately so as soon as context runs, notes stream smoothly
  startScheduler();

  // Try immediate resume
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  } catch {}

  // Handle visibility changes (resume when returning to tab)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isBgmDesired) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (isBgmPlaying) {
        startScheduler();
      }
    }
  });
}
