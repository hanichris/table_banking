import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import '../modal.css'
import './form.modal.css'

interface UserFormProps {
    isOpen: boolean,
    setIsOpen: (param: boolean) => void,
    setStatus: (param: string) => void,
}


export default function SignIn({ isOpen, setIsOpen, setStatus }: UserFormProps) {
    const [pwdType, setPwdType] = useState('password');
    const [pwdInput, setPwdInput] = useState('');

    function handlePwdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPwdInput(e.target.value);
    }

    function togglePwdType() {
        pwdType === 'password' ? setPwdType('text') : setPwdType('password');
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const url = new URL('http://localhost:8000/api/v1/login/access-token');
        const data = new URLSearchParams();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        formData.forEach((value, key: string) => data.set(key, value as string));
        fetch(url, {
            method: 'POST',
            body: data
        }).then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    // eslint-disable-next-line no-useless-escape
    // const regex = "[\\w!#$%&'*+\\/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+\\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}";
    return (
        <section className="modal" style={isOpen ? {display: "block"} : {display: 'none'}}>
                <div className="modal-container">
                    <div className="modal-cell">
                        <div className="modal-element" style={isOpen ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
                            <header className="modal-title">
                                <h2>Sign in</h2>
                                <div>Sign in with your email here</div>
                            </header>
                            <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => setIsOpen(false)}>
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
                                                    id="your-email"
                                                    placeholder="john@email.com"
                                                    pattern="[\w!#$%&'*+\/=?`\{\|\}~^\-]+(?:\.[\w!#$%&'*+\/=?`\{\|\}~^\-])*@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}"
                                                    maxLength={55}
                                                    autoComplete="on"
                                                    accessKey="e"
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
                                                    value={pwdInput}
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
                                        <button type="submit" className="btn btn--m btn--primary">Sign in</button>
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
                                Don't have an account? <a className="link link--primary" onClick={() => setStatus('signUp')}>Sign up</a>
                            </footer>
                        </div>
                    </div>
                </div>
            </section>
    );
}