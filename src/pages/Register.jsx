import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, clearError } from '../redux/authSlice.js'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
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

    if (!name.trim()) {
      setNameError('Please enter your name.')
      return
    }

    setNameError('')
    dispatch(registerUser({ name: name.trim(), email: email.trim().toLowerCase(), password }))
  }

  return (
    <section>
      <h2>Register</h2>
      <p>Create an account to manage your events.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
        <small>Use at least 6 characters for your password.</small>

        {(nameError || error) && <p className="error" role="alert">{nameError || error}</p>}
        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have an account? Log in</Link>
    </section>
  )
}

export default Register
