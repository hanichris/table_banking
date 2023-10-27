import { useAsyncValue } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

import { I404, IUser } from "../interfaces";
import UserExcerpt from "./UserExcerpt";

export default function Users({ clear }: {clear: () => void}) {
  const users = useAsyncValue() as Array<IUser> | IUser | I404;
  if (Array.isArray(users)) {
    return (
      users.map((user) => (
      <UserExcerpt key={user.id} user={user}/>
      ))
    );
  }
  if ("detail" in users) {
    return (
      <tr>
        <td className="no-results">
          <div className="no-results__container">
            <div>
              <HiOutlineMagnifyingGlass />
              <span>No user found.</span>
              <a className="link link--primary" onClick={clear}>
                Clear filters
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <UserExcerpt user={users}/>
  );
}