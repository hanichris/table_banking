import Avatar from "react-avatar";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import { getName } from "./lib";
import { IUser } from "../interfaces";


export default function AdminViewUser() {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div>
        <div className="container container--s">
          <a onClick={() => navigate(-1)}><IoChevronBack /></a>
          <div id="profile_info">
            <div className="avatar avatar--l _m-b-4" id="header_profile_avatar">
              <Avatar name={getName(user.full_name, user.email)} round={true} size="140" />
            </div>
            <h2 className="user-info">{getName(user.full_name, user.email)}</h2>
          </div>
        </div>
        <div className="user-profile__details">

        </div>
        <div id="profile_banks" className="container container--xl">
          <div id="profile_banks_no-results">
            <p>No memberships yet.</p>
          </div>
          {/* <div id="profile_banks_results" className="bank-listings_content_results">
            {}
          </div> */}
        </div>
      </div>
    </div>
  );
}