import { PX_TO_S, PX_TO_TONE } from './constants.js';
import { toneArray } from './tones.js';

class Note {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PX_TO_S;
    this.height = PX_TO_TONE;
  }

  getOffset() {
    return this.x / PX_TO_S;
  }

  getTone() {
    return toneArray[this.y / PX_TO_TONE];
  }

  inRect(x, y) {
    return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
  }
}

export default Note;