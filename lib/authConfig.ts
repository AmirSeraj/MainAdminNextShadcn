import { SessionOptions } from "iron-session";

export interface SessionData {
  user?: [];
  token?: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SECRET_KEY!,
  cookieName: "auth",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
