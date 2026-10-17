import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice.js'
import EventCard from '../components/EventCard.jsx'

function Events() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateError, setDateError] = useState('')

  const { events, loading, error } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  function handleSearch(event) {
    event.preventDefault()

    if (startDate && endDate && endDate < startDate) {
      setDateError('The end date must be on or after the start date.')
      return
    }

    if (endDate && new Date(endDate + 'T23:59:59') < new Date()) {
      setDateError('Choose today or a future date for the end date.')
      return
    }

    setDateError('')
    dispatch(fetchEvents({ keyword, category, startDate, endDate }))
  }

  return (
    <section>
      <h2>Events</h2>
      <p>Explore upcoming events.</p>

      <form onSubmit={handleSearch}>
        <label htmlFor="keyword">Search events</label>
        <input id="keyword" type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Event or artist name" />

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <label htmlFor="startDate">From date</label>
        <input id="startDate" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />

        <label htmlFor="endDate">To date</label>
        <input id="endDate" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />

        {dateError && <p className="error" role="alert">{dateError}</p>}
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {loading && <p role="status">Loading events...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events match your search. Try a different keyword, category, or date.</p>}

      <div className="event-list">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  )
}

export default Events
