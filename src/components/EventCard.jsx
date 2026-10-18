import { Link } from 'react-router-dom'

function EventCard({ event, children }) {
  const image = event.images?.[0]
  const venue = event._embedded?.venues?.[0]
  const start = event.dates?.start
  const date = start?.dateTBA || start?.dateTBD ? null : start?.localDate

  return (
    <article className="event-card">
      {image && <img src={image.url} alt={event.name} />}

      <div className="event-card-content">
        <h3>{event.name}</h3>
        <p>{date || 'Date to be announced'}</p>
        <p>{venue?.name || 'Venue to be announced'}</p>
        {venue?.city?.name && <p>{venue.city.name}</p>}

        <Link to={`/events/${event.id}`}>View details</Link>
        {children}
      </div>
    </article>
  )
}

export default EventCard
