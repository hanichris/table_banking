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
        <Suspense fallback={<p>Loading users table...</p>}>
          <Await
            resolve={users.data}
            errorElement={<p>Error loading users!</p>}>
              <Users />
            </Await>
        </Suspense>
      </div>
    </div>
  );
}