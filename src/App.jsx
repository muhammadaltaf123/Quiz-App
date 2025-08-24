import React, { useState } from 'react';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const startQuiz = () => setStarted(true);

  const handleFinish = (sc, tot) => {
    setScore(sc);
    setTotal(tot);
    setFinished(true);
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setScore(0);
    setTotal(0);
  };

  return (
    <div className="app-container">
      <h1>🧠 Quiz App</h1>
      {!started && <button className="start-btn" onClick={startQuiz}>Start Quiz</button>}
      {started && !finished && <Quiz onFinish={handleFinish} />}
      {finished && <Result score={score} total={total} onRestart={restart} />}
    </div>
  );
}

export default App;
