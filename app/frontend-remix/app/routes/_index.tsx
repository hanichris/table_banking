import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { CiBank } from 'react-icons/ci';

import homeStyles from "../styles/home.css?url";
import modalStyleUrl from "../styles/modal.css?url";
import formModalStyleUrl from "../styles/form.modal.css?url";
import spinnerStyleUrl from "../styles/spinner.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Table Banking App" },
    { name: "description", content: "Welcome to the future!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
  { rel: "stylesheet", href: modalStyleUrl },
  { rel: "stylesheet", href: formModalStyleUrl },
  { rel: "stylesheet", href: spinnerStyleUrl },
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
