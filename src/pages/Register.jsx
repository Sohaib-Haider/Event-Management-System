import { Link } from 'react-router-dom'

function Register() {
  return (
    <section>
      <h2>Register</h2>
      <p>Create an account to manage your events.</p>

      <Link to="/login">Already have an account? Log in</Link>
    </section>
  )
}

export default Register
