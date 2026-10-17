import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import eventsReducer from './eventsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
})

store.subscribe(() => {
  const { users, currentUser } = store.getState().auth

  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
})

export default store
