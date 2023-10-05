import { useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUserBankById, selectUserToken } from "../store/main/selectors";
import { bankActions } from "../store/bank/actions";


export default function Bank() {
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
    <section id="bank-page">
      <a onClick={() => navigate(-1)}><IoChevronBack /></a>
      <header className="bank-page__top">
        <h2 className="bank-page__title">
          {userBank.title}
        </h2>
      </header>
      <div className="bank-page__body">
        <Link to={`../${userBank.id}/edit`} relative="path">Edit</Link>
        <button>Delete</button>
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
            <article>Admin: {userBank.admin_id}</article>
            <article>Members</article>
          </main>
        </section>
      </div>
    </section>
  )
}