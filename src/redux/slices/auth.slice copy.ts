import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initial_state_localstorage = (key: string) => {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

const initial_state_isLoggedIn = (key: string) => {
  const item = window.localStorage.getItem(key)
  return item ? !!item : false
}

interface AuthSliceState {
  isLoggedIn: boolean
  accessToken: string | null
  role: string | null
  permissions: { [key: string]: string[] } | null
  loading: boolean
}

const initialState: AuthSliceState = {
  isLoggedIn: initial_state_isLoggedIn('isLoggedIn'),
  accessToken: initial_state_localstorage('accessToken'),
  role: initial_state_localstorage('role'),
  permissions: initial_state_localstorage('permissions'),
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout(state) {
      state.accessToken = null
      state.permissions = null
      state.role = null
      state.isLoggedIn = false

      localStorage.removeItem('accessToken')
      localStorage.removeItem('permissions')
      localStorage.removeItem('role')
      localStorage.removeItem('isLoggedIn')
    },
    handleLogin(state, action: PayloadAction<any>) {
      state.accessToken = action?.payload.accessToken
      state.role = action.payload.user.role.name
      state.permissions = action.payload.permissions
      state.isLoggedIn = true

      localStorage.setItem(
        'accessToken',
        JSON.stringify(action.payload.accessToken)
      )
      localStorage.setItem(
        'role',
        JSON.stringify(action.payload.user.role.name)
      )
      localStorage.setItem(
        'permissions',
        JSON.stringify(action.payload.permissions)
      )
      localStorage.setItem('isLoggedIn', JSON.stringify('true'))
    }
  }
})

export const { handleLogout, handleLogin } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
