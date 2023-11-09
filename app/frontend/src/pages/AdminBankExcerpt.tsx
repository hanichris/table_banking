import { useState } from 'react';

import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

import { IBank } from "../interfaces";
import DeleteEntity from '../components/modals/DeleteEntityModal';

export default function AdminBankExcerpt({ bank }: {bank: IBank}) {
  const [deleteBtn, setDeleteBtn] = useState(false);

  return (
    <tr>
      <td className="id_col">
        <Link to={`${bank.id}`}>
          {bank.id}
        </Link>
      </td>
      <td className="name_col">{bank.admin_id}</td>
      <td className="email_col">{bank.title}</td>
      <td className="active_col">{bank.amount}</td>
      <td className="admin_col">{bank.interest_rate}</td>
      <td className="edit_col">
        <Link to={`${bank.id}/edit`}>
          <FiEdit2 style={{marginTop: '.5rem', fontSize: '1.8rem', stroke: '#08805b'}}/>
        </Link>
      </td>
      <td className="del_col">
        <a onClick={() => setDeleteBtn(true)}>
          <RiDeleteBin6Line style={{marginTop: '.5rem', fontSize: '1.8rem', fill: '#cd3e65'}}/>
        </a>
      </td>
      {deleteBtn && <td style={{position: 'fixed', top: '0', left:'0'}}><DeleteEntity setOpen={setDeleteBtn} open={deleteBtn} entity={bank} text='bank'/></td>}
    </tr>
  );
}