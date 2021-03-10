import React, { useRef, useEffect } from 'react';
import { toneNames } from '../../tones.js';

const HEIGHT = 12 * 20;
const WIDTH = 20 * 20;

function Display({ rects }) {
  const canvas = useRef(null);

  const draw = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.font = '16px sans-serif';
    ctx.strokeStyle = '#666';
    for(let i = 0; i < 11; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (HEIGHT/12) * (i + 1));
      ctx.lineTo(WIDTH, (HEIGHT/12) * (i + 1));
      ctx.stroke();
    }
    for(let i = 0; i < 19; i++) {
      ctx.beginPath();
      ctx.moveTo((WIDTH/20) * (i + 1), 0);
      ctx.lineTo((WIDTH/20) * (i + 1), HEIGHT);
      ctx.stroke();
    }
    ctx.fillStyle = '#ccc';
    for(const rect of rects) {
      ctx.fillRect(rect.x + 2, rect.y + 2, 20 * 4 - 4, 20 - 4);
    }
    ctx.fillStyle = '#000';
    for(let i = 0; i < 12; i++) {
      ctx.fillText(toneNames[i], 0, (HEIGHT/12) * (i + 1) - 4);
    }
  }

  const clickHandler = (e) => {
    const coords = getMouseCoords(e);
    const snapX = Math.floor((coords.x)/20) * 20;
    const snapY = Math.floor((coords.y)/20) * 20;
    rects.push({x: snapX, y: snapY});
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
    rects.splice(0, rects.length);
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
