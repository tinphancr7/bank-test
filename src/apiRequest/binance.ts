/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '../configs/axios.config'
const binanceApi = {
  saveApiKey: async (data: any) => {
    const res = await instance.post('binance/save-api-key', data)
    return res.data
  },

  getDetailAccount: async () => {
    const res = await instance.get('binance/account-detail')
    return res.data
  },

  getTransactionHistoryByType: async (type: any) => {
    const res = await instance.get(`binance/get-transaction-history/${type}`)
    return res.data
  },

  getTransactionHistoryBinancePay: async () => {
    const res = await instance.get(`binance/get-transaction-pay`)
    return res.data
  }
}

export default binanceApi
