import React, { useState } from 'react';
import Display from './Display.js';
import Generator from './Generator.js';
import AudioEngine from '../../audio/AudioEngine.js';

function Roll() {
  const [notes, setNotes] = useState([]);
  const [tempo, setTempo] = useState(60);
  const engine = new AudioEngine();

  const play = () => {
    engine.start(notes, tempo);
  }

  return (
    <div>
      <Display notes={notes} setNotes={setNotes} tempo={tempo} setTempo={setTempo}></Display>
      <Generator notes={notes} tempo={tempo}></Generator>
      <button onClick={play}>Play</button>
    </div>
  );
}

export default Roll;
