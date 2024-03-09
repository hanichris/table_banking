import UserForm from "./UserForm";
import SignIn from "./SignInForm";
import SignUp from "./SignUpForm";

import { IModalProp } from "../../interfaces";

export const SignInSignUp = (props: IModalProp) => (
  <>
    <UserForm {...props}/>
    {props.state.status === "signIn" && <SignIn {...props}/>}
    {props.state.status === "signUp" && <SignUp {...props}/>}
  </>
);