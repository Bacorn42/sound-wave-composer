import { getTone } from './waves/sine/tones.js';
import getWAV from './wav/WAVWriter.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <audio src={getWAV(getTone(440, 1))} controls></audio>
    </div>
  );
}

export default App;
