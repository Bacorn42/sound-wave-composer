class Oscillator {
  constructor() {
    this.waveType = 'sine';
    this.tune = 0;
    this.fineTune = 0;
  }

  setWaveType(waveType) {
    this.waveType = waveType;
  }

  setTune(tune) {
    this.tune = tune;
  }

  setFineTune(fineTune) {
    this.fineTune = fineTune;
  }
}

export default Oscillator;