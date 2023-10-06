import { Form } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';

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
        <div className="bank-listings__filters">
          <div className="bank-listings__search">
            <Form id="search-form" role="search">
              <input
              id="q"
              placeholder="Search name"
              name="q"
              type="search" />
              <span className="input-search__search-btn">
                <i className="icon"></i>
              </span>
            </Form>
          </div>
          <button id='mobile__search-btn' className="btn btn--s btn--icon btn--secondary">
            <i className="icon">
              <FiSearch />
            </i>
          </button>
          <button className="btn btn--s btn--icon btn--secondary">+</button>
        </div>
      </header>
      <div className="bank-listings__body">
        {banks.length === 0 ? <div className="bank-listings_content_none">
          <p>No banks have been joined</p>
        </div>: <div className="bank-listings_content_results">{content}</div>}
      </div>
    </div>
  );
}