import React, { useState, useEffect } from 'react';

function NoteSettings({ note, draw, deleteNote }) {
  const [tuningOffset, setTuningOffset] = useState(note.tuningOffset);
  const [length, setLength] = useState(note.getLength());

  useEffect(() => {
    setTuningOffset(note.tuningOffset);
    setLength(note.getLength());
  }, [note])

  const handleTuningOffset = (e) => {
    const value = e.target.value;
    setTuningOffset(value);
    note.setTuningOffset(value);
    draw();
  }

  const handleLength = (e) => {
    const value = e.target.value;
    setLength(value);
    note.setLength(value);
    draw();
  }

  return (
    <div>
      Tuning offset <input value={tuningOffset} onChange={handleTuningOffset}></input> cents.<br />
      <button onClick={deleteNote}>Delete</button><br />
      Length <input value={length} onChange={handleLength}></input>s.
    </div>
  );
}

export default NoteSettings;
