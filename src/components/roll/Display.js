import React, { useState } from 'react';
import './Display.css';
import Canvas from './Canvas.js';
import DisplaySettings from './DisplaySettings.js';
import Note from '../../Note.js';

function Display({ notes, setNotes, setTempo }) {
  const [newNoteLength, setNewNoteLength] = useState(1);
  const [beatDivision, setBeatDivision] = useState(4);
  const [waveFunction, setWaveFunction] = useState('sine');
  
  const makeNewNote = (x, y) => {
    const newNote = new Note(x, y, Number(newNoteLength), waveFunction);
    const newNotes = [...notes, newNote];
    setNotes([...newNotes]);
    return newNote;
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

  return (
    <div className="display">
      <DisplaySettings setNewNoteLength={newNoteLengthHandler} setBeatDivision={beatDivisionHandler}
                       setTempo={tempoHandler} setWaveFunction={waveFunctionHandler}></DisplaySettings>
      <Canvas notes={notes} setNotes={setNotes} beatDivision={beatDivision} makeNewNote={makeNewNote}></Canvas>
    </div>
  );
}

export default Display;
