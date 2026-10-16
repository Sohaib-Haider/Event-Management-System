import { Link } from 'react-router-dom'

function EventDetails() {
  return (
    <section>
      <h2>Event Details</h2>
      <p>Event information will appear here.</p>

      <Link to="/">Back to events</Link>
    </section>
  )
}

export default EventDetails
