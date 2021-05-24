import React from 'react';
import PatchContainer from './PatchContainer.js';
import './Synth.css';

function Synth({ patches, setPatch, newPatch }) {
  return (
    <div className="synth">
      <PatchContainer patches={patches} setPatch={setPatch} newPatch={newPatch}></PatchContainer>
    </div>
  );
}

export default Synth;
