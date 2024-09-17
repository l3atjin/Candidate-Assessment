import React from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'

export default function SignInAdmin() {
  const navigate = useNavigate()

  const handleAdminSignIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Error signing in: ", error.message)
      alert(error.message + ". Please sign up first.")
      // Display error message to the user (optional)
    } else {
      // Redirect to admin dashboard after successful sign-in
      
      navigate('/admin/dashboard')
    }
  }

  return (
    <div>
      <AuthForm onSubmit={handleAdminSignIn} signUpUrl={'/admin/sign-up'}/>
    </div>
  )
}
