const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const notes = [
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

const noteStep = 1.35; // seconds per note
const totalDuration = notes.length * noteStep; // 16.2 seconds
const totalSamples = Math.floor(totalDuration * sampleRate);
const buffer = new Float32Array(totalSamples);

notes.forEach((freq, noteIdx) => {
  const startSec = noteIdx * noteStep;
  const startSample = Math.floor(startSec * sampleRate);
  const noteDuration = 2.0; // ring out for 2 seconds
  const numSamples = Math.floor(noteDuration * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    const targetIdx = idx % totalSamples; // wrap around for seamless loop ring-out!
    const t = i / sampleRate;

    // Bell/music box envelope
    const attack = Math.min(1.0, t / 0.015);
    const decay = Math.exp(-t * 2.8);
    const amp = attack * decay;

    // Harmonics: fundamental, octave, octave+fifth, second octave
    const s1 = Math.sin(2 * Math.PI * freq * t) * 0.45;
    const s2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.22 * Math.exp(-t * 4.5);
    const s3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.08 * Math.exp(-t * 6.5);
    const s4 = Math.sin(2 * Math.PI * freq * 4 * t) * 0.04 * Math.exp(-t * 8.0);

    const sampleVal = (s1 + s2 + s3 + s4) * amp;
    buffer[targetIdx] += sampleVal;
  }
});

// Normalize
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  const abs = Math.abs(buffer[i]);
  if (abs > maxAmp) maxAmp = abs;
}
const normFactor = maxAmp > 0 ? 0.75 / maxAmp : 1.0;

// Convert to 16-bit PCM WAV
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const wavBuffer = Buffer.alloc(44 + dataSize);

// RIFF chunk descriptor
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + dataSize, 4);
wavBuffer.write('WAVE', 8);

// fmt sub-chunk
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
wavBuffer.writeUInt16LE(1, 20);  // audioFormat (1 for PCM)
wavBuffer.writeUInt16LE(numChannels, 22);
wavBuffer.writeUInt32LE(sampleRate, 24);
wavBuffer.writeUInt32LE(byteRate, 28);
wavBuffer.writeUInt16LE(blockAlign, 32);
wavBuffer.writeUInt16LE(16, 34); // bitsPerSample

// data sub-chunk
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(dataSize, 40);

// Write interleaved stereo samples
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const val = Math.max(-1, Math.min(1, buffer[i] * normFactor));
  const intVal = Math.floor(val < 0 ? val * 32768 : val * 32767);
  wavBuffer.writeInt16LE(intVal, offset);     // Left
  wavBuffer.writeInt16LE(intVal, offset + 2); // Right
  offset += 4;
}

const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'musicbox.wav');
fs.writeFileSync(outPath, wavBuffer);
console.log('Successfully generated seamless music box audio:', outPath, 'Size:', wavBuffer.length);
