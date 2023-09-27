import { Link, Outlet } from 'react-router-dom';

import './dashboard.css'


export default function Dashboard() {
  return (
    <section className='dashboard'>
      <aside className='dashboard--sidebar'>
        <nav className='dashboard--sidebar_nav'>
          <ul>
            <li><Link to='/dashboard/banks'>Banks</Link></li>
            <li><Link to='/dashboard/account'>Account</Link></li>
            <li><Link to='/dashboard/profile'>Profile</Link></li>
          </ul>
        </nav>
      </aside>
      <main className='dashboard_content'>
        <Outlet />
      </main>
    </section>
  );
}