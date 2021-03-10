import React from 'react';
import Display from './Display.js';
import Generator from './Generator.js';

function Roll() {
  const notes = [];

  return (
    <div>
      <Display notes={notes}></Display>
      <Generator notes={notes}></Generator>
    </div>
  );
}

export default Roll;
