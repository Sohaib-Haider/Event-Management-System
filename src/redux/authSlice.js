import { createSlice } from '@reduxjs/toolkit'

let savedUsers = []
let savedUser = null

try {
  savedUsers = JSON.parse(localStorage.getItem('users')) || []
  savedUser = JSON.parse(localStorage.getItem('currentUser')) || null
} catch {
  savedUsers = []
  savedUser = null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: savedUsers,
    currentUser: savedUser,
    error: '',
  },
  reducers: {
    registerUser(state, action) {
      const { name, email, password } = action.payload
      const existingUser = state.users.find((user) => user.email === email)

      if (existingUser) {
        state.error = 'An account with this email already exists.'
        return
      }

      state.users.push({ name, email, password })
      state.currentUser = { name, email }
      state.error = ''
    },

    loginUser(state, action) {
      const { email, password } = action.payload
      const user = state.users.find((user) => user.email === email && user.password === password)

      if (!user) {
        state.error = 'Incorrect email or password.'
        return
      }

      state.currentUser = { name: user.name, email: user.email }
      state.error = ''
    },

    logoutUser(state) {
      state.currentUser = null
      state.error = ''
    },

    clearError(state) {
      state.error = ''
    },
  },
})

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions
export default authSlice.reducer
