import { SAMPLES } from '../constants.js';

function numberToBytes(num, numberOfBytes) {
  const bytes = new Array(numberOfBytes).fill(0);
  for(let i = 0; i < numberOfBytes; i++) {
      const byte = (num >> (8*i)) & 0xFF;
      bytes[i] = byte;
  }
  bytes.reverse();
  return bytes;
}

function stringToBytes(str) {
  return str.split('').map(c => c.charCodeAt(0));
}

function pushBigEndian(arr, content) {
  for(const val of content) {
      arr.push(val);
  }
}

function pushLittleEndian(arr, content) {
  for(let i = content.length - 1; i >= 0; i--) {
      arr.push(content[i]);
  }
}

function pushWaveData(arr, waveData) {
  for(const val of waveData) {
      pushLittleEndian(arr, numberToBytes(val, 2));
  }
}

function pushHeaders(arr, size) {
  pushBigEndian(arr, stringToBytes("RIFF"));
  pushLittleEndian(arr, numberToBytes(36 + size, 4));
  pushBigEndian(arr, stringToBytes("WAVE"));
  pushBigEndian(arr, stringToBytes("fmt "));
  pushLittleEndian(arr, numberToBytes(16, 4));
  pushLittleEndian(arr, numberToBytes(1, 2));
  pushLittleEndian(arr, numberToBytes(2, 2));
  pushLittleEndian(arr, numberToBytes(SAMPLES, 4));
  pushLittleEndian(arr, numberToBytes(SAMPLES * 4, 4));
  pushLittleEndian(arr, numberToBytes(4, 2));
  pushLittleEndian(arr, numberToBytes(16, 2));
  pushBigEndian(arr, stringToBytes("data"));
  pushLittleEndian(arr, numberToBytes(size, 4));
}

function getWAV(waveData, size) {
  const arr = [];

  pushHeaders(arr, size);
  pushWaveData(arr, waveData);
    
  const byteArray = new Uint8Array(arr);
  const blob = new Blob([byteArray], { type: 'application/octet-stream' });

  return window.URL.createObjectURL(blob);
}

export default getWAV;