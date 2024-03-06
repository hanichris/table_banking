type TState = {
  isRendered: boolean;
  status: string;
};

export interface IModalProp {
  state: TState;
  toggleForm: (state?: string, open?: boolean) => void;
}