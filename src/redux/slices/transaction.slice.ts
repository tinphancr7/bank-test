import instance from '@/configs/axios.config'
import {
  IResponseListTransactions,
  ITransaction
} from '@/types/transactions.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BankSliceState {
  loading: boolean
  listTransactions: ITransaction[]
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

const initialState: BankSliceState = {
  loading: false,
  listTransactions: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 1
}

export const getListTransactions = createAsyncThunk(
  'transaction/getListTransactionAccountId',
  async (
    { _id, filter }: { _id: number | undefined; filter: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.get<IResponseListTransactions>(
        `/transactions?accountId=${_id}&${filter}`
      )
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const transactionSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListTransactions.pending, (state) => {
        state.loading = true
      })
      .addCase(getListTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.listTransactions = action.payload.data.result
        state.totalPages = action.payload.data.meta.totalPages
        state.totalItems = action.payload.data.meta.totalItems
      })
      .addCase(getListTransactions.rejected, (state) => {
        state.loading = false
      })
  }
})
export const transactionReducer = transactionSlice.reducer
