import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (data.session?.user) {
        setUser(data.session.user);
      } 
    };

    checkUser();
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
