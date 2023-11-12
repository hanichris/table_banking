import Avatar from 'react-avatar';
import { useLoaderData } from 'react-router-dom';

import { Entity } from '../interfaces';
import './user_profile.css';
import BankExcerpt from './BankExcerpt';
import { getName } from './lib';


export default function UserProfile() {
  const user = useLoaderData() as Entity;

  const content = Object.keys(user.banks).map((id) => <BankExcerpt key={id} bankId={id} fromProfileView={true}/>);
  return (
    <div className="wrapper" id="profile">
      <div>
        <div className="container container--s">
          <div id="profile_info">
            <div className='avatar avatar--l _m-b-4' id="header_profile_avatar">
              <Avatar name={getName(user.details.full_name, user.details.email)} round={true} size='140'/>
            </div>
            <h2 className='user-info'>{getName(user.details.full_name, user.details.email)}</h2>
          </div>
        </div>
        <div id="profile_banks" className="container container--xl">
          {content.length === 0 ?
          <div id='profile_banks_no-results'>
            <p>No memberships yet.</p>
          </div> : 
          <div id='profile_banks_results' className='bank-listings_content_results'>
            {content}
          </div>
          }
        </div>
      </div>
    </div>
  );
}