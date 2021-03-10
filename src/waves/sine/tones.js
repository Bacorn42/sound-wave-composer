import { SAMPLES, VOLUME } from '../../constants.js';

export function getTone(freq, length) {
  const arr = []
  for(let i = 0; i < SAMPLES * length; i++) {
      const val = Math.floor(Math.sin(freq * 2 * Math.PI * (i/SAMPLES)) * VOLUME);
      arr.push(val);
      arr.push(val);
  }
  return arr;
}