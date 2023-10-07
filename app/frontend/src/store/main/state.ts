import { IBank, IUserProfile } from "../../interfaces";

interface IUser extends IUserProfile {
    banks: Array<number>;
    banks_admin: Array<number>;
}

type Entity = {
    banks: Record<string, IBank>,
    details: IUser,
};

export interface MainState {
    error: string | null; // 'logInError', 'signUpError', etc.
    isLoggedIn: boolean | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // API call state.
    token: string;
    user: Entity;
}

export interface Action {
    type: string;
    payload: MainState;
}