import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import NavBar from "./components/navbar/NavBar.client";
import Header from "./components/navbar/Header";

import stylesUrl from "./styles/index.css?url";
import navStyleUrl from "./styles/navbar.css?url";
import modalStyleUrl from "~/styles/modal.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
  { rel: "stylesheet", href: navStyleUrl },
  { rel: "stylesheet", href: modalStyleUrl },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <ClientOnly fallback={<Header />}>
        {() => <NavBar />}
      </ClientOnly>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
