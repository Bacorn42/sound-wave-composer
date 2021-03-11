import React, { useState, useEffect } from 'react';

function NoteSettings({ note, draw }) {
  const [tuningOffset, setTuningOffset] = useState(note.tuningOffset);

  useEffect(() => setTuningOffset(note.tuningOffset), [note])

  const handleTuningOffset = (e) => {
    const value = e.target.value;
    setTuningOffset(value);
    note.setTuningOffset(value);
    draw();
  }

  return (
    <div>
      Tuning offset <input value={tuningOffset} onChange={handleTuningOffset}></input> cents.
    </div>
  );
}

export default NoteSettings;
