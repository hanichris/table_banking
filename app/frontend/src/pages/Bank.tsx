import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";

import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUserBankById, selectUserToken } from "../store/main/selectors";
import { bankActions } from "../store/bank/actions";
import NewBank from "../components/modals/NewBankModal";
import DeleteBank from "../components/modals/DeleteBankModal";


export default function Bank() {
  const [open, setOpen] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const userBank = useAppSelector(state => selectUserBankById(state, params.bankId as string));
  const token = useAppSelector(selectUserToken);
  const bankId = useAppSelector(state => state.bank.id)

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (bankId !== userBank.id) {
      const arg = {token, id: userBank.id}
      dispatch(bankActions.getBank(arg))
    }
  }, [token, userBank, dispatch, bankId]);

  return (
    <section id="bank-page" className="wrapper bank-page__wrapper">
      <div className="container container--xxl">
        <a onClick={() => navigate(-1)}><IoChevronBack /></a>
        <div id="bank-page__top">
          <header className="bank-page__header">
            <h1 className="bank-page__title">
              {userBank.title}
            </h1>
          </header>
          <div className="btn-compound">
            <button className="btn btn--xs btn--secondary" onClick={() => setOpen(true)}>
              <FiEdit2 style={{marginRight: '1.4rem', fontSize: '1.8rem'}}/>
              <span>Edit</span>
            </button>
            <button className="btn btn--xs btn--danger" onClick={() => setDeleteBtn(true)}>
              <RiDeleteBin6Line style={{marginRight: '1.4rem', fontSize: '1.8rem'}}/>
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div className="bank-page__body">
          <section className="bank-page__details">
            <div className="bank-page__container">
              <div>
                <div data-label='Amount'></div>
                <div className="bank-page__amount">{+(userBank.amount) === 0 ? 'Ksh. 0.00' : ` Ksh. ${userBank.amount}`}</div>
              </div>
              <div>
                <div data-label='Loaned Out'></div>
                <div className="bank-page__loaned-amount">{+(userBank.loaned_out_amount) === 0 ? 'Ksh. 0.00' : ` Ksh. ${userBank.loaned_out_amount}`}</div>
              </div>
              <div>
                <div data-label='Interest Rate'></div>
                <div className="bank-page__interest-rate">{+(userBank.interest_rate) === 0 ? '0 %' : `${userBank.amount} %`}</div>
              </div>
            </div>
            <main>
              {/* <article>Admin: {userBank.admin_id}</article> */}
              <article>Members</article>
            </main>
          </section>
        </div>
      </div>
      {open && <NewBank setOpen={setOpen} open={open} title="Edit"/>}
      {deleteBtn && <DeleteBank setOpen={setDeleteBtn} open={deleteBtn}/>}
    </section>
  )
}