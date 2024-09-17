import React, { useEffect, useState } from 'react';
import { fetchAssignments, supabase } from '../../lib/supabase';
import AssignmentQuestions from '../../components/AssignmentQuestions';

export default function Assignments() {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await fetchAssignments();
      console.log("assignment is", data);
      setAssignment(data);
      setLoading(false);
    };

    fetchInitial();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Assignments</h1>
      {assignment ? <AssignmentQuestions questionSetId={assignment.question_set_id} /> : <p>No assignments found.</p>}
    </div>
  );
}
