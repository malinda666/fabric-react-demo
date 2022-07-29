import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div>
      <span>This login page use different layout</span>
      <p>
        <input type="text" placeholder="Username" />
      </p>
      <p>
        <input type="password" placeholder="Password" />
      </p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}

export default Login
