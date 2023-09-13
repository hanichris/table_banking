import { IUserProfile, IBank } from "../../interfaces";

export interface AdminState {
  users: IUserProfile[];
  banks: IBank[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}