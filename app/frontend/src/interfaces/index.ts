import React from "react";

export interface IToken {
  access_token: string;
  token_type:string;
}

export interface IUserProfile {
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  id: number;
  banks?: Array<object>;
  banks_admin?: Array<object>;
}

export interface IUserProfileCreate {
  email: string;
  full_name?: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface IUserProfileUpdate {
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface ContextProp {
  children: React.ReactNode;
}

type State = {
  displayForm: boolean;
  status: string;
};

export interface ModalProp {
  state: State;
  openForm: (paramA?: string, paramB?: boolean) => void;
}

export interface MenuProp extends ModalProp {
  isOpen: boolean;
}

export interface formDataType {
  [key: string]: FormDataEntryValue;
}