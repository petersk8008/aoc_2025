import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Puzzle1, Puzzle2 } from './day1/puzzle1.jsx'
import './App.css'
import { Puzzle3, Puzzle4 } from './day2/day2.jsx'

function App() {
  return (
    <>
      <h1>AoC 2025</h1>
      <div className="card">
        <Puzzle1></Puzzle1>
      </div>
      {/* <div className="card">
        <Puzzle2></Puzzle2>
      </div>
      <div className="card">
        <Puzzle3></Puzzle3>
      </div>
      <div className="card">
        <Puzzle4></Puzzle4>
      </div> */}
    </>
  )
}

export default App
