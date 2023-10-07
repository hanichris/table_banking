import { Form, useLoaderData } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import React, { useRef, useState } from "react";
import { BiPlus } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';

// import { useAppSelector } from "../hooks";
// import { selectAllUserBankIds } from "../store/main/selectors";
import BankExcerpt from "./BankExcerpt";
import { IBank } from "../interfaces";


type BankData = {
  banks: Array<string> | Array<IBank>,
  q: string | null,
}

export default function BanksList() {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // const banks = useAppSelector(selectAllUserBankIds);
  const { banks, q } = useLoaderData() as BankData  ;
  // const submit = useSubmit();

  const content = banks.map((bank) => {
    if (typeof bank === "string") {
      return <BankExcerpt key={bank} bankId={bank} />
    }
    const bankId = String(bank.id);
    return <BankExcerpt key={bankId} bankId={bankId}/>
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch('');
    if (inputRef.current) {
      inputRef.current.value = ''; 
    }
  }

  return (
    <div id="dashboard_bank-listings">
      <header className="bank-listings__top">
        <h2 className="bank-listings__title">Bank Listings</h2>
        <div className="bank-listings__filters">
          <div className="bank-listings__search">
            <Form id="search-form" role="search">
              <input
              ref={inputRef}
              id="q"
              placeholder="Search name"
              name="q"
              type="search" 
              defaultValue={q || search}
              onChange={handleSearchChange}
              />
              <span className="input-search__search-btn">
                <FiSearch />
              </span>
              <span className="input-search__clear-search" onClick={clearSearch}>
                <GiCancel />
              </span>
            </Form>
          </div>
          <button id='mobile__search-btn' className="btn btn--s btn--icon btn--secondary">
            <i className="icon">
              <FiSearch />
            </i>
          </button>
          <button id='banklist-new_bank-btn' className="btn btn--s btn--secondary">
            <span>New</span>
              <BiPlus />
          </button>
          <button id='mobile__new-btn' className="btn btn--s btn--icon btn--secondary">
            <i className="icon">
              <BiPlus />
            </i>
          </button>
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