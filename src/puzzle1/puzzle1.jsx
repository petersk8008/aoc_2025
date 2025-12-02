import { useEffect, useState } from 'react';
import input from '../assets/puzzle1input.txt'

export function Puzzle1() {
  const [ text, setText ] = useState('');

  useEffect(() => {
    fetch(input)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((text) => {
        console.log(text);
        setText(text);
      });
  }, []);

  function analyzeInput() {
    // split input to isolate each line
    const lines = text.trim().split('\n');
    let position = 50;
    let count = 0;
    
    for (const line of lines) {
      const direction = line[0];
      const steps = parseInt(line.slice(1));
      
      if (direction === 'L') {
        position = (position - steps) % 100;
        if (position < 0) position += 100;
      } else if (direction === 'R') {
        position = (position + steps) % 100;
      }
      
      if (position === 0) {
        count++;
      }
    }
    console.log(count);
    return count;
  };

  return (
    <div>
      <h2>Puzzle 1 Result</h2>
      <p>The number of times the position returned to 0 is: {analyzeInput()}</p>
    </div>
  );
}

export function Puzzle2() {
  const [ text, setText ] = useState('');

  useEffect(() => {
    fetch(input)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((text) => {
        console.log(text);
        setText(text);
      });
  }, []);

  function analyzeInput() {
    const lines = text.trim().split('\n');
    let position = 50;
    let count = 0;
    
    for (const line of lines) {
      const direction = line[0];
      const steps = parseInt(line.slice(1));
      
      if (direction === 'L') {
        // Count how many times we pass through 0 going left
        const newPosition = position - steps;
        // Count boundaries: every time we cross a multiple of 100
        const startBoundary = Math.floor(position / 100);
        const endBoundary = Math.floor(newPosition / 100);
        const crossings = startBoundary - endBoundary;
        count += crossings;
        console.log(`Moving L ${steps} from ${position} to ${newPosition}, crossings: ${crossings}, total count: ${count}`);
        position = ((newPosition % 100) + 100) % 100;
      } else if (direction === 'R') {
        // Count how many times we pass through 0 going right
        const newPosition = position + steps;
        // Count boundaries: every time we cross a multiple of 100
        const startBoundary = Math.floor(position / 100);
        const endBoundary = Math.floor(newPosition / 100);
        const crossings = endBoundary - startBoundary;
        count += crossings;
        console.log(`Moving R ${steps} from ${position} to ${newPosition}, crossings: ${crossings}, total count: ${count}`);

        position = newPosition % 100;
      }
    }

    return count;
  };

  return (
    <div>
      <h2>Puzzle 2 Result</h2>
      <p>The number of times 0 was passed is: {analyzeInput()}</p>
    </div>
  );
}