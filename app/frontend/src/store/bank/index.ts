import { BankState } from "./state";

export const bankDefaultState: BankState = {
  title: '',
  interest_rate: 0,
  amount: '',
  loaned_out_amount: 0,
  id: 0,
  admin_id: 0,
  members: {
    ids: [],
    entities: {},
  },
  status: 'idle', // or: 'loading' | 'succeeded' | 'failed'
  error: null,
}