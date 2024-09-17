import React from 'react';

export default function Question({ question_text, difficulty, correct_answer }) {
  return (
    <div className="flex justify-between items-center border-b p-2">
      <span className="font-medium">{question_text}</span>
      <span className="text-gray-600">Difficulty: {difficulty}</span>
      <span className='text-sm'>
        Correct Answer: {correct_answer ? 'True' : 'False'}
      </span>
    </div>
  );
}
