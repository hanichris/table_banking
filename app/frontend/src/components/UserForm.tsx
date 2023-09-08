import { RiCloseLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa6"
import { FaApple } from "react-icons/fa6"

import './modal.css'

type State = {
    displayForm: boolean,
    status: string,
};

interface UserFormProps {
    state: State,
    openForm: (paramA?: string, paramB?: boolean) => void,
}

export default function UserForm({ openForm, state }: UserFormProps) {

    
  return (
      <>
          <section className="modal" style={state.displayForm ? {display: "block"} : {display: 'none'}}>
              <div className="modal-container">
                  <div className="modal-cell">
                      <div className="modal-element" style={state.displayForm ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
                          <div className="modal-title">
                              <h2>Hello!</h2>
                              <div>Use your email or another service to continue with Table Bank.</div>
                          </div>
                          <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => openForm(undefined, false)}>
                              <RiCloseLine />
                          </a>
                          <div className="modal-body">
                              <a className="btn btn--m btn--grey btn--with-icon btn--with-icon-center _m-b-2">
                                  <i><FaGoogle /></i>
                                  <span>Continue with Google</span>
                              </a>
                              <a className="btn btn--m btn--grey btn--with-icon btn--with-icon-center _m-b-2">
                                  <i><FaApple style={{fontSize: '2rem'}}/></i>
                                  <span>Continue with Apple</span>
                              </a>
                              <a className="btn btn--m btn--primary" onClick={() => {openForm(state.status, false)}}>
                                  <span>Continue with email</span>
                              </a>
                              <div className="small-text _m-t-3">
                                  By continuing, you agree to our <a className="link link--black">Terms of service</a>.
                                  <br />
                                  Read our <a className="link link--black">Privacy policy</a>.
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* <section className="user-form">
              <header>
                  <button onClick={handleChangePage}> SignUp</button>
          <button onClick={handleChangePage}>
              Login
          </button>
          {isLogin ? <Login /> : <SignUp />}
              </header>
          </section> */}
      </>
  );
}