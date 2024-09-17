import React from 'react';

export default function Question({ question_text, difficulty, correct_answer }) {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <span className="font-medium">{question_text}</span>
      <div className='flex items-center gap-4'>
        <span className="text-gray-600">Difficulty: {difficulty}</span>
        <span className='text-sm font-bold'>
          Correct Answer: {correct_answer ? 'True' : 'False'}
        </span>
      </div>
      
    </div>
  );
}
