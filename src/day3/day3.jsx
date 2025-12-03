import { useEffect, useState } from 'react';
import input from '../assets/day3input.txt'

const MAX_BATTERY_CAPACITY = 9;
const MIN_BATTERY_CAPACITY = 1;

export function Puzzle5() {
  const [ text, setText ] = useState('');
  const [ total, setTotal ] = useState(0);

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
      analyzeInput();
    }
  }, [text]);

  function analyzeInput() {
    // in each line, find the highest 2 digit number made by 2 digits. The second digit must appear after the first digit in the line.
    const lines = text.trim().split('\r\n');
    let total = 0;
    for (const line of lines) {
      let maxNumber = -1;
      for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
          const num = parseInt(line[i] + line[j]);
          if (num > maxNumber) {
            maxNumber = num;
          }
        }
      }
      total += maxNumber;
    }
    setTotal(total);
  };

  return (
    <div>
      <h2>Puzzle 5 Result</h2>
      <p>The total of the highest 2-digit numbers from each line is: {total}</p>
    </div>
  );
}

export function Puzzle6() {
  const [ text, setText ] = useState('');
  const [ total, setTotal ] = useState(0);

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
    // in each line, find the highest 12 digit number made by 12 numbers in the line. Each number must appear after the previous digit in the line. The first digit can be at any position so long as the subsequent digits follow it and there are 12 digits in total.
    const lines = text.trim().split('\r\n');
    let total = 0;
    
    for (const line of lines) {
      // Extract only digits from the line
      const digits = line.split('').filter(c => c >= '0' && c <= '9');
      
      if (digits.length < 12) {
        continue; // Skip lines with fewer than 12 digits
      }
      
      // Greedy approach: build the maximum number by choosing the best digit at each position
      let result = [];
      let startIndex = 0;
      
      for (let pos = 0; pos < 12; pos++) {
        // How many digits do we still need after this one?
        const digitsNeeded = 12 - pos - 1;
        // How far can we search? (must leave enough digits for remaining positions)
        const searchLimit = digits.length - digitsNeeded;
        
        // Find the maximum digit in the valid range
        let maxDigit = '0';
        let maxIndex = startIndex;
        
        for (let i = startIndex; i < searchLimit; i++) {
          if (digits[i] > maxDigit) {
            maxDigit = digits[i];
            maxIndex = i;
          }
        }
        
        result.push(maxDigit);
        startIndex = maxIndex + 1;
      }
      
      const maxNumber = result.join('');
      total += parseInt(maxNumber);
      console.log('Line max 12-digit number:', maxNumber);
    }
    
    console.log('Total:', total);
    setTotal(total);
  };

  return (
    <div>
      <h2>Puzzle 6 Result</h2>
      <p>The total of the highest 12-digit numbers from each line is: {total}</p>
    </div>
  );
}