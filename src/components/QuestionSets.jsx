import React, { useState, useEffect } from 'react';
import { fetchQuestionsBySetId, addQuestionToSet } from '../lib/supabase';
import Question from './Question';

export default function QuestionSets({ id, name }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchQuestionsBySetId(id);
      setQuestions(data);
      setLoading(false);
    };

    fetchQuestions();
  }, [id]);

  const handleAddQuestion = async () => {
    if (questions.length < 20) {
      await addQuestionToSet({
        question_text: newQuestion,
        difficulty: difficulty,
        correct_answer: correctAnswer, // Save the correct answer
        question_set: id, // Associate with the current set
      });
      setNewQuestion("");
      setDifficulty(1);
      setCorrectAnswer(true); // Reset correct answer to default
      const updatedQuestions = await fetchQuestionsBySetId(id);
      setQuestions(updatedQuestions);
    } else {
      alert("This question set already has 20 questions.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{name}</h1>
      {questions.length > 0 ? questions.map((question) => (
        <Question
          key={question.id}
          question_text={question.question_text}
          difficulty={question.difficulty}
          correct_answer={question.correct_answer}
        />
      )) : <p className='text-red-500'>{"No questions found. Please add some."}</p> }

      {/* Form to add a new question */}
      {questions.length < 20 && (
        <div className='mt-4'>
          <input
            type="text"
            placeholder="Enter question text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Difficulty level (1-10)"
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            min="1"
            max="10"
            className="border p-2 ml-2"
          />
          <div className="mt-2">
            <label className="mr-2">Correct Answer:</label>
            <label>
              <input
                type="radio"
                value={true}
                checked={correctAnswer === true}
                onChange={() => setCorrectAnswer(true)}
              />
              True
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value={false}
                checked={correctAnswer === false}
                onChange={() => setCorrectAnswer(false)}
              />
              False
            </label>
          </div>
          <button onClick={handleAddQuestion} className="ml-2 p-2 bg-blue-500 text-white">Add Question</button>
        </div>
      )}
    </div>
  );
}
