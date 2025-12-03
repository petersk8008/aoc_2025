import { useEffect, useState } from 'react';
import input from '../assets/day3input.txt'

export function Puzzle3() {
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

  useEffect(() => {
    if (text) {
      analyzeInput();
    }
  }, [text]);

  function analyzeInput() {
  };

  return (
    <div>
      <h2>Puzzle 3 Result</h2>
    </div>
  );
}

export function Puzzle4() {
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
    
  };

  return (
    <div>
      <h2>Puzzle 4 Result</h2>
    </div>
  );
}