import React, { useState, useEffect } from 'react';
import './NoteSettings.css';

function NoteSettings({ notes, draw, deleteNotes }) {
  const [tuningOffset, setTuningOffset] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setTuningOffset(notes[0].tuningOffset);
    setLength(notes[0].getLength());
  }, [notes])

  const handleTuningOffset = (e) => {
    const value = e.target.value;
    setTuningOffset(value);
    for(const note of notes) {
      note.setTuningOffset(value);
    }
    draw();
  }

  const handleLength = (e) => {
    const value = e.target.value;
    setLength(value);
    for(const note of notes) {
      note.setLength(value);
    }
    draw();
  }

  return (
    <div className="note-settings">
      Tuning offset <input value={tuningOffset} onChange={handleTuningOffset}></input> cents.<br />
      Length <input value={length} onChange={handleLength}></input>beats.<br />
      <button onClick={deleteNotes}>Delete</button>
    </div>
  );
}

export default NoteSettings;
