import React, { useState } from 'react';
import * as waveFunctions from '../../waves/waveFunctions.js';
import './DisplaySettings.css';

function DisplaySettings({ setNewNoteLength, setBeatDivision, setTempo, setWaveFunction, patches }) {
  const [noteLength, setNoteLength] = useState(1);
  const [beats, setBeats] = useState(4);
  const [bpm, setBpm] = useState(60);
  const [func, setFunc] = useState('sine');

  const noteLengthHandler = (e) => {
    const val = e.target.value;
    setNoteLength(val);
    setNewNoteLength(val);
  }

  const beatsHandler = (e) => {
    const val = e.target.value;
    setBeats(val);
    setBeatDivision(val);
  }

  const bpmHandler = (e) => {
    const val = e.target.value;
    setBpm(val);
    setTempo(val);
  }

  const waveHandler = (e) => {
    const val = e.target.value;
    setFunc(val);
    setWaveFunction(val);
  }

  const getWaves = () => {
    return [...Object.keys(waveFunctions), ...patches.map(patch => patch.getName())];
  }

  return (
    <div className="display-settings">
      New note length <input value={noteLength} onChange={noteLengthHandler}></input>beats.<br />
      Beat division <input value={beats} onChange={beatsHandler}></input>.<br />
      Tempo <input value={bpm} onChange={bpmHandler}></input>bpm.<br />
      Wave <select value={func} onChange={waveHandler}>
        {getWaves().map(x => <option value={x} key={x}>{x}</option>)}
      </select>
    </div>
  );
}

export default DisplaySettings;
