import { SAMPLES, VOLUME } from '../constants.js';

function generateTone(freq, length, func) {
  const arr = []
  for(let i = 0; i < SAMPLES * length; i++) {
      const val = Math.floor(func(freq, i/SAMPLES) * VOLUME);
      arr.push(val, val);
  }
  return arr;
}

export default generateTone;