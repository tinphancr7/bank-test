import instance from '@/configs/axios.config'
import { IResponseSynchronizeAccountBanks } from '@/types/bank.type'

const banks = {
  synchronizeBankAccounts: async () => {
    const res = await instance.get<IResponseSynchronizeAccountBanks>(
      '/banks/fetch-banks'
    )
    return res.data
  }
}

export default banks
