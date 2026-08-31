// Procedural Retro Sound Engine using Web Audio API

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientNoise: AudioBufferSourceNode | null = null;
  private isAmbientRunning: boolean = false;

  // Media player procedural synthesizer
  private mediaGain: GainNode | null = null;
  private mediaInterval: number | null = null;
  private isMediaPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.08, this.ctx.currentTime);
    }
    if (this.mediaGain && this.ctx) {
      this.mediaGain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : this.volume * 0.08, this.ctx.currentTime);
    }
    if (this.mediaGain && this.ctx) {
      this.mediaGain.gain.setValueAtTime(muted ? 0 : this.volume * 0.2, this.ctx.currentTime);
    }
  }

  // --- UI Sound Effects ---

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {
      // Audio fallback
    }
  }

  public playKeypress() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 480 + (Math.random() * 80 - 40);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Audio fallback
    }
  }

  public playWindowOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio fallback
    }
  }

  public playWindowClose() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  }

  public playNotification() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.22);
      });
    } catch {
      // Audio fallback
    }
  }

  public playWarning() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [440, 440].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(this.volume * 0.3, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.1);
      });
    } catch {
      // Audio fallback
    }
  }

  public playError() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 low buzz

      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Audio fallback
    }
  }

  public playBoot() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Retro ascending harmonic chime: C4, G4, C5, E5
      const chords = [261.63, 392.00, 523.25, 659.25];
      chords.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = i === 3 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 1.3);
      });
    } catch {
      // Audio fallback
    }
  }

  public playGlitch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (i % 20 < 10 ? 1 : -0.5);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.13);
    } catch {
      // Audio fallback
    }
  }

  public playHorrorSting() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [65.4, 69.3, 110, 116.5]; // low dissonant cluster
      freqs.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + 2.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 2.6);
      });
    } catch {
      // Audio fallback
    }
  }

  // --- Continuous CRT & Drive Ambient Hum ---

  public startAmbientHum() {
    if (this.isAmbientRunning) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.05, this.ctx.currentTime);

      // 60Hz hum
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(60, this.ctx.currentTime);

      // High frequency 15.7kHz CRT whistle (simulated lower at 4kHz so it doesn't hurt human ears)
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(3200, this.ctx.currentTime);

      const highGain = this.ctx.createGain();
      highGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(highGain);
      highGain.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientRunning = true;
    } catch {
      // Fallback
    }
  }

  public stopAmbientHum() {
    if (!this.isAmbientRunning) return;
    try {
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
      this.isAmbientRunning = false;
    } catch {
      // Fallback
    }
  }

  // --- Procedural Synth Player (For Media Player & Atmosphere) ---

  public playProceduralTrack(preset: string, onStop?: () => void) {
    this.stopProceduralTrack();
    this.initContext();
    if (!this.ctx) return;

    this.isMediaPlaying = true;
    this.mediaGain = this.ctx.createGain();
    this.mediaGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.25, this.ctx.currentTime);
    this.mediaGain.connect(this.ctx.destination);

    let step = 0;
    // Scale: Dark retro synth / eerie minor
    const scaleMap: Record<string, number[]> = {
      'synthwave': [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33],
      'void-drone': [55, 110, 116.54, 164.81, 220, 233.08],
      'signal-eerie': [440, 466.16, 554.37, 622.25, 739.99],
      'digital-decay': [130.81, 146.83, 155.56, 174.61, 196, 207.65],
    };

    const notes = scaleMap[preset] || scaleMap['synthwave'];

    this.mediaInterval = window.setInterval(() => {
      if (!this.ctx || !this.isMediaPlaying || !this.mediaGain) return;
      try {
        const now = this.ctx.currentTime;
        const noteIndex = Math.floor(Math.random() * notes.length);
        const freq = notes[noteIndex];

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = preset === 'void-drone' ? 'sawtooth' : (preset === 'signal-eerie' ? 'sine' : 'triangle');
        osc.frequency.setValueAtTime(freq, now);

        if (preset === 'signal-eerie') {
          osc.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() * 0.1 - 0.05)), now + 0.4);
        }

        const duration = preset === 'void-drone' ? 1.8 : 0.45;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(noteGain);
        noteGain.connect(this.mediaGain);

        osc.start(now);
        osc.stop(now + duration + 0.05);

        step++;
      } catch {
        // Fallback
      }
    }, preset === 'void-drone' ? 1200 : 320);
  }

  public stopProceduralTrack() {
    if (this.mediaInterval) {
      clearInterval(this.mediaInterval);
      this.mediaInterval = null;
    }
    if (this.mediaGain) {
      try {
        this.mediaGain.disconnect();
      } catch {}
      this.mediaGain = null;
    }
    this.isMediaPlaying = false;
  }

  public isMediaTrackPlaying() {
    return this.isMediaPlaying;
  }
}

export const sound = new SoundEngine();
