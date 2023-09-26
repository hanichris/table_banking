export interface MainState {
    error: string | null; // 'logInError', 'signUpError', etc.
    isLoggedIn: boolean | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // API call state.
    token: string;
    entities: object;
}

export interface Action {
    type: string;
    payload: MainState;
}