import { Link } from 'react-router-dom'

function Login() {
  return (
    <section>
      <h2>Login</h2>
      <p>Log in to register for events.</p>

      <Link to="/register">Create an account</Link>
    </section>
  )
}

export default Login
