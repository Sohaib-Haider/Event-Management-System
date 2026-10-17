import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/EventCard.jsx'
import { cancelRegistration } from '../redux/registrationsSlice.js'
import { isEventCompleted } from '../utils/isEventCompleted.js'

function MyEvents() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.registrations)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const myEvents = registrations.filter((registration) => registration.userEmail === currentUser?.email)
  const upcomingEvents = myEvents.filter((registration) => !isEventCompleted(registration.event))
  const completedEvents = myEvents.filter((registration) => isEventCompleted(registration.event))

  function handleCancel(event) {
    const cancelled = dispatch(cancelRegistration(event.id))

    if (cancelled) {
      setMessage('Your registration for ' + event.name + ' has been cancelled.')
    }
  }

  return (
    <section>
      <h2>My Events</h2>
      {message && <p role="status">{message}</p>}

      {myEvents.length === 0 ? (
        <p>You have no registered events.</p>
      ) : (
        <>
          <h3>Upcoming Events</h3>
          {upcomingEvents.length === 0 && <p>You have no upcoming events.</p>}

          <div className="event-list">
            {upcomingEvents.map(({ event }) => (
              <EventCard key={event.id} event={event}>
                <button type="button" onClick={() => handleCancel(event)}>Cancel registration</button>
              </EventCard>
            ))}
          </div>

          <h3>Completed Events</h3>
          {completedEvents.length === 0 && <p>You have no completed events.</p>}

          <div className="event-list">
            {completedEvents.map(({ event }) => <EventCard key={event.id} event={event} />)}
          </div>
        </>
      )}
    </section>
  )
}

export default MyEvents
