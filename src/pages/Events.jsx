import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice.js'
import EventCard from '../components/EventCard.jsx'

function Events() {
  const { events, loading, error } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <section>
      <h2>Events</h2>
      <p>Explore upcoming events.</p>

      {loading && <p role="status">Loading events...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found.</p>}

      <div className="event-list">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  )
}

export default Events
