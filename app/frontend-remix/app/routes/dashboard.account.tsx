import { LinksFunction } from "@remix-run/node";
import { useState } from "react";


// eslint-disable-next-line import/no-unresolved
import accountStyleUrl from "~/styles/account.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: accountStyleUrl },
];


export default function Account() {
  const [active, setActive] = useState("general");

  const handleClick = (
    link: string
  ) => setActive(link);

  return (
    <div className="wrapper wrapper--align-top">
      <div>
        <header className="container container--s">
          <div className="page-title">
            <h1 className="page-title__header">Account</h1>
            <p className="page-title__subheader">Update your profile and set your account preferences</p>
          </div>
        </header>
        <div className="container container--xl">
          <div className="account-content">
            <aside className="account-content--sidebar">
              <div className="sidebar">
                <nav>
                  <ul>
                    <li><a className={active === "general" ?
                      "link link--black is-active" :
                      "link link--black"} onClick={() => handleClick("general")}>General</a></li>
                    <li><a className={active === "delete" ?
                      "link link--black is-active" :
                      "link link--black"} onClick={() => handleClick("delete")}>Delete account</a></li>
                  </ul>
                </nav>
              </div>
            </aside>
            <div className="account-content--details">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}