import React, { useState } from 'react';
import Display from './Display.js';
import Generator from './Generator.js';

function Roll() {
  const [notes, setNotes] = useState([]);
  const [tempo, setTempo] = useState(60);

  return (
    <div>
      <Display notes={notes} setNotes={setNotes} tempo={tempo} setTempo={setTempo}></Display>
      <Generator notes={notes} tempo={tempo}></Generator>
    </div>
  );
}

export default Roll;
