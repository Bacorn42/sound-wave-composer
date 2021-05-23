import React from 'react';
import Oscillator from './Oscillator.js';
import './OscillatorContainer.css';

function OscillatorContainer({ oscillators, newOscillator, setOscillator, patchId }) {
  return (
    <div className="synth-oscillator-container">
      {oscillators.map((osc, index) => <Oscillator oscillator={osc} key={patchId + index} setOscillator={setOscillator} index={index}></Oscillator>)}
      <button onClick={newOscillator}>+</button>
    </div>
  );
}

export default OscillatorContainer;
