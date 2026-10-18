import { createSlice } from '@reduxjs/toolkit'
import { isEventCompleted } from '../utils/isEventCompleted.js'

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
    removeRegistration(state, action) {
      const { userEmail, eventId } = action.payload

      state.registrations = state.registrations.filter((registration) => {
        return registration.userEmail !== userEmail || registration.event.id !== eventId
      })
    },
  },
})

export function registerForEvent(event) {
  return (dispatch, getState) => {
    const currentUser = getState().auth.currentUser

    if (!currentUser || !event?.id || isEventCompleted(event)) {
      return
    }

    dispatch(registrationsSlice.actions.addRegistration({ userEmail: currentUser.email, event }))
  }
}

export function cancelRegistration(eventId) {
  return (dispatch, getState) => {
    const currentUser = getState().auth.currentUser

    if (!currentUser) {
      return false
    }

    const registration = getState().registrations.registrations.find((registration) => {
      return registration.userEmail === currentUser.email && registration.event.id === eventId
    })

    if (!registration || isEventCompleted(registration.event)) {
      return false
    }

    dispatch(registrationsSlice.actions.removeRegistration({ userEmail: currentUser.email, eventId }))
    return true
  }
}

export default registrationsSlice.reducer
