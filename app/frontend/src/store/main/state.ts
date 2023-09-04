import { IUserProfile } from "../../interfaces";


export interface MainState {
    logInError: boolean,
    isLoggedIn: boolean,
    token: string,
    userProfile?: IUserProfile,
}

export interface Action {
    type: string,
    payload: MainState,
}