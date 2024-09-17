import React, { useEffect, useState } from 'react';
import { fetchQuestionsBySetId, saveResponse } from '../lib/supabase'; // Add saveResponse function to your lib

export default function AssignmentQuestions({ questionSetId, candidateId }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchQuestionsBySetId(questionSetId);
      data.sort((a, b) => a.difficulty - b.difficulty);
      setQuestions(data);
      
      const middleIndex = Math.floor(data.length / 2);
      setCurrentQuestionIndex(middleIndex);
    };

    fetchQuestions();
  }, [questionSetId]);

  const handleAnswer = async (answer) => {
    if (currentQuestionIndex === null || questions.length === 0) return;

    const correct = questions[currentQuestionIndex].correct_answer;
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestionIndex);

    const isCorrect = answer === correct;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. Try an easier question.');

    // Save the response to the database
    await saveResponse({
      question_id: questions[currentQuestionIndex].id,
      answer: answer,
      is_correct: isCorrect,
    });

    if (isCorrect) {
      // Move to the next unanswered and more difficult question
      let nextIndex = currentQuestionIndex + 1;
      while (nextIndex < questions.length && newAnsweredQuestions.has(nextIndex)) {
        nextIndex++;
      }
      setCurrentQuestionIndex(nextIndex < questions.length ? nextIndex : null);
    } else {
      // Move to the previous unanswered and less difficult question
      let prevIndex = currentQuestionIndex - 1;
      while (prevIndex >= 0 && newAnsweredQuestions.has(prevIndex)) {
        prevIndex--;
      }
      setCurrentQuestionIndex(prevIndex >= 0 ? prevIndex : null);
    }

    setAnsweredQuestions(newAnsweredQuestions);
  };

  if (questions.length === 0) return <p className="text-gray-500 text-center">Loading...</p>;

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {currentQuestionIndex !== null ? (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Question</h2>
          <p className="text-lg mb-4">{questions[currentQuestionIndex].question_text}</p>
          <p className="text-sm text-gray-600 mb-4">Difficulty: {questions[currentQuestionIndex].difficulty}</p>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleAnswer(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              True
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              False
            </button>
          </div>
          <p className={`text-lg ${feedback.includes('Incorrect') ? 'text-red-500' : 'text-green-500'}`}>{feedback}</p>
        </div>
      ) : (
        <p className="text-lg text-center text-green-500">You finished the assignment!</p>
      )}
    </div>
  );
}
