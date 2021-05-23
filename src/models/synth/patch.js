import Oscillator from "./oscillator.js";

class Patch {
  constructor() {
    this.name = 'Patch';
    this.oscillators = [];
  }

  newOscillator() {
    const newOscillators = [...this.oscillators, new Oscillator()];
    this.oscillators = newOscillators;
  }

  setName(name) {
    this.name = name;
  }

  setOscillators(oscillators) {
    this.oscillators = oscillators;
  }
}

export default Patch;