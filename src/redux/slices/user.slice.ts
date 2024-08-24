import instance from '@/configs/axios.config'
import { IResponseListUsers } from '@/types/user.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserSliceState {
  loading: boolean
  page: number
  limit: number
  totalPages: number
  totalItems: number
  listUsers: any
}

const initialState: UserSliceState = {
  loading: false,
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 1,
  listUsers: []
}

export const getListUsers = createAsyncThunk(
  'user/getListUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get<IResponseListUsers>(`/users`)
      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const userSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getListUsers.fulfilled, (state, action) => {
        state.loading = false
        state.listUsers = action.payload.data.result
        state.limit = action.payload.data.meta.limit
        state.totalPages = action.payload.data.meta.totalPages
        state.totalItems = action.payload.data.meta.totalItems
        state.page = action.payload.data.meta.page
      })
      .addCase(getListUsers.rejected, (state) => {
        state.loading = false
      })
  }
})

export const userReducer = userSlice.reducer