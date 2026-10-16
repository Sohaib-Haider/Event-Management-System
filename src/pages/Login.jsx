import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, clearError } from '../redux/authSlice.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { currentUser, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(loginUser({ email: email.trim().toLowerCase(), password }))
  }

  return (
    <section>
      <h2>Login</h2>
      <p>Log in to register for events.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />

        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Create an account</Link>
    </section>
  )
}

export default Login
