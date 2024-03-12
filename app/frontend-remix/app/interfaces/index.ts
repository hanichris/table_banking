type TState = {
  isRendered: boolean;
  status: string;
};

export type TToken = {
  access_token: string;
  token_type: string;
};

export interface IModalProp {
  state: TState;
  toggleForm: (state?: string, open?: boolean) => void;
}