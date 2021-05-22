import Oscillator from './Oscillator.js';
import { PX_TO_BEAT } from '../constants.js';

class AudioEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.volume = this.ctx.createGain();
    this.volume.connect(this.ctx.destination);
    this.volume.gain.setValueAtTime(0.25, this.ctx.currentTime);

    this.oscillators = [];
    this.interval = null;
  }

  start(notes, tempo) {
    this.stop();
    const timePerPixel = (60 * 1000)/(tempo * PX_TO_BEAT);
    const sortedNotes = [...notes].sort((a,b) => a.getOffset() - b.getOffset());
    let current = 0;
    const lastNote = sortedNotes.reduce((last, note) => Math.max(last, note.getBeatEnd()), 0) * PX_TO_BEAT;
    const startTime = new Date();
    
    this.interval = setInterval(() => {
      const timeElapsed = new Date() - startTime;
      const pixel = timeElapsed/timePerPixel;
      while(current < sortedNotes.length && sortedNotes[current].getX() <= pixel) {
        const note = sortedNotes[current];
        const length = note.getLength() * PX_TO_BEAT * timePerPixel;
        this.oscillators.push(new Oscillator(note.getType(), note.getTone(), length, this.ctx, this.volume));
        current++;
      }
      if(pixel >= lastNote) {
        this.stop();
      }
    }, timePerPixel);
  }

  stop() {
    this.oscillators.forEach(osc => osc.stop());
    this.oscillators = [];
    clearInterval(this.interval);
  }
}

export default AudioEngine;