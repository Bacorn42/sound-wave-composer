import React, { useState } from 'react';
import Patch from './Patch.js';
import './PatchContainer.css';

function PatchContainer({ patches, setPatch, newPatch }) {
  const [currentPatch, setCurrentPatch] = useState(-1);

  const createNewPatch = () => {
    setCurrentPatch(patches.length);
    newPatch();
  }

  const handlePatchSelect = (e) => {
    const val = Number(e.target.value);
    setCurrentPatch(val);
  }

  const getPatch = () => {
    if(currentPatch >= 0) {
      const patch = patches[currentPatch];
      return (
        <Patch patch={patch} setPatch={setPatch} patchId={patch.getId()}></Patch>
      );
    }
  }

  return (
    <div className="synth-patch-container">
      <div className="synth-patch-container-selector">
        <select onChange={handlePatchSelect} value={currentPatch}>
          {patches.map((patch, index) => <option value={index} key={index}>{patch.name}</option>)}
        </select>
        <button onClick={createNewPatch}>+</button>
      </div>
      <div className="synth-patch-container-editor">
        {getPatch()}
      </div>
    </div>
  );
}

export default PatchContainer;
