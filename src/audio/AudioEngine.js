import Patch from './Patch.js';
import getDefaultPatch from './defaultPatches.js';
import { PX_TO_BEAT } from '../constants.js';

class AudioEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.volume = this.ctx.createGain();
    this.volume.connect(this.ctx.destination);
    this.volume.gain.setValueAtTime(0.25, this.ctx.currentTime);

    this.patches = [];
    this.interval = null;
  }

  start(notes, tempo, patches) {
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
        if(['sine', 'square', 'sawtooth', 'triangle'].includes(note.getType())) {
          const patch = getDefaultPatch(note.getType());
          this.patches.push(new Patch(patch, note.getTone(), length, this.ctx, this.volume));
        }
        else {
          const patch = patches.find(patch => patch.getName() === note.getType());
          this.patches.push(new Patch(patch, note.getTone(), length, this.ctx, this.volume));
        }
        current++;
      }
      if(pixel >= lastNote) {
        this.stop();
      }
    }, timePerPixel);
  }

  stop() {
    this.patches.forEach(patch => patch.stop());
    this.patches = [];
    clearInterval(this.interval);
  }
}

export default AudioEngine;