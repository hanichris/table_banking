import { RiCloseLine } from "react-icons/ri";
import { StateEntityProp } from "../../interfaces";


export default function NewUser({setOpen, open, title}: StateEntityProp) {
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
            <form action="" method="post">
              <div className="modal-body">
                <div className="input-group">
                  <label htmlFor="new-user--email">Email</label>
                  <input
                  autoFocus
                  id="new-user--email"
                  type="text"
                  name="user_email"
                  placeholder="john@email.com"
                  required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="new-user--password">Password</label>
                  <input
                  id="new-user--password"
                  type="password"
                  name="user_pwd"
                  placeholder="password"
                  required
                  />
                </div>
                <div className="input-group admin-input _m-b-0">
                  <div>
                    <label htmlFor="new-user--isAdmin">Admin</label>
                    <input
                      id="new-user--isAdmin"
                      type="checkbox"
                      name="is_superuser"
                      value='true'
                    />
                  </div>
                  <input type="hidden" name='not_superuser' value='false' />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn--m btn--primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}