import React, { useEffect, useState } from 'react';

function Quiz({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions?limit=20')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((q, i) => ({
          id: i + 1,
          question: q.question.text,
          options: shuffle([q.correctAnswer, ...q.incorrectAnswers]),
          answer: q.correctAnswer
        }));
        setQuestions(formatted);
      });
  }, []);

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onFinish(score + (selected === questions[current].answer ? 1 : 0), questions.length);
    }
  };

  if (!questions.length) return <p>Loading...</p>;

  const q = questions[current];

  return (
    <div className="quiz">
      <h3>Question {current + 1} of {questions.length}</h3>
      <h2>{q.question}</h2>

      <div className="options-grid">
        {q.options.map((opt, idx) => (
          <label
            key={opt}
            className={`option ${selected === opt ? 'selected' : ''}`}
            data-number={idx + 1}
            onClick={() => setSelected(opt)}
          >
            <input
              type="radio"
              name={`q-${q.id}`}
              value={opt}
              checked={selected === opt}
              readOnly
            />
            {opt}
          </label>
        ))}
      </div>

      <button className="submit-btn" onClick={handleNext} disabled={!selected}>
        {current + 1 === questions.length ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Quiz;
