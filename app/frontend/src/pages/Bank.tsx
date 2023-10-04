import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5';

import { useAppSelector } from "../hooks";
import { selectUserBankById } from "../store/main/selectors";

export default function Bank() {
  const navigate = useNavigate();
  const params = useParams();
  const bank = useAppSelector(state => selectUserBankById(state, params.bankId as string));

  return (
    <section id="bank-page">
      <a onClick={() => navigate(-1)}><IoChevronBack /></a>
      <header className="bank-page__top">
        <h2 className="bank-page__title">
          {bank.title}
        </h2>
      </header>
      <div className="bank-page__body"></div>
    </section>
  )
}