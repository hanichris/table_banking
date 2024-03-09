import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { IModalProp } from "~/interfaces";
import { Spinner } from "../Spinner";
import { action } from "~/root";

export default function SignIn({ toggleForm, state }: IModalProp) {
  const [pwdType, setPwdType] = useState("password")
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const open = state.status === "signIn" && !state.isRendered;
  const isSubmitting = navigation.state === "submitting";

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
            <button className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => toggleForm('', false)}>
              <RiCloseLine />
            </button>
            <div className="modal-body">
              <Form action="" method="post" className={actionData?.fieldErrors || actionData?.formError ? "has-errors" : ""}>
                <fieldset>
                  <legend className="visually-hidden">Your personal information</legend>
                  <input type="hidden" name="auth" value="login"/>
                  <div className="form-group">
                    <label htmlFor="your-email">Email</label>
                    <div className={actionData?.fieldErrors ? "form-field email-error" : "form-field"}>
                      <span className="form-field-container">
                        <input
                          type="email"
                          name="username"
                          defaultValue={actionData?.fields?.username}
                          id="your-email"
                          placeholder="john@email.com"
                          pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                          maxLength={55}
                          autoComplete="on"
                          disabled={isSubmitting}
                          className={isSubmitting ? "disabled": ""}
                          required/>
                          {actionData?.fieldErrors?.username ? (
                            <p className="form-error">{actionData.fieldErrors.username}</p>
                          ) : null}
                      </span>
                    </div>
                  </div>
                  <div className="form-group form-group-size-m">
                    <label htmlFor="your-password">Password</label>
                    <div className={actionData?.fieldErrors ? "form-field pwd-error" : "form-field"}>
                      <span className="form-field-container">
                        <input
                          type={pwdType}
                          name="password"
                          defaultValue={actionData?.fields?.password}
                          id="your-password"
                          placeholder="password"
                          minLength={8}
                          required
                          disabled={isSubmitting}
                          className={isSubmitting ? "disabled": ""}
                          />
                          <a className="pwd-icon" onClick={togglePwdType}>
                            { pwdType === "password" ? <VscEye /> :<VscEyeClosed />}
                          </a>
                          {actionData?.fieldErrors?.password ? (
                            <p className="form-error">{actionData.fieldErrors.password}</p>
                          ) : null}
                      </span>
                    </div>
                  </div>
                  <div>
                  </div>
                  <div>
                    {actionData?.formError ? (
                      <p role="alert">{actionData.formError}</p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={isSubmitting ? "btn btn--m btn--primary is-disabled" : "btn btn--m btn--primary"}>
                      Sign in
                      {isSubmitting && <Spinner />}
                    </button>
                  </div>
                </fieldset>
              </Form>
              <div className="small-text _m-t-3">
                By continuing you agree to our <a className="link link--black">Terms of Service</a>.
                <br />
                Read our <a className="link link--black">Privacy policy</a>.
              </div>
            </div>
            <footer className="modal-footer">
              Forgot password? <a className="link link--primary">Reset</a>
              <br />
              Don&apos;t have an account? <a className="link link--primary" onClick={() => toggleForm("signUp", false)}>Sign  up</a>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}