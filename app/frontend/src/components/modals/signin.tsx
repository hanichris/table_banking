import { RiCloseLine } from "react-icons/ri";
import '../modal.css'
import './form.modal.css'

interface UserFormProps {
    isOpen: boolean,
    setIsOpen: (param: boolean) => void,
}

export default function SignIn({ isOpen, setIsOpen }: UserFormProps) {

    // eslint-disable-next-line no-useless-escape
    const regex = "^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$";
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
                                <form action="" method="post">
                                    <fieldset>
                                        <legend className="visually-hidden">Your personal information</legend>
                                        <div className="form-group">
                                            <label htmlFor="your-email">Email</label>
                                            <div className="form-field">
                                                <span className="form-field-container">
                                                    <input type="email" name="your-email" id="your-email" placeholder="e.g youremail@gmail.com" pattern={regex} maxLength={55} autoComplete="on" accessKey="e" required/>
                                                    <i className="form-field-icon"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="your-password">Password</label>
                                            <div className="form-field">
                                                <span className="form-field-container">
                                                    <input type="password" name="your-password" id="your-password" required/>
                                                </span>
                                            </div>
                                        </div>
                                        <button type="submit">Sign in</button>
                                    </fieldset>
                                </form>
                                <div className="small-text _m-t-3">
                                    By continuing you agree to our <a className="link link--black">Terms of Service</a>.
                                    <br />
                                    Read our <a className="link link--black">Privacy policy</a>.
                                </div>
                            </div>
                            <footer className="modal-footer">
                                Forgot password? <a className="link">Reset</a>
                                <br />
                                Don't have an account? <a className="link">Sign up</a>
                            </footer>
                        </div>
                    </div>
                </div>
            </section>
    );
}