import React, { useState } from 'react';
import Roll from './components/roll/Roll.js';
import Synth from './components/synth/Synth.js';
import PatchModel from './models/synth/patch.js';
import './App.css';

function App() {
  const [patches, setPatches] = useState([]);

  const setPatch = (patch) => {
    const newPatches = [...patches];
    const currentPatch = newPatches.findIndex(p => p.getId() === patch.getId());
    newPatches[currentPatch] = patch;
    setPatches(newPatches);
  }

  const newPatch = () => {
    setPatches([...patches, new PatchModel()]);
  }

  return (
    <div className="app">
      <Synth patches={patches} setPatch={setPatch} newPatch={newPatch}></Synth>
      <Roll patches={patches}></Roll>
    </div>
  );
}

export default App;
