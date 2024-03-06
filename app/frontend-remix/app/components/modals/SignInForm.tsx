import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { IModalProp } from "~/interfaces";

export default function SignIn({ toggleForm, state }: IModalProp) {
  const [pwdType, setPwdType] = useState("password")
  const open = state.status === "signIn" && !state.isRendered;

  const togglePwdType = () => pwdType === "password" ? setPwdType("text") : setPwdType("password");

  return (
    <section className="modal" style={open ? {display: 'block'} : {display: "none"}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element" style={open ? {position: "relative", opacity: 1, transform: "translate3d(0, 0, 0) scale(1"} : {}}>
            <header className="modal-title">
              <h2>Sign in</h2>
              <div>Sign in with your email</div>
            </header>
            <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => toggleForm('', false)}>
              <RiCloseLine />
            </a>
            <div className="modal-body">
              <form action="" method="post">
                <fieldset>
                  <legend className="visually-hidden">Your personal information</legend>
                  <div className="form-group">
                    <label htmlFor="your-email">Email</label>
                    <div className="form-field">
                      <span className="form-field-container">
                        <input
                          type="email"
                          name="username"
                          // value={}
                          id="your-email"
                          placeholder="john@email.com"
                          pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                          maxLength={55}
                          autoComplete="on"
                          required/>
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
                          // value={}
                          id="your-password"
                          placeholder="password"
                          minLength={8}
                          required/>
                          <a className="pwd-icon" onClick={togglePwdType}>
                            { pwdType === "password" ? <VscEye /> :<VscEyeClosed />}
                          </a>
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn--m btn--primary">
                    Sign in
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
              Don't have an account? <a className="link link--primary" onClick={() => toggleForm("signUp", false)}>Sign  up</a>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}