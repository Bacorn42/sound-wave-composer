import { PX_TO_BEAT, PX_TO_TONE } from './constants.js';
import { toneArray } from './tones.js';

class Note {
  constructor(x, y, length, func) {
    this.x = x;
    this.y = y;
    this.width = PX_TO_BEAT * length;
    this.height = PX_TO_TONE;
    this.tuningOffset = 0;
    this.length = length;
    this.func = func;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y - (this.tuningOffset/100 * PX_TO_TONE);
  }

  getOffset() {
    return this.x / PX_TO_BEAT;
  }

  getTone() {
    return toneArray[this.y / PX_TO_TONE] * (2**(this.tuningOffset/1200));
  }

  getLength() {
    return this.length;
  }

  getBeatEnd() {
    return this.getOffset() + this.getLength();
  }

  getType() {
    return this.func;
  }

  setLength(length) {
    this.length = length;
    this.width = PX_TO_BEAT * length;
  }

  setTuningOffset(offset) {
    this.tuningOffset = offset;
  }

  inRect(x, y) {
    return (x >= this.getX()) && (x <= this.getX() + this.width) && (y >= this.getY()) && (y <= this.getY() + this.height);
  }

  inView(beatStart, beatEnd) {
    return (this.getOffset() < beatEnd) || (this.getBeatEnd() > beatStart);
  }
}

export default Note;