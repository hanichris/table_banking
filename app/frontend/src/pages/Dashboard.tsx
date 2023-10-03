import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { AiOutlineBank, AiOutlineProfile, AiOutlineUser } from 'react-icons/ai'

import './dashboard.css'
import { MainState } from '../store/main/state';


export default function Dashboard() {
  const user = useLoaderData() as MainState;

  user.entities


  return (
    <section className='dashboard'>
      <aside className='dashboard--sidebar'>
        <nav className='dashboard--sidebar_nav'>
          <ul className='dashboard--sidebar_nav_group'>
            <li>
              <NavLink to='/dashboard/banks'>
                <AiOutlineBank className='icon--dashboard'/>
                <div data-label='Banks'></div>
              </NavLink>
            </li>
            <li>
              <NavLink to='/dashboard/account'>
                <AiOutlineUser className='icon--dashboard'/>
                <div data-label='Account'></div>
              </NavLink>
            </li>
            <li>
              <NavLink to='/dashboard/profile'>
                <AiOutlineProfile className='icon--dashboard'/>
                <div data-label='Profile'></div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='dashboard_content'>
        <Outlet />
      </main>
    </section>
  );
}