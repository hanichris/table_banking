import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { badRequest } from "./utils/request.server";

import NavBar from "./components/navbar/NavBar.client";
import Header from "./components/navbar/Header";

import stylesUrl from "./styles/index.css?url";
import navStyleUrl from "./styles/navbar.css?url";

// eslint-disable-next-line import/no-unresolved
import tableBankFaviconUrl from "/table-bank-website-favicon-color.webp?url";

export const links: LinksFunction = () => [
  { rel: "icon", href: tableBankFaviconUrl },
  { rel: "stylesheet", href: stylesUrl },
  { rel: "stylesheet", href: navStyleUrl },
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


function validateEmail(email: string) {
  const re = /[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-])*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}/;
  if (email.length > 55 || !re.test(email)) {
    return "Invalid email provided";
  }
}

function validateePassword(password: string) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!re.test(password)) {
    return `Password must have a minimum of eight characters,
    at least one uppercase letter, one lowercase letter,
    a number and one special character`;
  }
}


export const action = async ({
  request
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authType = formData.get("auth");
  if (authType === "login") {
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      return badRequest({
        fieldErrors: null,
        fields: null,
        formError: "Form not submitted correctly",
      });
    }

    const fields = { username, password };
    const fieldErrors = {
      username: validateEmail(username),
      password: validateePassword(password),
    }

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
        formError: null,
      });
    }
  }
  return null;
}