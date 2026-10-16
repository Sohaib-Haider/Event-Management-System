import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

store.subscribe(() => {
  const { users, currentUser } = store.getState().auth

  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
})

export default store
