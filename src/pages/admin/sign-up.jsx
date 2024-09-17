import React from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'

export default function SignUpAdmin() {
  const navigate = useNavigate()

  const handleAdminSignUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Error signing up: ", error.message)
      alert(error.message)
    } else {
      const { error } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', data.session.user.id)
        .select();
      
      console.log("user id is", data.session.user.id)
      if (error) {
        console.error("Error updating user role: ", error.message)
        alert(error.message)
      }
      navigate('/admin/dashboard')
    }
  }

  return (
    <div>
      <AuthForm isSignUp={true} onSubmit={handleAdminSignUp} signUpUrl={'/admin/sign-up'} />
    </div>
  )
}
