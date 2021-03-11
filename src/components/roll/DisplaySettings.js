import React, { useState } from 'react';
import './DisplaySettings.css';

function DisplaySettings({ setNewNoteLength }) {
  const [noteLength, setNoteLength] = useState(1);

  const noteLengthHandler = (e) => {
    const val = e.target.value;
    setNoteLength(val);
    setNewNoteLength(val);
  }

  return (
    <div className="display-settings">
      New note length <input value={noteLength} onChange={noteLengthHandler}></input>s.
    </div>
  );
}

export default DisplaySettings;
