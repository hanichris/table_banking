import { IModalProp } from "~/interfaces";
import UserForm from "./UserForm";

export const SignInSignUp = (props: IModalProp) => (
  <>
    <UserForm {...props}/>
  </>
);