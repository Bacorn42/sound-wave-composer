import React, { useRef, useEffect, useState } from 'react';
import './Display.css';
import DisplaySettings from './DisplaySettings.js';
import NoteSettings from './NoteSettings.js';
import Note from '../../Note.js';
import noteColors from '../../noteColors.js';
import { toneNames } from '../../tones.js';
import { PX_TO_BEAT, PX_TO_TONE } from '../../constants.js';

const TONES = 12;
const WIDTH_UNITS = 20;
const HEIGHT = TONES * PX_TO_TONE;
const WIDTH = WIDTH_UNITS * 20;
const BEATS = 5;
const CANVAS_WIDTH = WIDTH_UNITS * 20;
const CANVAS_HEIGHT = TONES * PX_TO_TONE + 16;

function Display({ notes, setNotes, setTempo }) {
  const canvas = useRef(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [ctrlDown, setCtrlDown] = useState(false);
  const [newNoteLength, setNewNoteLength] = useState(1);
  const [beatDivision, setBeatDivision] = useState(4);
  const [waveFunction, setWaveFunction] = useState('sine');
  const [scrolling, setScrolling] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const getBeatsNum = (notesArg) => {
    if(notesArg) {
      return notesArg.reduce((beat, note) => Math.max(beat, note.getBeatEnd()), 0);
    }
    return notes.reduce((beat, note) => Math.max(beat, note.getBeatEnd()), 0);
  }

  const getScrollLength = (notesArg) => {
    return Math.min(WIDTH/((getBeatsNum(notesArg) + 2) * PX_TO_BEAT), 1) * WIDTH;
  }

  const getBeatStart = () => {
    const scrollLength = getScrollLength();
    const beatStart = (getBeatsNum() - 3) * (scrollOffset/(WIDTH - scrollLength));
    if(isNaN(beatStart)) {
      return 0;
    }
    return beatStart;
  }

  const draw = () => {
    const ctx = canvas.current.getContext('2d');
    const scrollLength = getScrollLength();
    let beatStart = getBeatStart();
    const beatEnd = beatStart + BEATS;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.font = '16px sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';
    for(let i = 1; i <= TONES; i++) {
      ctx.beginPath();
      ctx.moveTo(0, PX_TO_TONE * i + 0.5);
      ctx.lineTo(WIDTH, PX_TO_TONE * i + 0.5);
      ctx.stroke();
    }
    for(let i = 1; i <= (BEATS + 1) * beatDivision; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.floor(PX_TO_BEAT/beatDivision * (i - (beatStart % 1) * beatDivision)) + 0.5, 0);
      ctx.lineTo(Math.floor(PX_TO_BEAT/beatDivision * (i - (beatStart % 1) * beatDivision)) + 0.5, HEIGHT);
      ctx.stroke();
    }
    for(const note of notes) {
      if(note.inView(beatStart, beatEnd)) {
        ctx.fillStyle = noteColors[note.func];
        ctx.fillRect((note.getOffset() - beatStart) * PX_TO_BEAT + 2, note.getY() + 2, note.width - 3, note.height - 3);
        ctx.strokeStyle = (selectedNotes.includes(note)) ? '#900' : '#666';
        ctx.lineWidth = 2;
        ctx.strokeRect((note.getOffset() - beatStart) * PX_TO_BEAT + 2.5, note.getY() + 2.5, note.width - 4, note.height - 4);
      }
    }
    ctx.fillStyle = '#000';
    for(let i = 0; i < TONES; i++) {
      ctx.fillText(toneNames[i], 0, PX_TO_TONE * (i + 1) - 4);
    }
    
    ctx.fillStyle = '#999';
    ctx.fillRect(scrollOffset, HEIGHT, scrollLength, 16);
  }

  const clickHandler = (e) => {
    const coords = getMouseCoords(e);
    if(coords.y >= HEIGHT) {
      return;
    }
    const beatStart = getBeatStart();
    for(const note of notes) {
      if(note.inRect(coords.x + beatStart * PX_TO_BEAT, coords.y)) {
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
    const snapX = Math.floor((coords.x + beatStart * PX_TO_BEAT)/(PX_TO_BEAT/beatDivision)) * (PX_TO_BEAT/beatDivision);
    const snapY = Math.floor((coords.y)/WIDTH_UNITS) * WIDTH_UNITS;
    const scrollProportion = scrollOffset/getScrollLength();
    
    const newNotes = [...notes, new Note(snapX, snapY, Number(newNoteLength), waveFunction)]
    setNotes([...newNotes]);
    setSelectedNotes([]);
    setScrollOffset(scrollProportion * getScrollLength(newNotes));
    draw();
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
      newOffset = Math.min(newOffset, WIDTH - getScrollLength());
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

  const clear = () => {
    setNotes([]);
    setSelectedNotes([]);
    setScrollOffset(0);
    draw();
  }

  const deleteNotes = () => {
    const newNotes = notes.filter(note => !selectedNotes.includes(note))
    setNotes([...newNotes]);
    setSelectedNotes([]);
    setScrollOffset(Math.min(scrollOffset, WIDTH - getScrollLength(newNotes)));
  }

  const newNoteLengthHandler = (val) => {
    setNewNoteLength(val);
  }

  const beatDivisionHandler = (val) => {
    setBeatDivision(val);
  }

  const tempoHandler = (val) => {
    setTempo(val);
  }

  const waveFunctionHandler = (val) => {
    setWaveFunction(val);
  }

  useEffect(() => draw());

  return (
    <div className="display">
      <DisplaySettings setNewNoteLength={newNoteLengthHandler} setBeatDivision={beatDivisionHandler}
                       setTempo={tempoHandler} setWaveFunction={waveFunctionHandler}></DisplaySettings>
      <div className="display-canvas">
        <canvas ref={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} tabIndex="0"
                onClick={clickHandler} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler}
                onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}></canvas>
        <button onClick={clear}>Clear</button>
      </div>
      {(selectedNotes.length > 0) && <NoteSettings notes={selectedNotes} draw={draw} deleteNotes={deleteNotes}></NoteSettings>}
    </div>
  );
}

export default Display;
