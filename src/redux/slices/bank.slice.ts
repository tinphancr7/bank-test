import instance from '@/configs/axios.config'
import { IBank, IResponseListBank } from '@/types/bank.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BankSliceState {
  loading: boolean
  page: number
  limit: number
  totalPages: number
  totalItems: number
  listBanks: IBank[]
}

const initialState: BankSliceState = {
  loading: false,
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 1,
  listBanks: []
}

export const getListBanks = createAsyncThunk(
  'bank/getListBanks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get<IResponseListBank>(
        `/banks`
      )
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListBanks.pending, (state) => {
        state.loading = true
      })
      .addCase(getListBanks.fulfilled, (state, action) => {
        state.loading = false
        state.listBanks = action.payload.data.result
        state.limit = action.payload.data.meta.limit
        state.totalPages = action.payload.data.meta.totalPages
        state.totalItems = action.payload.data.meta.totalItems
        state.page = action.payload.data.meta.page
      })
      .addCase(getListBanks.rejected, (state) => {
        state.loading = false
      })
  }
})

export const bankReducer = bankSlice.reducer
