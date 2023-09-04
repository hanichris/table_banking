import React from "react";

export interface IToken {
  access_token: string,
  token_type:string,
}

export interface IUserProfile {
  email: string,
  is_active: boolean,
  is_superuser: boolean,
  full_name: string,
  id: number,
  banks?: Array<object>,
  banks_admin?: Array<object>,
}

export interface ContextProp {
  children: React.ReactNode,
}