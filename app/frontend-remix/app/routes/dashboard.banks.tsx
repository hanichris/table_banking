import { LinksFunction } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

// eslint-disable-next-line import/no-unresolved
import modalStyleUrl from "~/styles/modal.css?url";
// eslint-disable-next-line import/no-unresolved
import formModalStyleUrl from "~/styles/form.modal.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: modalStyleUrl},
  { rel: "stylesheet", href: formModalStyleUrl},
];


export default function Banks() {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [hasSearch, setHasSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setSearch(e.target.value);

  const clearSearch = () => {
    if (hasSearch) setHasSearch(false);
    setSearch("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const handleSearchBtnClick = () => {
    setHasSearch(true);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 5);
  }

  return (
    <div id="dashboard_bank-listings" className={hasSearch ? "has-search": ""}>
      <header className="bank-listings__top">
        <h2 className="bank-listings__title">
          Bank Listings
        </h2>
        <div className="bank-listings__filters">
          <div className="bank-listings__search">
            <Form id="search-form" role="search">
              <input
                ref={inputRef}
                type="search"
                id="q"
                placeholder="Search name"
                onChange={handleSearchChange}
                onBlur={(e) => {
                  if (search.length > 0) {
                    const isFirstSearch = q == null;
                    submit(e.currentTarget.form, {
                      replace: !isFirstSearch,
                    });
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
          <button id="mobile__search-btn" className="btn btn--s btn--icon btn--secondary" onClick={handleSearchBtnClick}>
            <i className="icon">
              <FiSearch />
            </i>
          </button>
          <button id="banklist-new_bank-btn" className="btn btn--s btn--secondary" onClick={() => setOpen(true)}>
            <span>New</span>
            <BiPlus />
          </button>
          <button id="mobile__new-btn" className="btn btn--s btn--icon btn--secondary" onClick={() => setOpen(true)}>
            <i className="icon">
              <BiPlus />
            </i>
          </button>
        </div>
      </header>
      <div className="bank-listings__body">
        <div className="bank-listings_content_none">
          <p>No banks have been joined</p>
        </div>
      </div>
    </div>
  );
}