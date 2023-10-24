import { NavLink, Outlet} from 'react-router-dom';
import { AiOutlineBank, AiOutlineUser } from 'react-icons/ai'


export default function AdminDashboard() {

  return (
    <section className='dashboard'>
      <aside className='dashboard--sidebar'>
        <nav className='dashboard--sidebar_nav'>
          <ul className='dashboard--sidebar_nav_group'>
            <li>
              <NavLink to='/admin/banks'>
                <AiOutlineBank className='icon--dashboard'/>
                <div data-label='Banks'></div>
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/users'>
                <AiOutlineUser className='icon--dashboard'/>
                <div data-label='Users'></div>
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