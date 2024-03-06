import { RiCloseLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";

import { IModalProp } from "~/interfaces";


export default function UserForm({ toggleForm, state }: IModalProp) {
  return (
    <section className="modal" style={state.isRendered ? {display: "block"}: {display: "none"}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element" style={state.isRendered ? {position: "relative", opacity: "1", transform: "translate3d(0, 0, 0) scale(1)"} : {}}>
            <div className="modal-title">
              <h2>Hello!</h2>
              <div>Use your email or another service to continue with Table Bank.</div>
            </div>
            <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => toggleForm(undefined, false)}>
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
              <a className="btn btn--m btn--primary" onClick={() => toggleForm(state.status, false)}>
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
  );
}