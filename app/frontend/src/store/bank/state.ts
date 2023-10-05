import { IUserProfile, IBank } from "../../interfaces";

type Users = {
  ids: Array<string>,
  entities: Record<string, IUserProfile>,
};

export interface BankState extends IBank {
  error: string | null;
  members: Users;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // API call state.
}