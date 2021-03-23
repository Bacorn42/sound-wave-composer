import React, { useState, useRef, useEffect } from 'react';
import NoteSettings from './NoteSettings.js';
import { toneNames } from '../../tones.js';
import { PX_TO_BEAT, PX_TO_TONE } from '../../constants.js';
import noteColors from '../../noteColors.js';

const TONES = toneNames.length;
const BEATS = 5;
const HEIGHT = TONES * PX_TO_TONE;
const WIDTH = BEATS * PX_TO_BEAT;
const CANVAS_WIDTH = WIDTH;
const CANVAS_HEIGHT = HEIGHT + 16;

const getBeatsNum = (notes) => {
  return notes.reduce((maxBeat, note) => Math.max(maxBeat, note.getBeatEnd()), 0);
}

const getScrollLength = (notes) => {
  return Math.min(WIDTH/((getBeatsNum(notes) + 2) * PX_TO_BEAT), 1) * WIDTH;
}

const getScrollRange = (notes) => {
  return WIDTH - getScrollLength(notes);
}

function Canvas({ notes, setNotes, beatDivision, makeNewNote }) {
  const canvas = useRef(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [ctrlDown, setCtrlDown] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const getBeatStart = () => {
    const scrollRange = getScrollRange(notes);
    if(scrollRange === 0) {
      return 0;
    }
    const scrollProportion = scrollOffset/scrollRange;
    return (getBeatsNum(notes) - 3) * scrollProportion;
  }

  const draw = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid(ctx);
    drawNotes(ctx);
    drawToneNames(ctx);
    drawScrollbar(ctx);
  }

  const drawGrid = (ctx) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';
    drawGridHorizontal(ctx);
    drawGridVertical(ctx);
  }

  const drawGridHorizontal = (ctx) => {
    for(let i = 1; i <= TONES; i++) {
      const y = PX_TO_TONE * i + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }
  }

  const drawGridVertical = (ctx) => {
    const beatStart = getBeatStart();
    const lines = (BEATS + 1) * beatDivision;
    for(let i = 1; i <= lines; i++) {
      const offset = (beatStart % 1) * beatDivision;
      const beatDivisionWidth = PX_TO_BEAT/beatDivision;
      const x = Math.floor(beatDivisionWidth * (i - offset)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
      ctx.stroke();
    }
  }

  const drawNotes = (ctx) => {
    const beatStart = getBeatStart();
    const beatEnd = beatStart + BEATS;

    for(const note of notes) {
      if(note.inView(beatStart, beatEnd)) {
        const noteX = (note.getOffset() - beatStart) * PX_TO_BEAT;
        const noteY = note.getY();
        ctx.fillStyle = noteColors[note.func];
        ctx.fillRect(noteX + 2, noteY + 2, note.width - 3, note.height - 3);
        ctx.strokeStyle = (selectedNotes.includes(note)) ? '#900' : '#666';
        ctx.lineWidth = 2;
        ctx.strokeRect(noteX + 2.5, noteY + 2.5, note.width - 4, note.height - 4);
      }
    }
  }

  const drawToneNames = (ctx) => {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#000';
    for(let i = 0; i < TONES; i++) {
      ctx.fillText(toneNames[i], 0, PX_TO_TONE * (i + 1) - 4);
    }
  }

  const drawScrollbar = (ctx) => {
    const scrollLength = getScrollLength(notes);
    ctx.fillStyle = '#999';
    ctx.fillRect(scrollOffset, HEIGHT, scrollLength, 16);
  }

  const clickHandler = (e) => {
    const coords = getMouseCoords(e);
    if(coords.y >= HEIGHT) {
      return;
    }
    const beatStart = getBeatStart();
    const pxStart = beatStart * PX_TO_BEAT;
    for(const note of notes) {
      if(note.inRect(coords.x + pxStart, coords.y)) {
        selectNote(note);
        draw();
        return;
      }
    }
    const beatDivisionWidth = PX_TO_BEAT/beatDivision;
    const snapX = Math.floor((coords.x + pxStart)/beatDivisionWidth) * beatDivisionWidth;
    const snapY = Math.floor(coords.y/PX_TO_TONE) * PX_TO_TONE;
    const scrollProportion = scrollOffset/getScrollLength(notes);
    
    const newNote = makeNewNote(snapX, snapY);
    setSelectedNotes([]);
    setScrollOffset(scrollProportion * getScrollLength([...notes, newNote]));
    draw();
  }

  const selectNote = (note) => {
    if(ctrlDown) {
      setSelectedNotes([...selectedNotes, note]);
    }
    else {
      setSelectedNotes([note]);
    }
  }

  const mouseDownHandler = (e) => {
    const coords = getMouseCoords(e);
    if(coords.y >= HEIGHT) {
      setScrolling(true);
    }
  }

  const mouseMoveHandler = (e) => {
    if(scrolling) {
      let newOffset = scrollOffset + e.movementX;
      newOffset = Math.max(newOffset, 0);
      newOffset = Math.min(newOffset, getScrollRange(notes));
      setScrollOffset(newOffset);
    }
  }

  const mouseUpHandler = (e) => {
    setScrolling(false);
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

  const deleteNotes = () => {
    const newNotes = notes.filter(note => !selectedNotes.includes(note))
    setNotes([...newNotes]);
    setSelectedNotes([]);
    setScrollOffset(Math.min(scrollOffset, getScrollRange(newNotes)));
  }

  const clear = () => {
    setNotes([]);
    setSelectedNotes([]);
    setScrollOffset(0);
    draw();
  }

  useEffect(() => draw());

  return (
    <div>
      <canvas ref={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} tabIndex="0"
        onClick={clickHandler} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}
        onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}>
      </canvas>
      <button onClick={clear}>Clear</button>
      {(selectedNotes.length > 0) && <NoteSettings notes={selectedNotes} draw={draw} deleteNotes={deleteNotes}></NoteSettings>}
    </div>
  );
}

export default Canvas
