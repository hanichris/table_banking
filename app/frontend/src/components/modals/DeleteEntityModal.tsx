import { useFetcher, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { DeleteEntityProp } from "../../interfaces";

export default function DeleteEntity({setOpen, open, entity, text}: DeleteEntityProp) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleDeleteBtnClick = () => {
    fetcher.submit({}, {
      method: 'DELETE',
      action: `${entity.id}/destroy`
    });
    setOpen(false);
    navigate('.');
  }

  return (
    <section className="modal" id="confirm" style={open ? {display: 'block'} : {}}>
      <div className="modal-container">
        <div className="modal-cell">
          <div className="modal-element" style={open ? {position:'relative', transform: 'translate3d(0, 0, 0) scale(1)', opacity:'1'}: {}}>
            <header className="modal-header">
              <div className="modal-header__title">Delete {text}</div>
              <a className="modal_button-left btn btn--icon btn--xs btn--transparent" onClick={() => setOpen(false)}>
                <RiCloseLine />
              </a>
            </header>
            <div className="modal-body" id="confirm-text">
              <div>Do you really want to delete this {text}?</div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-btns">
                <button type="button" className="btn btn--m btn--secondary" onClick={() => setOpen(false)}>
                  <span>Cancel</span>
                </button>
                <button type="button" className="btn btn--m btn--danger" onClick={handleDeleteBtnClick}>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}