import React, { useState } from 'react';
import { insertQuestion } from '../lib/supabase';

export default function QuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insertQuestion(questionText, difficultyLevel, correctAnswer);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <label htmlFor="questionText" className="font-semibold text-gray-700 mb-1">Question Text</label>
        <input
          type="text"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2"
          placeholder="Enter the question text"
          required
        />
      </div>
      <div>
        <label htmlFor="difficultyLevel" className="font-semibold text-gray-700 mb-1">Difficulty Level</label>
        <input
          type="number"
          id="difficultyLevel"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
          className="border-2 border-gray-300 rounded-lg p-2"
          min="1"
          max="10"
          required
        />
      </div>
      <div>
        <label htmlFor="correctAnswer" className="font-semibold text-gray-700 mb-1">Correct Answer (true/false)</label>
        <select
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value === 'true')}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Question
      </button>
    </form>
  );
}
