import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MyEvents from './pages/MyEvents.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
