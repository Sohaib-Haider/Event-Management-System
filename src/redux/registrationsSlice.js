import { createSlice } from '@reduxjs/toolkit'

let savedRegistrations = []

try {
  const registrations = JSON.parse(localStorage.getItem('registrations'))
  if (Array.isArray(registrations)) {
    savedRegistrations = registrations
  }
} catch {
  savedRegistrations = []
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    registrations: savedRegistrations,
  },
  reducers: {
    addRegistration(state, action) {
      const { userEmail, event } = action.payload
      const alreadyRegistered = state.registrations.some((registration) => registration.userEmail === userEmail && registration.event.id === event.id)

      if (!alreadyRegistered) {
        state.registrations.push({ userEmail, event })
      }
    },
  },
})

export function registerForEvent(event) {
  return (dispatch, getState) => {
    const currentUser = getState().auth.currentUser

    if (!currentUser || !event?.id) {
      return
    }

    dispatch(registrationsSlice.actions.addRegistration({ userEmail: currentUser.email, event }))
  }
}

export default registrationsSlice.reducer
