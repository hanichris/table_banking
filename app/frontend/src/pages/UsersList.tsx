import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { IData } from "../interfaces";
import Users from "./Users";

export default function UsersListing() {
  // const [search, setSearch] = useState('');
  const users = useLoaderData() as IData;
  return (
    <div id="users-listing">
      <header className="users-listing__top">
        <h2 className="users-listing__title">
          Users
        </h2>
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
            <Suspense fallback={<p>Loading users table...</p>}>
              <Await
                resolve={users.data}
                errorElement={<p>Error loading users!</p>}>
                  <Users />
                </Await>
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}