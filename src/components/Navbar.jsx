import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/authSlice.js'

function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <header>
      <h1>Event Management System</h1>

      <nav aria-label="Main navigation">
        <NavLink to="/" end>Events</NavLink>
        <NavLink to="/my-events">My Events</NavLink>

        {currentUser ? (
          <>
            <span>Welcome, {currentUser.name}</span>
            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
