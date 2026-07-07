/**
 * Mini moteur Web Audio de la section DJ Academy.
 * Tout est synthétisé en direct (aucun fichier audio) : kicks, hats,
 * basse et riser. Deux decks à BPM différents, crossfader equal-power,
 * filtre passe-haut maître pour le build-up du drop.
 */

export type DeckId = 'a' | 'b';

interface DeckState {
  gain: GainNode;
  bpm: number;
  pattern: 'beat' | 'house';
  step: number;
  nextTime: number;
  startTime: number;
}

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;

export const DECK_A_BPM = 120;
const DECK_B_BPM = 126;

export class DJEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private decks: Record<DeckId, DeckState> | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private riser: { osc: OscillatorNode; gain: GainNode } | null = null;

  get running(): boolean {
    return this.timer !== null;
  }

  async init(): Promise<void> {
    if (!this.ctx) {
      const ctx = new AudioContext();
      this.ctx = ctx;

      this.master = ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(ctx.destination);

      this.filter = ctx.createBiquadFilter();
      this.filter.type = 'highpass';
      this.filter.frequency.value = 20;
      this.filter.connect(this.master);

      const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = noise;

      const makeDeck = (bpm: number, pattern: DeckState['pattern']): DeckState => {
        const gain = ctx.createGain();
        gain.connect(this.filter as BiquadFilterNode);
        return { gain, bpm, pattern, step: 0, nextTime: 0, startTime: 0 };
      };
      this.decks = {
        a: makeDeck(DECK_A_BPM, 'beat'),
        b: makeDeck(DECK_B_BPM, 'house'),
      };
      this.setCrossfade(0);
    }
    await this.ctx.resume();
  }

  start(): void {
    const ctx = this.ctx;
    const decks = this.decks;
    if (!ctx || !decks || this.timer) return;
    const startAt = ctx.currentTime + 0.06;
    (Object.keys(decks) as DeckId[]).forEach((id) => {
      decks[id].step = 0;
      decks[id].nextTime = startAt;
      decks[id].startTime = startAt;
    });
    this.timer = setInterval(() => this.schedule(), LOOKAHEAD_MS);
  }

  async suspend(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    await this.ctx?.suspend();
  }

  dispose(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    void this.ctx?.close();
    this.ctx = null;
  }

  setCrossfade(value: number): void {
    const decks = this.decks;
    if (!decks) return;
    const t = Math.min(Math.max(value, 0), 1);
    decks.a.gain.gain.value = Math.cos((t * Math.PI) / 2);
    decks.b.gain.gain.value = Math.sin((t * Math.PI) / 2);
  }

  /** Phase 0..1 dans le temps courant du deck A (0 = sur le beat). */
  beatPhase(): number {
    const ctx = this.ctx;
    const deck = this.decks?.a;
    if (!ctx || !deck || deck.startTime === 0) return 0;
    const beatDuration = 60 / deck.bpm;
    return ((ctx.currentTime - deck.startTime) / beatDuration) % 1;
  }

  /** Temps courant 1..4 du deck A (pour le compteur visuel). */
  beatCount(): number {
    const ctx = this.ctx;
    const deck = this.decks?.a;
    if (!ctx || !deck || deck.startTime === 0) return 1;
    const beatDuration = 60 / deck.bpm;
    return (Math.floor((ctx.currentTime - deck.startTime) / beatDuration) % 4) + 1;
  }

  /** Kick immédiat (feedback du pad) ; retourne la phase au moment du tap. */
  tap(): number {
    const ctx = this.ctx;
    if (!ctx || !this.master) return 0;
    this.playKick(this.master, ctx.currentTime);
    return this.beatPhase();
  }

  beginBuild(): void {
    const ctx = this.ctx;
    if (!ctx || !this.filter || !this.master || this.riser) return;
    const now = ctx.currentTime;
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setValueAtTime(20, now);
    this.filter.frequency.exponentialRampToValueAtTime(2500, now + 2);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 2);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.1, now + 2);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    this.riser = { osc, gain };
  }

  /** Relâche le drop ; retourne la phase du beat au moment du lâcher. */
  endBuild(): number {
    const ctx = this.ctx;
    const phase = this.beatPhase();
    if (!ctx || !this.filter || !this.master) return phase;
    const now = ctx.currentTime;
    if (this.riser) {
      this.riser.gain.gain.cancelScheduledValues(now);
      this.riser.gain.gain.setValueAtTime(this.riser.gain.gain.value, now);
      this.riser.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      this.riser.osc.stop(now + 0.06);
      this.riser = null;
    }
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setValueAtTime(20, now);
    this.playKick(this.master, now);
    this.playCrash(this.master, now);
    return phase;
  }

  private schedule(): void {
    const ctx = this.ctx;
    const decks = this.decks;
    if (!ctx || !decks) return;
    (Object.keys(decks) as DeckId[]).forEach((id) => {
      const deck = decks[id];
      const stepDuration = 60 / deck.bpm / 4;
      if (deck.nextTime < ctx.currentTime - 0.2) {
        deck.nextTime = ctx.currentTime + 0.05;
      }
      while (deck.nextTime < ctx.currentTime + SCHEDULE_AHEAD) {
        this.playStep(deck, deck.nextTime);
        deck.nextTime += stepDuration;
        deck.step = (deck.step + 1) % 16;
      }
    });
  }

  private playStep(deck: DeckState, time: number): void {
    const onBeat = deck.step % 4 === 0;
    const offBeat = deck.step % 4 === 2;
    if (deck.pattern === 'beat') {
      if (onBeat) this.playKick(deck.gain, time);
      if (offBeat) this.playHat(deck.gain, time, false);
    } else {
      if (onBeat) this.playKick(deck.gain, time);
      if (offBeat) this.playHat(deck.gain, time, true);
      if (deck.step === 0 || deck.step === 7 || deck.step === 10) {
        this.playBass(deck.gain, time, deck.step === 7 ? 65 : 55);
      }
    }
  }

  private playKick(dest: GainNode, time: number): void {
    const ctx = this.ctx as AudioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  private playHat(dest: GainNode, time: number, open: boolean): void {
    const ctx = this.ctx as AudioContext;
    if (!this.noiseBuffer) return;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    const gain = ctx.createGain();
    const duration = open ? 0.12 : 0.04;
    gain.gain.setValueAtTime(open ? 0.35 : 0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    source.start(time);
    source.stop(time + duration + 0.02);
  }

  private playBass(dest: GainNode, time: number, frequency: number): void {
    const ctx = this.ctx as AudioContext;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = frequency;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.2);
  }

  private playCrash(dest: GainNode, time: number): void {
    const ctx = this.ctx as AudioContext;
    if (!this.noiseBuffer) return;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);
    source.connect(gain);
    gain.connect(dest);
    source.start(time);
    source.stop(time + 0.75);
  }
}
