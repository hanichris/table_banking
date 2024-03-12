import { LinksFunction } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { AiOutlineBank, AiOutlineProfile, AiOutlineUser } from 'react-icons/ai';

// eslint-disable-next-line import/no-unresolved
import dashboardStyleUrl from "~/styles/dashboard.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: dashboardStyleUrl },
];

export default function Dashboard() {
  return (
    <section className="dashboard">
      <aside className="dashboard--sidebar">
        <nav className="dashboard--sidebar_nav">
          <ul className="dashboard--sidebar_nav_group">
            <li>
              <NavLink to="./banks">
                <AiOutlineBank className="icon--dashboard" />
                <div data-label="Banks"></div>
              </NavLink>
            </li>
            <li>
              <NavLink to="./account">
                <AiOutlineUser className="icon--dashboard" />
                <div data-label="Account"></div>
              </NavLink>
            </li>
            <li>
              <NavLink to="./profile">
                <AiOutlineProfile className="icon--dashboard" />
                <div data-label="Profile"></div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard_content">
        <Outlet />
      </main>
    </section>
  );
}