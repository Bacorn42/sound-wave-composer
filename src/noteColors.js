import * as waveFunctions from './waves/waveFunctions.js';

const colors = ['#0c0', '#c00', '#cc0', '#00c'];
const waveNames = Object.keys(waveFunctions);
const noteColors = {};

for(let i = 0; i < colors.length; i++) {
  noteColors[waveNames[i]] = colors[i];
}

export default noteColors;