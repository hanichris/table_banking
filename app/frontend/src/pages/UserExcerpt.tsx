import { useState } from 'react';

import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

import { IUser } from "../interfaces";
import DeleteEntity from '../components/modals/DeleteEntityModal';

export default function UserExcerpt({ user }: {user: IUser}) {
  const [deleteBtn, setDeleteBtn] = useState(false);
  return (
    <tr>
      <td className="id_col">
        <Link to={`${user.id}`}>
          {user.id}
        </Link>
      </td>
      <td className="name_col">{user.full_name}</td>
      <td className="email_col">{user.email}</td>
      <td className="active_col">{user.is_active === true ? '✔' : '✘'}</td>
      <td className="admin_col">{user.is_superuser === true ? '✔' : '✘'}</td>
      <td className="edit_col">
        <Link to={`${user.id}/edit`}>
          <FiEdit2 style={{marginTop: '.5rem', fontSize: '1.8rem', stroke: '#08805b'}}/>
        </Link>
      </td>
      <td className="del_col">
        <a onClick={() => setDeleteBtn(true)}>
          <RiDeleteBin6Line style={{marginTop: '.5rem', fontSize: '1.8rem', fill: '#cd3e65'}}/>
        </a>
      </td>
      {deleteBtn && <DeleteEntity setOpen={setDeleteBtn} open={deleteBtn} entity={user} text='user'/>}
    </tr>
  );
}