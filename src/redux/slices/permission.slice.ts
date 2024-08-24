import permissionApi from '@/apiRequest/permission'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IState {
  isLoading: boolean
  meta: {
    page: number
    limit: number
    totalPages: number
    totalItems: number
  }
  result: any[]
}
// First, create the thunk
export const fetchPermission = createAsyncThunk(
  'permission/fetchPermission',
  async ({ search, page, limit }: any) => {
    const response = await permissionApi.callFetchPermission({
      search,
      page,
      limit
    })

    return response?.data
  }
)

const initialState: IState = {
  isLoading: true,
  meta: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0
  },
  result: []
}

export const permissionSlide = createSlice({
  name: 'permission',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPermission.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(fetchPermission.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(fetchPermission.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isLoading = false
        state.meta = action.payload.data.meta
        state.result = action.payload.data.result
      }
    })
  }
})

export const {} = permissionSlide.actions

export default permissionSlide.reducer
