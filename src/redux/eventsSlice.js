import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (filters = {}, { rejectWithValue }) => {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY

  if (!apiKey) {
    return rejectWithValue('Events are unavailable because the API key has not been configured.')
  }

  const parameters = new URLSearchParams({
    apikey: apiKey,
    size: '20',
    sort: 'date,asc',
    startDateTime: new Date().toISOString().split('.')[0] + 'Z',
  })

  if (filters.keyword?.trim()) {
    parameters.set('keyword', filters.keyword.trim())
  }

  if (filters.category) {
    parameters.set('segmentName', filters.category)
  }

  if (filters.startDate) {
    const selectedDate = new Date(filters.startDate + 'T00:00:00')
    const startDate = new Date(Math.max(selectedDate.getTime(), Date.now()))
    parameters.set('startDateTime', startDate.toISOString().split('.')[0] + 'Z')
  }

  if (filters.endDate) {
    const endDate = new Date(filters.endDate + 'T23:59:59')
    parameters.set('endDateTime', endDate.toISOString().split('.')[0] + 'Z')
  }

  try {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${parameters}`)

    if (!response.ok) {
      return rejectWithValue('Unable to load events. Please try again later.')
    }

    const data = await response.json()
    return data._embedded?.events || []
  } catch {
    return rejectWithValue('Unable to connect. Please check your internet connection and try again.')
  }
})

export const fetchEventDetails = createAsyncThunk('events/fetchEventDetails', async (eventId, { rejectWithValue }) => {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY

  if (!apiKey) {
    return rejectWithValue('Event details are unavailable because the API key has not been configured.')
  }

  const parameters = new URLSearchParams({ apikey: apiKey })

  try {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(eventId)}.json?${parameters}`)

    if (response.status === 404) {
      return rejectWithValue('This event could not be found.')
    }

    if (!response.ok) {
      return rejectWithValue('Unable to load event details. Please try again later.')
    }

    const event = await response.json()

    if (!event.id) {
      return rejectWithValue('This event could not be found.')
    }

    return event
  } catch {
    return rejectWithValue('Unable to connect. Please check your internet connection and try again.')
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    selectedEvent: null,
    detailsLoading: false,
    detailsError: '',
    detailsRequestId: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = ''
        state.events = []
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unable to load events. Please try again later.'
      })
      .addCase(fetchEventDetails.pending, (state, action) => {
        state.detailsLoading = true
        state.detailsError = ''
        state.selectedEvent = null
        state.detailsRequestId = action.meta.requestId
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        if (state.detailsRequestId !== action.meta.requestId) return

        state.detailsLoading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        if (state.detailsRequestId !== action.meta.requestId) return

        state.detailsLoading = false
        state.detailsError = action.payload || 'Unable to load event details. Please try again later.'
      })
  },
})

export default eventsSlice.reducer
