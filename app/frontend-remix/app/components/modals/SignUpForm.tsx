import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { IModalProp } from "~/interfaces";

export default function SignUp({toggleForm, state}: IModalProp) {
  const [pwdType, setPwdType] = useState("password");
  const open = state.status === "signUp" && !state.isRendered;

  const togglePwdType = () => pwdType === "password" ? setPwdType("text") : setPwdType("password");

  return (
    <section className="modal" style={open ? {display: "block"} : {display: "none"}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element">
            <header className="modal-title">
              <h2>Sign Up</h2>
              <div>Create a free account with your email</div>
            </header>
            <button className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => toggleForm('', false)}>
              <RiCloseLine />
            </button>
            <div className="modal-body">
              <form action="" method="post">
                <fieldset>
                  <legend className="visually-hidden">Your personal information</legend>
                  <div className="form-group">
                    <label htmlFor="your-full_name">Full Name</label>
                    <div className="form-field">
                      <span className="form-field-container">
                        <input
                          type="text"
                          name="user_full_name"
                          id="your-full_name"
                          placeholder="Full Name"
                          maxLength={100}
                          autoComplete="false"
                          required />
                          <i className="form-field-icon"></i>
                          <p className="form-help">Full name should be at least 3 characters and only contain letters</p>
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="your-email">Email</label>
                    <div className="form-field">
                      <span className="form-field-container">
                        <input
                          type="email"
                          name="user_email"
                          id="your-email"
                          placeholder="john@email.com"
                          pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                          maxLength={55}
                          required />
                          <i className="form-field-icon"></i>
                          <p className="form-help">Email should be a valid email address that matches the RFC standard</p>
                      </span>
                    </div>
                  </div>
                  <div className="form-group form-group-size-m">
                    <label htmlFor="your-password">Password</label>
                    <div className="form-field">
                      <span className="form-field-container">
                        <input
                          type={pwdType}
                          name="user_pwd"
                          id="your-password"
                          placeholder="password"
                          minLength={8}
                          required />
                          <a className="pwd-icon" onClick={togglePwdType}>
                            {pwdType === "password" ? <VscEye /> : <VscEyeClosed />}
                          </a>
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn--m btn--primary">
                    Create your free account
                  </button>
                </fieldset>
              </form>
              <div className="small-text _m-t-3">
                By continuing you agree to our <a className="link link--black">Terms of Service.</a>
                <br />
                Read our <a className="link link--black">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}