import React, { useState } from 'react'

export default function AuthForm({ isSignUp = false, onSubmit, signUpUrl }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onSubmit) {
      await onSubmit({ email, password })
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center bg-gray-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold text-gray-700 mb-1 self-start">Email</label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold text-gray-700 mb-1 self-start">Password</label>
          <input
            type="password"
            id="password"
            className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      {isSignUp ? (
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/admin/sign-in" className="text-blue-500 hover:underline">
            Sign in here
          </a>
        </p>
      ) : (
        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href={signUpUrl} className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      )}
    </div>
  )
}
