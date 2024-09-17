import React, { useState, useEffect } from 'react';
import { fetchQuestionsBySetId, addQuestionToSet, fetchCandidates, assignQuestionSet } from '../lib/supabase'; // Add fetchCandidates and assignQuestionSet
import Question from './Question';

export default function QuestionSets({ id, name }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(true);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]); // Store candidate list
  const [selectedCandidate, setSelectedCandidate] = useState(''); // Store selected candidate's email

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchQuestionsBySetId(id);
      setQuestions(data);
      setLoading(false);
    };

    const fetchCandidateList = async () => {
      const data = await fetchCandidates(); // Fetch candidates from the users table
      setCandidates(data);
    };

    fetchQuestions();
    fetchCandidateList();
  }, [id]);

  const handleAddQuestion = async () => {
    if (questions.length < 20) {
      await addQuestionToSet({
        question_text: newQuestion,
        difficulty: difficulty,
        correct_answer: correctAnswer,
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

  const handleAssignment = async () => {
    if (selectedCandidate) {
      await assignQuestionSet({
        assignee_id: selectedCandidate, // User ID of the selected candidate
        question_set: id, // Assign the current question set
      });
      alert(`Question set successfully assigned!`);
    } else {
      alert("Please select a candidate to assign the question set.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold'>{name}</h1>
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
            placeholder="Difficulty level (1-20)"
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            min="1"
            max="20"
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

      {questions.length === 20 && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Assign Question Set</h2>
          <select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            className="border p-2">
            <option value="">Select Candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.email} 
              </option>
            ))}
          </select>
          <button onClick={handleAssignment} className="ml-2 p-2 bg-green-500 text-white">
            Assign Question Set
          </button>
        </div>
      )}
    </div>
  );
}
