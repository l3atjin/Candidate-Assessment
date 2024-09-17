import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import QuestionSets from '../../components/QuestionSets';
import { fetchQuestionSets, fetchResults, fetchUserRole } from '../../lib/supabase';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session?.user) {
        setUser(data.session.user);
        const role = await fetchUserRole();
        if (role !== 'admin') {
          navigate('/'); // Redirect to home page
        }
      } else {
        navigate('/admin/sign-in'); // Redirect to sign-in page
      }
      setLoading(false); 
    };

    const fetchQSet = async () => {
      const data = await fetchQuestionSets();
      setQuestionSet(data);
    };

    const fetchAllResults = async () => {
      const data = await fetchResults(); // Fetch results
      setResults(data);
    };

    fetchQSet();
    fetchAllResults();
    checkUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading state while checking
  }

  return (
    <div>
      <div className='text-right underline'>
        <Link to="/admin/sign-in" onClick={() => supabase.auth.signOut()}>Log out</Link>
      </div>
      <h1>Welcome to the Admin Dashboard</h1>

      {questionSet.length > 0 ?
        questionSet.map((set) => (
          <QuestionSets key={set.id} id={set.id} name={set.name} />
        )) : "No question sets found"
      }

      <div className="mt-8">
        <h2 className="text-xl font-bold">Results</h2>
        {results.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Candidate Email</th>
                <th className="border p-2">Question Text</th>
                <th className="border p-2">Difficulty</th>
                <th className="border p-2">Candidate Answer</th>
                <th className="border p-2">Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="border p-2">{result.users.email}</td>
                  <td className="border p-2">{result.questions.question_text}</td>
                  <td className="border p-2">{result.questions.difficulty}</td>
                  <td className="border p-2">{result.answer ? 'True' : 'False'}</td>
                  <td className="border p-2">{result.questions.correct_answer ? 'True' : 'False'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </div>
  );
}
