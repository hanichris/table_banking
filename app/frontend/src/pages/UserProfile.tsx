import './user_profile.css'

export default function UserProfile() {
  return (
    <div className="wrapper" id="profile">
      <div>
        <div className="container container--s">
          <div id="profile_info">
            <div className='avatar avatar--l _m-b-4' id="header_profile_avatar">

            </div>
            <h2 className='user-info'>8tm6q8bjbp</h2>
          </div>
        </div>
        <div id="profile_banks" className="container container--xl">
          <div id='profile_banks_no-results'>
            <p>No memberships yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}