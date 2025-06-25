import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Cube from './Cube';

function getCubeSvg(colorString) {
  return <pre style={{fontSize: '1.2em'}}>{colorString}</pre>;
}

function App() {
  const [cube, setCube] = useState(new Cube());
  const [_, setRerender] = useState(false);
  const [scrambleMoves, setScrambleMoves] = useState([]);
  const [solution, setSolution] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);

  const doMove = (move) => {
    cube.move(move);
    setCube(cube);
    setRerender(r => !r);
    setSolution([]);
    setStepIdx(-1);
  };

  const scramble = () => {
    const moves = ['U', "U'", 'D', "D'", 'F', "F'", 'B', "B'", 'L', "L'", 'R', "R'"];
    let scrambleSeq = [];
    for (let i = 0; i < 20; i++) {
      const m = moves[Math.floor(Math.random() * moves.length)];
      cube.move(m);
      scrambleSeq.push(m);
    }
    setCube(cube);
    setRerender(r => !r);
    setScrambleMoves(scrambleSeq);
    setSolution([]);
    setStepIdx(-1);
  };

  const reset = () => {
    setCube(new Cube());
    setRerender(r => !r);
    setScrambleMoves([]);
    setSolution([]);
    setStepIdx(-1);
  };

  const solve = () => {
    if (!scrambleMoves.length) return;
    const invert = m => m.endsWith("'") ? m[0] : m + "'";
    const solutionMoves = scrambleMoves.slice().reverse().map(invert);
    const tempCube = new Cube();
    scrambleMoves.forEach(m => tempCube.move(m));
    let steps = [{ move: 'Start', state: tempCube.getColorString() }];
    solutionMoves.forEach(move => {
      tempCube.move(move);
      steps.push({ move, state: tempCube.getColorString() });
    });
    setSolution(steps);
    setStepIdx(0);
  };

  const nextStep = () => {
    if (solution.length && stepIdx < solution.length - 1) setStepIdx(stepIdx + 1);
  };
  const prevStep = () => {
    if (solution.length && stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  return (
    <div className="page-container">
      <div style={{maxWidth: 700, margin: '0 auto', paddingTop: 32}}>
        <h1>Rubik's Cube Solver Assignment</h1>
        <p className="instructions">
          This application demonstrates an object-oriented Rubik's Cube representation, manual rotation, scrambling, and a basic solving algorithm. Use the controls below to interact with the cube and view the solution steps.
        </p>
        <div className="card">
          <div style={{marginBottom: 24}}>
            {solution.length && stepIdx >= 0
              ? getCubeSvg(solution[stepIdx].state)
              : getCubeSvg(cube.getColorString())}
          </div>
          <div className="move-btn-group">
            {[['U', "U'"], ['D', "D'"], ['F', "F'"], ['B', "B'"], ['L', "L'"], ['R', "R'"]].map(([cw, ccw]) => (
              <span key={cw}>
                <button className="button" onClick={() => doMove(cw)}>{cw}</button>
                <button className="button" onClick={() => doMove(ccw)}>{ccw}</button>
              </span>
            ))}
          </div>
          <div style={{margin: '24px 0 8px 0'}}>
            <button className="button" onClick={scramble}>
              Scramble
            </button>
            <button className="button" onClick={reset}>
              Reset
            </button>
            <button className="button" onClick={solve} disabled={!scrambleMoves.length}>
              Solve
            </button>
          </div>
          {solution.length > 0 && (
            <div style={{marginTop: 32, background: '#f8fafc', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)'}}>
              <h2>Solution Steps</h2>
              <div className="step-nav">
                <button className="button" onClick={prevStep} disabled={stepIdx <= 0}>Prev</button>
                <span style={{fontSize: 16, fontWeight: 500}}>
                  Step {stepIdx} / {solution.length - 1}: <span style={{color: '#1976d2'}}>{solution[stepIdx]?.move}</span>
                </span>
                <button className="button" onClick={nextStep} disabled={stepIdx >= solution.length - 1}>Next</button>
              </div>
              <ol className="solution-steps">
                {solution.map((s, i) => (
                  <li key={i} className={i === stepIdx ? 'active' : ''}>
                    {s.move}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
