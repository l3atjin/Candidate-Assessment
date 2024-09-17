// src/components/QuestionSetForm.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function QuestionSetForm() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('id, question_text')
        .order('difficulty_level', { ascending: true });

      if (error) {
        setError('Error fetching questions');
        console.error('Error fetching questions:', error);
      } else {
        setQuestions(data);
      }
      setLoading(false);
    };

    // Fetch existing question set if it exists
    const fetchQuestionSet = async () => {
      const { data, error } = await supabase
        .from('question_sets')
        .select('questions')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching question set:', error);
      } else {
        if (data?.questions) {
          setSelectedQuestions(data.questions);
        }
      }
    };

    fetchQuestions();
    fetchQuestionSet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedQuestions.length > 20) {
      setError('You can only select up to 20 questions.');
      return;
    }

    const { data, error } = await supabase
      .from('question_sets')
      .upsert([
        {
          id: 1, // Assuming there is only one question set
          questions: selectedQuestions,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error creating or updating question set:', error);
      setError('Error creating or updating question set');
    } else {
      console.log('Question set created or updated:', data);
      setSelectedQuestions([]);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedQuestions((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((id) => id !== value)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold mb-4'>Create or Update Question Set</h2>
      <div>
        <p className='font-semibold text-gray-700 mb-2'>Select Questions (Max 20)</p>
        {questions.map((question) => (
          <div key={question.id} className='flex items-center'>
            <input
              type="checkbox"
              id={`question-${question.id}`}
              value={question.id}
              checked={selectedQuestions.includes(question.id)}
              onChange={handleChange}
              className='mr-2'
              disabled={selectedQuestions.length >= 20 && !selectedQuestions.includes(question.id)}
            />
            <label htmlFor={`question-${question.id}`} className='text-gray-700'>
              {question.question_text}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
      >
        Save Question Set
      </button>
    </form>
  );
}
