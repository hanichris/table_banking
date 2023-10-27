import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import React, { useRef, useState } from "react";
import { BiPlus } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';

// import { useAppSelector } from "../hooks";
// import { selectAllUserBankIds } from "../store/main/selectors";
import BankExcerpt from "./BankExcerpt";
import { IBank } from "../interfaces";
import NewBank from "../components/modals/NewBankModal";


type BankData = {
  banks: Array<string> | Array<IBank>,
  q: string | null,
}

export default function BanksList() {
  const [search, setSearch] = useState('');
  const [hasSearch, setHasSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const banks = useAppSelector(selectAllUserBankIds);
  const { banks, q } = useLoaderData() as BankData  ;
  const submit = useSubmit();
  const navigate = useNavigate();

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
    if (hasSearch) {
      setHasSearch(false);
    }
    setSearch('');
    if (inputRef.current) {
      inputRef.current.value = ''; 
    }
    navigate('.');
  }

  const handleSearchBtnClick = () => {
    setHasSearch(true);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus()
    }, 5)
  }

  return (
    <div id="dashboard_bank-listings" className={hasSearch == true ? "has-search": undefined}>
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
              onBlur={(e) => {
                if (search.length > 0) {
                  const isFirstSearch = q == null;
                  submit(e.currentTarget.form, {
                    replace: !isFirstSearch,
                  }) 
                }
                if (hasSearch && search.length === 0) {
                  setHasSearch(false);
                }
              }}
              />
              <span className="input-search__search-btn">
                <FiSearch />
              </span>
              <span className="input-search__clear-search" onClick={clearSearch}>
                <GiCancel />
              </span>
            </Form>
          </div>
          <button id='mobile__search-btn' className="btn btn--s btn--icon btn--secondary" onClick={handleSearchBtnClick}>
            <i className="icon">
              <FiSearch />
            </i>
          </button>
          <button id='banklist-new_bank-btn' className="btn btn--s btn--secondary" onClick={()=> setOpen(true)}>
            <span>New</span>
            <BiPlus />
          </button>
          <button id='mobile__new-btn' className="btn btn--s btn--icon btn--secondary" onClick={()=> setOpen(true)}>
            <i className="icon">
              <BiPlus />
            </i>
          </button>
        </div>
      </header>
      <div className="bank-listings__body">
        {banks.length === 0 ?
        (<div className="bank-listings_content_none">
          <p>No banks have been joined</p>
        </div>): <div className="bank-listings_content_results">{content}</div>}
      </div>
      {open && <NewBank setOpen={setOpen} open={open} title="Save"/>}
    </div>
  );
}