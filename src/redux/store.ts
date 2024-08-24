import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/auth.slice'
import layoutReducer from './slices/sidebar.slice'
import permissionReducer from './slices/permission.slice'
import { bankReducer } from './slices/bank.slice'
import { bankDetailReducer } from './slices/bank.detail.slice'
import { userReducer } from './slices/user.slice'
import { transactionReducer } from './slices/transaction.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    permission: permissionReducer,
    bank: bankReducer,
    bankDetail: bankDetailReducer,
    user: userReducer,
    transaction: transactionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
