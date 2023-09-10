import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import '../modal.css'
import './form.modal.css'
import { formDataType, ModalProp } from "../../interfaces";


export default function SignUp({ state, openForm }: ModalProp) {
  const [user, setUser] = useState({
    user_email: '',
    user_full_name: '',
  });
  const [pwdType, setPwdType] = useState('password');
  const [user_pwd, setPwdInput] = useState('');

  const requestBody: formDataType = {};
  const open = state.status === 'signUp' && !state.displayForm

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
  }

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    formData.forEach((value, key:string) => requestBody[key] = value);
    fetch('http://localhost:8000/api/v1/users/open', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    }).then(response => response.json())
    .then(result => console.log(result))
    .catch(e => console.log(e));

      // if (response.ok) {
      //     json = await response.json();
      // } else {
      //     console.log(`HTTP-ERROR ${response.status}`);
      // }
      // console.log(json);
  }

  function handlePwdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPwdInput(e.target.value);
  }

  function togglePwdType() {
    pwdType === 'password' ? setPwdType('text') : setPwdType('password');
  }

    // eslint-disable-next-line no-useless-escape
    // const regex = "[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}";
  return (
      <section className="modal" style={open ? {display: "block"} : {display: 'none'}}>
              <div className="modal-container">
                  <div className="modal-cell">
                      <div className="modal-element" style={open ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
                          <header className="modal-title">
                              <h2>Sign up</h2>
                              <div>Create a free account with your email</div>
                          </header>
                          <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => openForm('', false)}>
                              <RiCloseLine />
                          </a>
                          <div className="modal-body">
                              <form action="" method="post" onSubmit={handleFormSubmit}>
                                  <fieldset>
                                      <legend className="visually-hidden">Your personal information</legend>
                                      <div className="form-group">
                                          <label htmlFor="your-full_name">Full Name</label>
                                          <div className="form-field">
                                              <span className="form-field-container">
                                                  <input 
                                                  type="text"
                                                  name="user_full_name"
                                                  value={user.user_full_name}
                                                  onChange={handleChange}
                                                  id="your-full_name"
                                                  placeholder="Full Name"
                                                  pattern="[A-Za-zÀ-ž\s]{3,}"
                                                  maxLength={100}
                                                  autoComplete="false"
                                                  accessKey="f"
                                                  required/>
                                                  <i className="form-field-icon"></i>
                                                  <p className="form-help">Full name should be at least 3 characters and only contains letters</p>
                                              </span>
                                          </div>
                                      </div>
                                      <div className="form-group" style={{marginTop: '0.5rem'}}>
                                          <label htmlFor="your-email">Email</label>
                                          <div className="form-field">
                                              <span className="form-field-container">
                                                  <input 
                                                  type="email"
                                                  name="user_email"
                                                  value={user.user_email}
                                                  onChange={handleChange}
                                                  id="your-email"
                                                  placeholder="john@email.com"
                                                  pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                                                  maxLength={55}
                                                  autoComplete="on"
                                                  accessKey="e"
                                                  required/>
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
                                                  value={user_pwd}
                                                  onChange={handlePwdChange}
                                                  id="your-password"
                                                  placeholder="password" 
                                                  minLength={8}
                                                  required/>
                                                  <a className="pwd-icon" onClick={togglePwdType}>
                                                      {pwdType === 'password' ? <VscEye /> : <VscEyeClosed />}
                                                  </a>
                                              </span>
                                          </div>
                                      </div>
                                      <button type="submit" className="btn btn--m btn--primary">Create your free account</button>
                                  </fieldset>
                              </form>
                              <div className="small-text _m-t-3">
                                  By continuing you agree to our <a className="link link--black">Terms of Service</a>.
                                  <br />
                                  Read our <a className="link link--black">Privacy policy</a>.
                              </div>
                          </div>
                          <footer className="modal-footer">
                              Already have an account? <a className="link link--primary" onClick={() => openForm('signIn', false)}>Sign in</a>
                          </footer>
                      </div>
                  </div>
              </div>
          </section>
  );
}