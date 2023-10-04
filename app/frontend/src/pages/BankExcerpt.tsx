import { Link } from "react-router-dom";

import { selectUserBankById } from "../store/main/selectors";
import { useAppSelector } from "../hooks";


export default function BankExcerpt({ bankId }: {bankId: string}) {
  const bank = useAppSelector(state => selectUserBankById(state, bankId));

  console.log(typeof bank.loaned_out_amount);

  return (
    <article className="bank-card">
      <header className="bank-card__title">
        <h3 className="bank-name">{bank.title}</h3>
      </header>
      <div className="bank-card__body">
        <div data-label="Amount"></div>
        <div className="bank-card__amount">{+(bank.amount) === 0 ? 'Ksh. 0.00': `Ksh. ${bank.amount}`}</div>
        <Link to={`${bank.id}`}> ...</Link>
      </div>
    </article>
  );
}