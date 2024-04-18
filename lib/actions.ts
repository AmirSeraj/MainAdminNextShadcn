"use server";

import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./authConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/******* URL PATH *******/
const login_path = process.env.NEXT_APP_URL + "api/auth/login";
const register_path = process.env.NEXT_APP_URL + "api/auth/register";
const fetchUser_path = process.env.NEXT_APP_URL + "api/user";
/******* PATH *******/

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const register = async () => {};
export const login = async () => {};
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
