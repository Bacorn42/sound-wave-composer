import React from 'react';
import OscillatorContainer from './OscillatorContainer.js';
import './Patch.css';

function Patch({ patch, setPatch, patchId }) {
  const handleName = (e) => {
    const val = e.target.value;
    patch.setName(val);
    setPatch(patch);
  }

  const newOscillator = () => {
    patch.newOscillator();
    setPatch(patch);
  }

  const setOscillator = (oscillator, index) => {
    const newOscillators = [...patch.oscillators];
    newOscillators[index] = oscillator;
    patch.setOscillators(newOscillators);
    setPatch(patch);
  }

  return (
    <div className="synth-patch">
      Patch name: <input value={patch.name} onChange={handleName}></input>
      <OscillatorContainer oscillators={patch.oscillators} newOscillator={newOscillator} setOscillator={setOscillator} patchId={patchId}></OscillatorContainer>
    </div>
  );
}

export default Patch;
