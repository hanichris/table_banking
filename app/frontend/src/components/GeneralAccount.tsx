import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { formDataType } from "../interfaces";

export const General = () => {
  const [details, setDetails] = useState({
    user_full_name: '',
    user_email: '',
    user_pwd: '',
  });
  const [pwdType, setPwdType] = useState('password');

  function togglePwdType() {
    pwdType === 'password' ? setPwdType('text') : setPwdType('password');
  }

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setDetails({...details, [e.target.name]: e.target.value})
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data: formDataType = {};
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    formData.forEach((value, key:string) => data[key] = value);
    console.log(data);
  }

  return (
    <div data-tab='general'>
      <div className='panel _m-b-4'>
        <header>
          <h3>Full Name</h3>
        </header>
        <div className='panel-body'>
          <form id='account_form-username' onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <label htmlFor="account-username" className='account_full-name_label'>Full Name</label>
              <div className='form-field'>
                <span className='form-field-container'>
                  <input
                  type="text"
                  name='user_full_name'
                  value={details.user_full_name}
                  onChange={handleChange}
                  id='account-username'
                  placeholder="Full Name"
                  pattern="[A-Za-zÀ-ž\s]{3,}"
                  maxLength={100}
                  autoComplete="false"
                  accessKey="f"
                  />
                  <i className="form-field-icon"></i>
                  <p className="form-help">Full name should be at least 3 characters and only contains letters</p>
                </span>
              </div>
            </div>
            <div className="_m-t-4">
              <button type="submit" className="btn btn--m btn--primary">Save</button>
            </div>
          </form>
        </div>
      </div>
      <div className="panel _m-b-4">
        <header>
          <h3>Email</h3>
        </header>
        <div className='panel-body'>
        <form id='account_form-email' onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label htmlFor="account-useremail" className='account_email_label'>Email</label>
            <div className='form-field'>
              <span className='form-field-container'>
                <input
                type="email"
                name='user_email'
                value={details.user_email}
                onChange={handleChange}
                id='account-useremail'
                placeholder="john@email.com"
                pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                maxLength={55}
                autoComplete="on"
                accessKey="e"
                />
                <i className="form-field-icon"></i>
                <p className="form-help">Email should be a valid email address that matches the RFC standard</p>
              </span>
            </div>
          </div>
          <div className="_m-t-4">
            <button type="submit" className="btn btn--m btn--primary">Save</button>
          </div>
        </form>
        </div>
      </div>
      <div className="panel _m-b-4">
        <header>
          <h3>Password</h3>
        </header>
        <div className='panel-body'>
          <div className="alert alert-info _m-b-4">Create a password to access with your email where Google and Apple are not available</div>
          <form id='account_form-password' onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <label htmlFor="account-userpwd" className='account_pwd_label'>Choose a password</label>
              <div className='form-field'>
                <span className='form-field-container'>
                  <input
                  type={pwdType}
                  name='user_pwd'
                  value={details.user_pwd}
                  onChange={handleChange}
                  id='account-userpwd'
                  placeholder="Min. 8 characters"
                  minLength={8}
                  autoComplete="on"
                  accessKey="e"
                  />
                  <a className="pwd-icon" onClick={togglePwdType}>
                      {pwdType === 'password' ? <VscEye /> : <VscEyeClosed />}
                  </a>
                </span>
              </div>
            </div>
            <div className="_m-t-4">
              <button type="submit" className="btn btn--m btn--primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};