import React from 'react';

function Result({ score, total, onRestart }) {
    const passed = score >= total / 2;
    const msg = passed ? "🎉 You Passed!" : "❌ You Failed!";
    const imgUrl = passed
        ? "Pass-image.jpeg"
        : "Fail-image.jpeg";

    return (
        <div className="result">
            <h2>{msg}</h2>
            <p>You scored {score} out of {total}</p>
            <img src={imgUrl} alt={msg} className="result-img" />
            <button className="restart-btn" onClick={onRestart}>Try Again</button>
        </div>
    );
}

export default Result;
