import { IoChevronBack } from "react-icons/io5";
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteEntity from "../components/modals/DeleteEntityModal";
import { IBank } from "../interfaces";


export default function AdminViewBank() {
  const [deleteBtn, setDeleteBtn] = useState(false);
  const bank = useLoaderData() as IBank;
  const navigate = useNavigate();

  return (
    <section className="wrapper bank-page__wrapper">
      <div className="container container--xxl">
        <a onClick={() => navigate(-1)}><IoChevronBack /></a>
        <div id="bank-page__top">
          <header className="bank-page__header">
            <h1 className="bank-page__title">
              {bank.title}
            </h1>
          </header>
          <div className="btn-compound">
            <button className="btn btn--xs btn--secondary" onClick={() => navigate('edit')}>
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

            </div>
          </section>
        </div>
      </div>
      {deleteBtn && <DeleteEntity setOpen={setDeleteBtn} open={deleteBtn} entity={bank} text="bank"/>}
    </section>
  );
}