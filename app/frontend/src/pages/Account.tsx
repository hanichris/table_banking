import { useState } from 'react';
import { Delete } from '../components/DeleteAccount';
import { General } from '../components/GeneralAccount';
import './account.css'

export default function Account() {
  const [active, setActive] = useState('general');
  
  function handleClick(link:string) {
    setActive(link);
  }
  return (
    <div className="wrapper wrapper--align-top">
      <div>
        <header className='container container--s'>
          <div className='page-title'>
            <h1 className='page-title__header'>Account</h1>
            <p className='page_title__subheader'>Update your profile and set your account preferences</p>
          </div>
        </header>
        <div className='container container--xl'>
          <div className='account-content'>
            <aside className='account-content--sidebar'>
              <div className='sidebar'>
                <nav>
                  <ul>
                    <li><a className={active === 'general' ? 'link link--black is-active' : 'link link--black'} onClick={() => handleClick('general')}>General</a></li>
                    <li><a className={active === 'delete' ? 'link link--black is-active' : 'link link--black'} onClick={() => handleClick('delete')}>Delete</a></li>
                  </ul>
                </nav>
              </div>
            </aside>
            <div className='account-content--details'>
              {active === 'general' ? <General /> : null}
              {active === 'delete' ? <Delete /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}