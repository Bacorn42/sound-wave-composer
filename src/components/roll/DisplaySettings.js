import React, { useState } from 'react';
import './DisplaySettings.css';

function DisplaySettings({ setNewNoteLength, setBeatDivision, setTempo }) {
  const [noteLength, setNoteLength] = useState(1);
  const [beats, setBeats] = useState(4);
  const [bpm, setBpm] = useState(60);

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

  return (
    <div className="display-settings">
      New note length <input value={noteLength} onChange={noteLengthHandler}></input>beats.<br />
      Beat division <input value={beats} onChange={beatsHandler}></input>.<br />
      Tempo <input value={bpm} onChange={bpmHandler}></input>bpm.
    </div>
  );
}

export default DisplaySettings;
