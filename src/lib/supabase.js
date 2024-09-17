import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY)

export const insertQuestion = async (questionText, difficultyLevel, correctAnswer) => {
  const { data, error } = await supabase
    .from('questions')
    .insert([
      {
        question_text: questionText,
        difficulty: difficultyLevel,
        correct_answer: correctAnswer,
      },
    ]);
  if (error) {
    console.error('Error inserting question:', error);
  } else {
    console.log('Question added:', data);
  }
};

export const fetchQuestions = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }
  return data;
};

export const fetchQuestionSets = async () => {
  let { data: question_sets, error } = await supabase
    .from('question_sets')
    .select('*');
  if (error) {
    console.error('Error fetching question sets:', error);
    return;
  }
  return question_sets;
}

export const fetchQuestionsBySetId = async (setId) => {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('question_set', setId);

  if (error) {
    console.error(error);
    return [];
  }
  console.log("questions in the question set are", setId, questions);
  return questions;
};

export const addQuestionToSet = async (question) => {
  const { data, error } = await supabase
    .from('questions')
    .insert([question]);

  if (error) {
    console.error(error);
  }
  return data;
};

export const fetchCandidates = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email')
    .eq('role', 'candidate');

  if (error) throw error;
  return data;
};

export const assignQuestionSet = async ({ assignee_id, question_set }) => {
  const { data, error } = await supabase
    .from('assignments')
    .insert([{ assignee_id, question_set_id: question_set }]);

  if (error) throw error;
  return data;
};

export const fetchAssignments = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  const { data: assignments, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('assignee_id', user.id)
    .single();

  if (error) {
    console.log(error);
  }
  return assignments;
}

export const saveResponse = async ({ question_id, answer, is_correct }) => {
  const { data: { user } } = await supabase.auth.getUser()
  const candidate_id = user.id;
  const { data, error } = await supabase
    .from('responses')
    .insert([
      {
        candidate_id,
        question_id,
        answer,
        is_correct,
      }
    ]);

  if (error) {
    console.error('Error saving response:', error);
  }

  return data;
};

export const fetchResults = async () => {
  const { data: responses, error } = await supabase
    .from('responses')
    .select(`
      id,
      answer,
      is_correct,
      questions (question_text, difficulty, correct_answer),
      users (email)
    `);

  if (error) {
    console.error('Error fetching results:', error);
  }

  console.log('Results:', responses);

  return responses;
};

export const fetchUserRole = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  let { data: users, error } = await supabase
  .from('users')
  .select('role')
  .eq('id', user.id)
  .single();

  if (error) {
    console.error('Error fetching role:', error);
  }
  return users.role;

}


