import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { CiBank } from 'react-icons/ci';

import { getSession } from "../utils/session.server";

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

export const loader = async ({
  request
}: LoaderFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("token")) {
    return redirect("dashboard");
  }
  return null;
}

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
