import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchEventDetails } from '../redux/eventsSlice.js'

function EventDetails() {
  const { eventId } = useParams()
  const { selectedEvent: event, detailsLoading, detailsError } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEventDetails(eventId))
  }, [dispatch, eventId])

  const venue = event?._embedded?.venues?.[0]
  const image = event?.images?.[0]
  const start = event?.dates?.start
  const category = event?.classifications?.[0]?.segment?.name
  const location = [venue?.address?.line1, venue?.city?.name, venue?.state?.name, venue?.country?.name].filter(Boolean).join(', ')

  return (
    <section className="event-details">
      <Link to="/">Back to events</Link>
      <h2>Event Details</h2>

      {detailsLoading && <p role="status">Loading event details...</p>}
      {detailsError && <p className="error" role="alert">{detailsError}</p>}

      {!detailsLoading && !detailsError && event?.id === eventId && (
        <>
          <h3>{event.name}</h3>
          {image ? <img src={image.url} alt={event.name} /> : <p>No image available.</p>}

          <p><strong>Date:</strong> {start?.dateTBA || start?.dateTBD ? 'To be announced' : start?.localDate || 'To be announced'}</p>
          <p><strong>Time:</strong> {start?.timeTBA ? 'To be announced' : start?.localTime || 'To be announced'} {event.dates?.timezone && `(${event.dates.timezone})`}</p>
          <p><strong>Venue:</strong> {venue?.name || 'To be announced'}</p>
          <p><strong>Location:</strong> {location || 'To be announced'}</p>
          <p><strong>Category:</strong> {category || 'Not specified'}</p>

          {event.info && <p>{event.info}</p>}
          {event.pleaseNote && <p><strong>Please note:</strong> {event.pleaseNote}</p>}
          {event.accessibility?.info && <p><strong>Accessibility:</strong> {event.accessibility.info}</p>}
        </>
      )}
    </section>
  )
}

export default EventDetails
