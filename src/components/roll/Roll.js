import React from 'react';
import Display from './Display.js';
import Generator from './Generator.js';

function Roll() {
  const rects = [];

  return (
    <div>
      <Display rects={rects}></Display>
      <Generator rects={rects}></Generator>
    </div>
  );
}

export default Roll;
