import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { formDataType } from "../interfaces";

export const Delete = () => {
  const [pwd, setPwd] = useState('');
  const [pwdType, setPwdType] = useState('password');

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);
  function togglePwdType() {
    pwdType === 'password' ? setPwdType('text') : setPwdType('password');
  }

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: formDataType = {};
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    formData.forEach((value, key:string) => data[key] = value);
    console.log(data);
  }

  const disabledSave = <button type="submit" className="btn btn--m btn--danger disable" disabled>Save</button>
  const save = <button type="submit" className="btn btn--m btn--danger" >Save</button>

  return (
  <div data-tab='delete'>
    <div className="panel _m-b-4">
      <header>
        <h3>Delete Account</h3>
      </header>
      <div className="panel-body">
        <form id="account_form-delete" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="account-delete" className="account_pwd_label">Account password</label>
            <div className="form-field">
              <span className="form-field-container">
                <input
                type={pwdType}
                name="user_pwd"
                value={pwd}
                onChange={handlePwdChange}
                minLength={8}
                id="account-delete"
                />
                <a className="pwd-icon" onClick={togglePwdType}>
                  {pwdType === 'password' ? <VscEye /> : <VscEyeClosed />}
                </a>
              </span>
            </div>
          </div>
          <div className="_m-t-4">
            {pwd.length > 0 ? save : disabledSave}
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};