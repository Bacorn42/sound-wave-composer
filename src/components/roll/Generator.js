import React, { useState } from 'react';
import './Generator.css';
import generateTone from '../../waves/generateTone.js';
import * as waveFunctions from '../../waves/waveFunctions.js';
import getWAV from '../../wav/WAVWriter.js';
import { SAMPLES, VOLUME } from '../../constants.js';

function Generator({ notes, tempo }) {
  let [waveData, setWaveData] = useState(null);
  const clickHandler = () => {
    const LENGTH = 5 / (tempo/60);
    const SIZE = SAMPLES * 4 * LENGTH;
    setWaveData(0);
    setTimeout(() => {
      const arr = new Array(SIZE).fill(0);
      for(const note of notes) {
        const offset = note.getOffset() / (tempo/60);
        const wave = generateTone(note.getTone(), note.getLength() / (tempo/60), waveFunctions[note.func]);
        for(let i = 0; i < wave.length; i++) {
          const arrIndex = Math.floor(SAMPLES * 2 * offset) + i;
          arr[arrIndex] += wave[i];
        }
      }
      const normalizedArr = normalize(arr);
      setWaveData(getWAV(normalizedArr, SIZE));
    }, 0);
  }

  const normalize = (arr) => {
    const max = arr.reduce((max, x) => Math.max(max, x), 0);
    if(max > VOLUME) {
      return arr.map(x => Math.floor(x * (VOLUME/max)));
    }
    return arr;
  }

  const getAudio = () => {
    if(waveData) {
      return <audio src={waveData} controls></audio>;
    }
    if(waveData === 0) {
      return <div>Generating...</div>
    }
  }

  return (
    <div className="generator">
      <button onClick={clickHandler}>Generate!</button>
      {getAudio()}
    </div>
  );
}

export default Generator;
