import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { CiBank } from 'react-icons/ci';

import homeStyles from "../styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Table Banking App" },
    { name: "description", content: "Welcome to the future!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
];

export default function Index() {
  return (
    <div className='wrapper page-wrapper'>
      <div className='container'>
        <section className='landing-page'>
          <div>
            <CiBank className='bank-logo'/>
          </div>
          <h2> Welcome to your future of table banking</h2>
        </section>
      </div>
    </div>
  );
}
