import React from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'

export default function SignInCandidate() {
  const navigate = useNavigate()

  const handleCandidateSignIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Error signing in: ", error.message)
      alert(error.message + ". Please sign up first.")
    } else {
      
      navigate('/candidate/assignments')
    }
  }

  return (
    <div>
      <AuthForm onSubmit={handleCandidateSignIn} signUpUrl={'/candidate/sign-up'}/>
    </div>
  )
}
