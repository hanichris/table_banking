import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  token: string,
};

type SessionFlashData = {
  error: string,
};

const sessionSecret = import.meta.env.VITE_SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "TableBank_session",
      secure: import.meta.env.VITE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60,
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };