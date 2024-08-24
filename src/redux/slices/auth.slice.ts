import { getAccessTokenFromLS, getUserFromLS } from '@/utils/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSliceState {
  user: any
  isLoggedIn: boolean
  isLoading: boolean
}

const initialState: AuthSliceState = {
  user: getUserFromLS(),
  isLoggedIn: Boolean(getAccessTokenFromLS()),
  isLoading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout(state) {
      state.isLoggedIn = false
      state.user = null
    },
    handleLogin(state, action: PayloadAction<any>) {
      state.user = action.payload?.user
      state.isLoggedIn = true
    }
  }
})

export const { handleLogout, handleLogin } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
