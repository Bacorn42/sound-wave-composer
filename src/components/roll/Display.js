import React, { useRef, useEffect } from 'react';
import Note from '../../Note.js';
import { toneNames } from '../../tones.js';
import { PX_TO_TONE } from '../../constants.js';

const TONES = 12;
const WIDTH_UNITS = 20;
const HEIGHT = TONES * PX_TO_TONE;
const WIDTH = WIDTH_UNITS * 20;

function Display({ notes }) {
  const canvas = useRef(null);

  const draw = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.font = '16px sans-serif';
    ctx.strokeStyle = '#666';
    for(let i = 1; i < TONES; i++) {
      ctx.beginPath();
      ctx.moveTo(0, PX_TO_TONE * i);
      ctx.lineTo(WIDTH, PX_TO_TONE * i);
      ctx.stroke();
    }
    for(let i = 1; i < WIDTH_UNITS; i++) {
      ctx.beginPath();
      ctx.moveTo(WIDTH_UNITS * i, 0);
      ctx.lineTo(WIDTH_UNITS * i, HEIGHT);
      ctx.stroke();
    }
    ctx.fillStyle = '#ccc';
    for(const note of notes) {
      ctx.fillRect(note.x + 2, note.y + 2, note.width - 4, note.height - 4);
    }
    ctx.fillStyle = '#000';
    for(let i = 0; i < TONES; i++) {
      ctx.fillText(toneNames[i], 0, PX_TO_TONE * (i + 1) - 4);
    }
  }

  const clickHandler = (e) => {
    const coords = getMouseCoords(e);
    const snapX = Math.floor((coords.x)/WIDTH_UNITS) * WIDTH_UNITS;
    const snapY = Math.floor((coords.y)/WIDTH_UNITS) * WIDTH_UNITS;
    notes.push(new Note(snapX, snapY));
    draw();
  }

  const getMouseCoords = (e) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return {
      x: mouseX,
      y: mouseY,
    };
  }

  const clear = () => {
    notes.splice(0, notes.length);
    draw();
  }

  useEffect(() => draw());

  return (
    <div>
      <canvas ref={canvas} width={WIDTH} height={HEIGHT} onClick={clickHandler}></canvas>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default Display;
