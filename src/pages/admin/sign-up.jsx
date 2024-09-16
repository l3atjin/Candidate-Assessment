import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { supabase } from '../../lib/supabase'

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
      // Display error message to the user (optional)
    } else {
      // Redirect to admin dashboard after successful sign-up
      navigate('/admin/dashboard')
    }
  }

  return (
    <div>
      <AuthForm isSignUp={true} onSubmit={handleAdminSignUp} />
    </div>
  )
}
