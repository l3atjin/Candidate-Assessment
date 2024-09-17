import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { fetchQuestions } from '../../lib/supabase';
import QuestionSets from '../../components/QuestionSets';
import { fetchQuestionSets } from '../../lib/supabase'

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session?.user) {
        setUser(data.session.user);
      } else {
        navigate('/admin/sign-in'); // Redirect to sign-in page
      }
      setLoading(false); // Set loading to false after checking
    };

    const fetchQSet = async () => {
      const data = await fetchQuestionSets();
      setQuestionSet(data);
    }

    fetchQSet()

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


      { questionSet.length > 0 ?
      questionSet.map((set) => (
        <QuestionSets key={set.id} id={set.id} name={set.name} />
      )) : "No question sets found"
      }

      
    </div>
  );
}
