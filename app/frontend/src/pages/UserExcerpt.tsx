import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";

import { IUser } from "../interfaces";

export default function UserExcerpt({ user }: {user: IUser}) {
  return (
    <tr>
      <td className="id_col">{user.id}</td>
      <td className="name_col">{user.full_name}</td>
      <td className="email_col">{user.email}</td>
      <td className="active_col">{user.is_active === true ? '✔' : '✘'}</td>
      <td className="admin_col">{user.is_superuser === true ? '✔' : '✘'}</td>
      <td className="edit_col">
        <a>
          <FiEdit2 style={{marginTop: '.5rem', fontSize: '1.8rem', stroke: '#08805b'}}/>
        </a>
      </td>
      <td className="del_col">
        <RiDeleteBin6Line style={{marginTop: '.5rem', fontSize: '1.8rem', fill: '#cd3e65'}}/>
      </td>
    </tr>
  );
}