import { useAppSelector } from "../hooks";
import { selectAllUserBankIds } from "../store/main/selectors";
import BankExcerpt from "./BankExcerpt";

export default function BanksList() {
  const banks = useAppSelector(selectAllUserBankIds);

  const content = banks.map((bankId) => 
    <BankExcerpt key={bankId} bankId={bankId} />
  );

  return (
    <div id="dashboard_bank-listings">
      <header className="bank-listings__top">
        <h2 className="bank-listings__title">Bank Listings</h2>
      </header>
      <div className="bank-listings__body">
        {banks.length === 0 ? <div className="bank-listings_content_none">
          <p>No banks have been joined</p>
        </div>: <div className="bank-listings_content_results">{content}</div>}
      </div>
    </div>
  );
}