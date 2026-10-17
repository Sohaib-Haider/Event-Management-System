import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import eventsReducer from './eventsSlice.js'
import registrationsReducer from './registrationsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

store.subscribe(() => {
  const { users, currentUser } = store.getState().auth

  localStorage.setItem('registrations', JSON.stringify(store.getState().registrations.registrations))

  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
})

export default store
