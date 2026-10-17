import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
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

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
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
  },
})

export default eventsSlice.reducer
