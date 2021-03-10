import React, { useState } from 'react';
import { getTone } from '../../waves/sine/tones.js';
import { toneArray } from '../../tones.js';
import getWAV from '../../wav/WAVWriter.js';
import { SAMPLES, SIZE, VOLUME } from '../../constants.js';

function Generator({ rects }) {
  let [waveData, setWaveData] = useState(null);
  const clickHandler = () => {
    const arr = new Array(SIZE).fill(0);
    for(const rect of rects) {
      const index = rect.y / 20;
      const offset = (rect.x / 20) * (1/4);
      const wave = getTone(toneArray[index], 1);
      console.log(SAMPLES * 2 * offset, wave.length);
      for(let i = 0; i < wave.length; i++) {
        const arrIndex = SAMPLES * 2 * offset + i;
        arr[arrIndex] += wave[i];
      }
    }
    const normalizedArr = normalize(arr);
    console.log(normalizedArr);
    setWaveData(getWAV(normalizedArr));
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
  }

  return (
    <div>
      <button onClick={clickHandler}>Generate!</button>
      {getAudio()}
    </div>
  );
}

export default Generator;
