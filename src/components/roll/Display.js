import React, { useRef, useEffect, useState } from 'react';
import './Display.css';
import NoteSettings from './NoteSettings.js';
import Note from '../../Note.js';
import { toneNames } from '../../tones.js';
import { PX_TO_TONE } from '../../constants.js';

const TONES = 12;
const WIDTH_UNITS = 20;
const HEIGHT = TONES * PX_TO_TONE;
const WIDTH = WIDTH_UNITS * 20;

function Display({ notes }) {
  const canvas = useRef(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [ctrlDown, setCtrlDown] = useState(false);

  const draw = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.font = '16px sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';
    for(let i = 1; i < TONES; i++) {
      ctx.beginPath();
      ctx.moveTo(0, PX_TO_TONE * i + 0.5);
      ctx.lineTo(WIDTH, PX_TO_TONE * i +0.5);
      ctx.stroke();
    }
    for(let i = 1; i < WIDTH_UNITS; i++) {
      ctx.beginPath();
      ctx.moveTo(WIDTH_UNITS * i + 0.5, 0);
      ctx.lineTo(WIDTH_UNITS * i + 0.5, HEIGHT);
      ctx.stroke();
    }
    ctx.fillStyle = '#ccc';
    for(const note of notes) {
      ctx.fillRect(note.getX() + 2, note.getY() + 2, note.width - 3, note.height - 3);
      ctx.strokeStyle = (selectedNotes.includes(note)) ? '#900' : '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(note.getX() + 2.5, note.getY() + 2.5, note.width - 4, note.height - 4);
    }
    ctx.fillStyle = '#000';
    for(let i = 0; i < TONES; i++) {
      ctx.fillText(toneNames[i], 0, PX_TO_TONE * (i + 1) - 4);
    }
  }

  const clickHandler = (e) => {
    const coords = getMouseCoords(e);
    for(const note of notes) {
      if(note.inRect(coords.x, coords.y)) {
        if(ctrlDown) {
          setSelectedNotes(selectedNotes => [...selectedNotes, note]);
        }
        else {
          setSelectedNotes([note]);
        }
        draw();
        return;
      }
    }
    const snapX = Math.floor((coords.x)/WIDTH_UNITS) * WIDTH_UNITS;
    const snapY = Math.floor((coords.y)/WIDTH_UNITS) * WIDTH_UNITS;
    notes.push(new Note(snapX, snapY));
    setSelectedNotes([]);
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

  const keyDownHandler = (e) => {
    if(e.key === "Control") {
      setCtrlDown(true);
    }
  }

  const keyUpHandler = (e) => {
    if(e.key === "Control") {
      setCtrlDown(false);
    }
  }

  const clear = () => {
    notes.splice(0, notes.length);
    setSelectedNotes([]);
    draw();
  }

  const deleteNotes = () => {
    for(let i = notes.length - 1; i >= 0; i--) {
      if(selectedNotes.includes(notes[i])) {
        notes.splice(i, 1);
      }
    }
    setSelectedNotes([...notes]);
  }

  useEffect(() => draw());

  return (
    <div className="display">
      <div className="display-canvas">
        <canvas ref={canvas} width={WIDTH} height={HEIGHT} tabIndex="0"
                onClick={clickHandler} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}></canvas>
        <button onClick={clear}>Clear</button>
      </div>
      {(selectedNotes.length > 0) && <NoteSettings notes={selectedNotes} draw={draw} deleteNotes={deleteNotes}></NoteSettings>}
    </div>
  );
}

export default Display;
