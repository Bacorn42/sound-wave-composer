import Oscillator from "./oscillator.js";

class Patch {
  static currentId = 0;

  constructor() {
    this.name = 'Patch';
    this.id = Patch.currentId;
    this.oscillators = [];
    Patch.currentId++;
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

  getName() {
    return this.name;
  }

  getId() {
    return this.name + '_' + this.id;
  }

  getOscillators() {
    return this.oscillators;
  }
}

export default Patch;