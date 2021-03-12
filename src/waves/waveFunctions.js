export const sine = (freq, t) => Math.sin(2 * Math.PI * freq * t);

export const square = (freq, t) => Math.sign(sine(freq, t));

export const sawtooth = (freq, t) => 2 * (t * freq - Math.floor(1/2 + t * freq));

export const triangle = (freq, t) => 2 * Math.abs(sawtooth(freq, t)) - 1;