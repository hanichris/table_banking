import React, { Suspense, useState, useRef} from "react";
import { Await, useLoaderData, Form, useSubmit, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

import { IData } from "../interfaces";
import Users from "./Users";
import UsersSkeleton from "../components/skeletons/UsersSkeleton";


export default function UsersListing() {
  const [search, setSearch] = useState('');
  const [hasSearch, setHasSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useSubmit();
  const navigate = useNavigate();
  const users = useLoaderData() as IData;

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div id="users-listing" className={hasSearch === true ? 'has-search': undefined}>
      <header className="users-listing__top">
        <h2 className="users-listing__title">
          Users
        </h2>
        <div className="users-listing__filters">
          <div className="users-listing__search">
            <Form id='search-form' role="search">
              <input
                ref={inputRef}
                type="search"
                name="id"
                placeholder="Search user id"
                defaultValue={users.userID || search}
                onChange={handleSearchChange}
                onBlur={(e) => {
                  if (search.length > 0) {
                    submit(e.currentTarget.form, {
                      replace: true,
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
          <button id='banklist-new_bank-btn' className="btn btn--s btn--secondary">
            <span>New</span>
            <BiPlus />
          </button>
          <button id='mobile__search-btn' className="btn btn--s btn--icon btn--secondary">
            <i className="icon">
              <FiSearch />
            </i>
          </button>
          <button id='mobile__new-btn' className="btn btn--s btn--icon btn--secondary">
            <i className="icon">
              <BiPlus />
            </i>
          </button>
        </div>
      </header>
      <div className="users-listing__body">
        <table>
          <thead>
            <tr>
              <th className="id_col">ID</th>
              <th className="name_col">Name</th>
              <th className="email_col">Email</th>
              <th className="active_col">Active</th>
              <th className="admin_col">Admin</th>
              <th className="edit_col">Edit</th>
              <th className="del_col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<UsersSkeleton />}>
              <Await
                resolve={users.data}
                errorElement={<tr><td>Error loading users!!!</td></tr>}>
                  <Users />
                </Await>
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}