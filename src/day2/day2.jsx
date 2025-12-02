import { useEffect, useState } from 'react';
import input from '../assets/day2input.txt'

export function Puzzle3() {
  const [ text, setText ] = useState('');
  const [ invalidValues, setInvalidValues ] = useState([]);

  useEffect(() => {
    fetch(input)
      .then((response) => {
        console.log('Fetching input from:', input);
        return response.text();
      })
      .then((text) => {
        console.log('Received text:', text);
        setText(text);
      });
  }, []);

  useEffect(() => {
    if (text) {
      analyzeInput();
    }
  }, [text]);

  function analyzeInput() {
    // split input to isolate each line
    const lines = text.trim().split('\r\n');
    console.log('lines to process:', lines);
    let invalids = [];
    for (const line of lines) {
      console.log('Processing line:', line);
      const [rangeStart, rangeEnd] = line.split('-').map(Number);
      const invalidsInRange = getInvalidValuesFromRange(rangeStart, rangeEnd);
      invalids = invalids.concat(invalidsInRange);
    }
    setInvalidValues(invalids);
  };

  function getInvalidValuesFromRange(rangeStart, rangeEnd) {
    // Generate all values in the range
    let rangeValues = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      rangeValues.push(i);
    }
    // For values in the range, if the number has an even number of characters, and the first half matches the second half, it's valid
    let invalids = [];
    for (const value of rangeValues) {
      console.log('Checking value:', value);
      const strValue = value.toString();
      if (strValue.length % 2 === 0) {
        const half = strValue.length / 2;
        const firstHalf = strValue.slice(0, half);
        const secondHalf = strValue.slice(half);
        if (firstHalf === secondHalf) {
          invalids.push(value);
        }
      }
    }
    return invalids;
  };

  return (
    <div>
      <h2>Puzzle 3 Result</h2>
      <p>The invalid values added together are: {invalidValues.reduce((a, b) => a + b, 0)}</p>
    </div>
  );
}

export function Puzzle4() {
  const [ text, setText ] = useState('');
  const [ invalidValues, setInvalidValues ] = useState([]);

  useEffect(() => {
    fetch(input)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setText(text);
      });
  }, []);

    useEffect(() => {
    if (text) {
      analyzeInput2();
    }
  }, [text]);

    function analyzeInput2() {
    // split input to isolate each line
    const lines = text.trim().split('\r\n');
    console.log('lines to process:', lines);
    let invalids = [];
    for (const line of lines) {
      console.log('Processing line:', line);
      const [rangeStart, rangeEnd] = line.split('-').map(Number);
      const invalidsInRange = getInvalidValuesFromRange(rangeStart, rangeEnd);
      invalids = invalids.concat(invalidsInRange);
    }
    setInvalidValues(invalids);
  };

  function getInvalidValuesFromRange(rangeStart, rangeEnd) {
    // Generate all values in the range
    let rangeValues = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      rangeValues.push(i);
    }
    // For values in the range, check if the number is made up of repeating digits
    let invalids = [];
    for (const value of rangeValues) {
      console.log('Checking value:', value);
      const strValue = value.toString();
      // Check if the string is made up of repeating digits
      // Try pattern lengths from 1 to half the string length
      let isRepeating = false;
      for (let patternLen = 1; patternLen <= strValue.length / 2; patternLen++) {
        if (strValue.length % patternLen === 0) {
          const pattern = strValue.slice(0, patternLen);
          const repeated = pattern.repeat(strValue.length / patternLen);
          if (repeated === strValue) {
            isRepeating = true;
            break;
          }
        }
      }
      if (isRepeating) {
        invalids.push(value);
      }
    }
    return invalids;
  };

  return (
    <div>
      <h2>Puzzle 4 Result</h2>
      <p>The invalid values added together are: {invalidValues.reduce((a, b) => a + b, 0)}</p>
    </div>
  );
}