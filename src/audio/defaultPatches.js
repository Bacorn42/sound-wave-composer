import Patch from '../models/synth/patch.js';
import Oscillator from '../models/synth/oscillator.js';

const getDefaultPatch = (type) => {
  const osc = new Oscillator();
  osc.setWaveType(type);
  const patch = new Patch();
  patch.setOscillators([osc]);
  return patch;
}

export default getDefaultPatch;