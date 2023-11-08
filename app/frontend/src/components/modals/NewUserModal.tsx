import { useFetcher } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { StateEntityProp } from "../../interfaces";
import { Spinner } from "../Spinner";


export default function NewUser({setOpen, open, title}: StateEntityProp) {
  const fetcher = useFetcher();
  
  const isLoading = fetcher.state === 'submitting';

  return (
    <section className="modal" style={open ? {display: 'block'} : {}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element" style={open ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
            <header className="modal-header">
              <div className="modal-header__title">{title} user</div>
              <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => setOpen(false)}>
                <RiCloseLine />
              </a>
            </header>
            <fetcher.Form method="post">
              <div className="modal-body">
                <div className="input-group">
                  <label htmlFor="new-user--email">Email</label>
                  <input
                  autoFocus
                  id="new-user--email"
                  type="text"
                  name="email"
                  placeholder="john@email.com"
                  disabled={isLoading}
                  className={isLoading ? 'disabled': ''}
                  required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="new-user--password">Password</label>
                  <input
                  id="new-user--password"
                  type="password"
                  name="password"
                  placeholder="password"
                  disabled={isLoading}
                  className={isLoading ? 'disabled': ''}
                  required
                  />
                </div>
                <div className="input-group" style={{marginBottom: '0'}}>
                  <div className="form-group">
                    <label id="new_user__admin-label">Admin</label>
                    <div className="form-group__radio-btns">
                      <input
                        type="radio"
                        name="is_superuser"
                        id="is_superuser_yes" />
                      <label htmlFor="is_superuser_yes">Yes</label>
                      <input
                        type="radio"
                        name="is_superuser"
                        id="is_superuser_no"
                        defaultChecked/>
                      <label htmlFor="is_superuser_no">No</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className={isLoading ? "btn btn--m btn--primary is-disabled": "btn btn--m btn--primary"} disabled={isLoading}>
                  Save
                  {isLoading && <Spinner />}
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </section>
  );
}