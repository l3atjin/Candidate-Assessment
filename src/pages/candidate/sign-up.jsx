import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { supabase } from '../../lib/supabase'


export default function SignUpCandidate() {
  const navigate = useNavigate()

  const handleCandidateSignUp = async ({ email, password }) => {
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
        .update({ role: 'candidate' })
        .eq('id', data.session.user.id)
        .select();
      
      console.log("user id is", data.session.user.id)
      if (error) {
        console.error("Error updating user role: ", error.message)
        alert(error.message)
      }
      navigate('/candidate/assignments')
    }
  }
  return (
    <div>
      <AuthForm isSignUp={true} onSubmit={handleCandidateSignUp} signUpUrl={'/candidate/sign-up'} />
    </div>
  )
}
