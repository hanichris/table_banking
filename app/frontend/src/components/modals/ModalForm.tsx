import UserForm from "../UserForm";
import SignIn from "./signin";
import SignUp from "./signup";
import { ModalProp } from "../../interfaces";


export const SignInSignUp = (props: ModalProp) => (
  <>
    <UserForm {...props}/>
    {props.state.status === 'signIn' && <SignIn {...props}/>}
    {props.state.status === 'signUp' && <SignUp {...props}/>}
  </>
);