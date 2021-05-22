class Oscillator {
  constructor(type, freq, length, ctx, output) {
    this.osc = ctx.createOscillator();

    this.osc.type = type;
    this.osc.frequency.setValueAtTime(freq, ctx.currentTime);
    this.osc.connect(output);
    this.osc.start();
    this.osc.stop(ctx.currentTime + length / 1000);
  }

  stop() {
    this.osc.stop();
  }
}

export default Oscillator;