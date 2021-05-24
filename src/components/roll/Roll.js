import React, { useState } from 'react';
import Display from './Display.js';
import AudioEngine from '../../audio/AudioEngine.js';

function Roll({ patches }) {
  const [notes, setNotes] = useState([]);
  const [tempo, setTempo] = useState(60);
  const [engine] = useState(new AudioEngine());

  const play = () => {
    engine.start(notes, tempo, patches);
  }

  const stop = () => {
    engine.stop();
  }

  return (
    <div>
      <Display notes={notes} setNotes={setNotes} tempo={tempo} setTempo={setTempo} patches={patches}></Display>
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default Roll;
