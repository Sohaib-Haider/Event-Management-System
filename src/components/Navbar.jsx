import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <h1>Event Management System</h1>

      <nav aria-label="Main navigation">
        <NavLink to="/" end>Events</NavLink>
        <NavLink to="/my-events">My Events</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
