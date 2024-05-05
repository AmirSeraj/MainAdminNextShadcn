'use server'

import { getSession } from "../getSession";

/***PATH */
const path = process.env.NEXT_PUBLIC_APP_URL_API + "user";

/**fetch user */
export const LoggedInUser = async (token: string | undefined) => {
  try {
    const session = await getSession();
    const response = await fetch(path, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();
    session.user = user;
    await session.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};
