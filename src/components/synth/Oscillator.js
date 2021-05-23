import React, { useState } from 'react';
import './Oscillator.css';

function Oscillator({ oscillator, setOscillator, index }) {
  const [waveType, setWaveType] = useState(oscillator.waveType);
  const [tune, setTune] = useState(oscillator.tune);
  const [fineTune, setFineTune] = useState(oscillator.fineTune);

  const handleWaveType = (e) => {
    const val = e.target.value;
    setWaveType(val);
    oscillator.setWaveType(val);
    setOscillator(oscillator, index);
  }

  const handleTune = (e) => {
    const val = Number(e.target.value);
    setTune(val);
    oscillator.setTune(val);
    setOscillator(oscillator, index);
  }

  const handleFineTune = (e) => {
    const val = Number(e.target.value);
    setFineTune(val);
    oscillator.setFineTune(val);
    setOscillator(oscillator, index);
  }

  return (
    <div className="synth-oscillator">
      <select value={waveType} onChange={handleWaveType}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
      <div>
        <input type="range" min="-24" max="24" value={tune} onChange={handleTune}/> {tune}st
      </div>
      <div>
       <input type="range" min="-100" max="100" value={fineTune} onChange={handleFineTune}/> {fineTune}ct
      </div>
    </div>
  )
}

export default Oscillator;
