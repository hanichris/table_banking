import React from "react";

export interface IBank {
  title: string;
  interest_rate: number;
  amount: string;
  loaned_out_amount: number;
  id: number;
  admin_id: number;
}

export interface IBankCreate {
  title: string;
  interest_rate?: number;
  amount?: number;
  loaned_out_amount?: number;
}

export interface IToken {
  access_token: string;
  token_type:string;
}

export interface IUserProfile {
  email: string;
  is_active: boolean | null;
  is_superuser: boolean | null;
  full_name: string;
  id: number;
}

export interface IUser extends IUserProfile{
  bank_admin: Array<IBank>;
  banks: Array<IBank>;
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

type UserBankItem = {
  id: number,
  userId: number,
  bankId: number,
};

export interface IUserBanks {
  byId: Record<number, UserBankItem>;
  allIds: Array<number>;
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
  toggle: () => void;
}

export interface EntityProp {
  setOpen: (param: boolean) => void;
  open: boolean;
}

export interface StateEntityProp extends EntityProp{
  title: string;
}

export interface DeleteEntityProp extends EntityProp {
  entity: string;
}

export interface formDataType {
  [key: string]: FormDataEntryValue;
}

export interface IParams {
  pageNum: number;
  pageSize: number;
}

export interface IData {
  data: Array<IUser>;
  userID: string | null;
}

export type I404  = {
  detail: string;
}