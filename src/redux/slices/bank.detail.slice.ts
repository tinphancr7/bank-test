import instance from '@/configs/axios.config'
import { IBank, IResponseDetailBank } from '@/types/bank.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BankSliceState {
  loading: boolean
  bankDetail: IBank | null
}

const initialState: BankSliceState = {
  loading: false,
  bankDetail: null
}

export const getBankDetail = createAsyncThunk(
  'bank/getBankDetail',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await instance.get<IResponseDetailBank>(`/banks/${_id}`)
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const bankDetailSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBankDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getBankDetail.fulfilled, (state, action) => {
        state.loading = false
        state.bankDetail = action.payload.data
      })
      .addCase(getBankDetail.rejected, (state) => {
        state.loading = false
      })
  }
})

export const bankDetailReducer = bankDetailSlice.reducer
