import { RiCloseLine } from "react-icons/ri";
import { StateEntityProp } from "../../interfaces";

export default function NewBank({setOpen, open, title}: StateEntityProp) {
  return (
    <section className="modal" style={open ? {display: 'block'} : {}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element" style={open ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
            <header className="modal-header">
              <div className="modal-header__title">{title} bank</div>
              <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => setOpen(false)}>
                <RiCloseLine />
              </a>
            </header>
            <form action="" method="post">
              <div className="modal-body">
                <div className="input-group">
                  <label htmlFor="new-bank--title">Title</label>
                  <input
                  autoFocus
                  id="new-bank--title"
                  type="text"
                  name="title"
                  placeholder="New bank title"/>
                </div>
                <div className="input-group _m-b-0">
                  <label htmlFor="new-bank--interest-rate">Interest rate</label>
                  <input
                  id="new-bank--interest-rate"
                  type="number"
                  name="interest_rate"
                  min={0}
                  max={0.1}
                  step={0.01}
                  defaultValue={0.00}
                  />
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