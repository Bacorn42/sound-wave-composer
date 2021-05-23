import React, { useState } from 'react';
import Patch from './Patch.js';
import PatchModel from '../../models/synth/patch.js';
import './PatchContainer.css';

function PatchContainer() {
  const [patches, setPatches] = useState([]);
  const [currentPatch, setCurrentPatch] = useState(-1);

  const newPatch = () => {
    setCurrentPatch(patches.length);
    setPatches([...patches, new PatchModel()]);
  }

  const handlePatchSelect = (e) => {
    const val = Number(e.target.value);
    setCurrentPatch(val);
  }

  const setPatch = (patch) => {
    const newPatches = [...patches];
    newPatches[currentPatch] = patch;
    setPatches(newPatches);
  }

  const getPatch = () => {
    if(currentPatch >= 0) {
      const patch = patches[currentPatch];
      const patchId = patch.name + currentPatch;
      return (
        <Patch patch={patches[currentPatch]} setPatch={setPatch} patchId={patchId}></Patch>
      );
    }
  }

  return (
    <div className="synth-patch-container">
      <div className="synth-patch-container-selector">
        <select onChange={handlePatchSelect} value={currentPatch}>
          {patches.map((patch, index) => <option value={index} key={index}>{patch.name}</option>)}
        </select>
        <button onClick={newPatch}>+</button>
      </div>
      <div className="synth-patch-container-editor">
        {getPatch()}
      </div>
    </div>
  );
}

export default PatchContainer;
