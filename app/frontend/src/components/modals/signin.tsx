// import { IToken, IUserProfile } from "../../interfaces";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import '../modal.css'
import './form.modal.css'
import { actions } from "../../store/main/actions";
// import { UsersDispatchContext } from "../../context/userContext";
import { ModalProp } from "../../interfaces";
import { Spinner } from "../Spinner";


export default function SignIn({ state, openForm }: ModalProp) {
  const [pwdType, setPwdType] = useState('password');
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(state => state.main.status);

  const isLoading = reqStatus === 'loading';

  const open = state.status === 'signIn' && !state.displayForm;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  function togglePwdType() {
    pwdType === 'password' ? setPwdType('text') : setPwdType('password');
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const actionObj = actions.logIn({
      uname: formData.get('username') as string,
      pwd: formData.get('password') as string,
    })
    dispatch(actionObj);
  }

  function handleBlur(e:React.ChangeEvent<HTMLInputElement>) {
    setUserDetails({...userDetails, [e.target.name]: e.target.value.trim()})
  }

    // eslint-disable-next-line no-useless-escape
    // const regex = "[\\w!#$%&'*+\\/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+\\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}";
  return (
      <section className="modal" style={open ? {display: "block"} : {display: 'none'}}>
            <div className="modal-container">
                <div className="modal-cell">
                    <div className="modal-element" style={open ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
                        <header className="modal-title">
                            <h2>Sign in</h2>
                            <div>Sign in with your email here</div>
                        </header>
                        <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => openForm('', false)}>
                            <RiCloseLine />
                        </a>
                        <div className="modal-body">
                            <form action="" method="post" onSubmit={handleFormSubmit}>
                                <fieldset>
                                    <legend className="visually-hidden">Your personal information</legend>
                                    <div className="form-group">
                                        <label htmlFor="your-email">Email</label>
                                        <div className="form-field">
                                            <span className="form-field-container">
                                                <input 
                                                type="email"
                                                name="username"
                                                value={userDetails.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="your-email"
                                                placeholder="john@email.com"
                                                pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                                                maxLength={55}
                                                autoComplete="on"
                                                accessKey="e"
                                                required
                                                disabled={isLoading}
                                                className={isLoading ? 'disabled': ''}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group form-group-size-m">
                                        <label htmlFor="your-password">Password</label>
                                        <div className="form-field">
                                            <span className="form-field-container">
                                                <input
                                                type={pwdType}
                                                name="password"
                                                value={userDetails.password}
                                                onChange={handleChange}
                                                id="your-password"
                                                placeholder="password" 
                                                minLength={8}
                                                required
                                                disabled={isLoading}
                                                className={isLoading ? 'disabled': ''}
                                                />
                                                <a className="pwd-icon" onClick={togglePwdType}>
                                                    {pwdType === 'password' ? <VscEye /> : <VscEyeClosed />}
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" className={isLoading ? "btn btn--m btn--primary is-disabled": "btn btn--m btn--primary"} disabled={isLoading}>
                                        Sign in
                                        {isLoading && <Spinner />}
                                    </button>
                                </fieldset>
                            </form>
                            <div className="small-text _m-t-3">
                                By continuing you agree to our <a className="link link--black">Terms of Service</a>.
                                <br />
                                Read our <a className="link link--black">Privacy policy</a>.
                            </div>
                        </div>
                        <footer className="modal-footer">
                            Forgot password? <a className="link link--primary">Reset</a>
                            <br />
                            Don't have an account? <a className="link link--primary" onClick={() => openForm('signUp', false)}>Sign up</a>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
  );
}