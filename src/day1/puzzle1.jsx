import { useEffect, useState } from 'react';
import input from '../assets/puzzle1input.txt'

export function Puzzle1() {
  const [ text, setText ] = useState('');

  useEffect(() => {
    fetch(input)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setText(text);
      });
  }, []);

  function analyzeInput() {
    // split input to isolate each line
    const lines = text.trim().split('\r\n');
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
        return response.text();
      })
      .then((text) => {
        setText(text);
      });
  }, []);

  function analyzeInput2() {
    const lines = text.trim().split('\r\n');
    let position = 50;
    let count = 0;
    console.log('lines to process:', lines);
    for (const line of lines) {
      const direction = line[0];
      const steps = parseInt(line.slice(1));
      
      if (direction === 'L') {
        // Moving left (decreasing position)
        // Count how many times we pass through or land on 0
        // We cross 0 for every complete loop of 100 positions
        const fullLoops = Math.floor(steps / 100);
        count += fullLoops;
        
        // Check if we cross 0 in the remaining movement
        const remainingSteps = steps % 100;
        // We cross 0 if remaining steps >= current position, UNLESS we're already at 0
        // (at 0 moving left means moving away from 0, not crossing it)
        if (remainingSteps >= position && position !== 0) {
          count += 1;
        }
        
        // Update position
        position = ((position - steps) % 100 + 100) % 100;
      } else if (direction === 'R') {
        // Moving right (increasing position)
        // Count how many times we pass through or land on 0
        // We cross 0 for every complete loop of 100 positions
        const fullLoops = Math.floor(steps / 100);
        count += fullLoops;
        
        // Check if we cross 0 in the remaining movement
        const remainingSteps = steps % 100;
        if (position + remainingSteps >= 100) {
          count += 1;
        }
        
        // Update position
        position = (position + steps) % 100;
      }
    }
    return count;
  };

  return (
    <div>
      <h2>Puzzle 2 Result</h2>
      <p>The number of times 0 was passed is: {analyzeInput2()}</p>
    </div>
  );
}