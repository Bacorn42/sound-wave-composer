import Oscillator from "./Oscillator";

class Patch {
  constructor(patch, tone, length, ctx, volume) {
    this.patch = patch;
    this.oscillators = [];
    this.patch.getOscillators().forEach(osc => this.oscillators.push(new Oscillator(
      osc.getWaveType(), this.getTone(osc, tone), length, ctx, volume
    )));
  }

  getTone(osc, tone) {
    const tuningOffset = osc.getTune() * 100 + osc.getFineTune();
    return tone * (2**(tuningOffset/1200));
  }

  stop() {
    this.oscillators.forEach(osc => osc.stop());
    this.oscillators = [];
  }
}

export default Patch;