'use server'

import { getSession } from "../getSession";

/***PATH */
const path = process.env.NEXT_PUBLIC_APP_URL_API + "/user/";

/**fetch user */
export const UserInfo = async (id : number) => {
  try {
    const session = await getSession();
    const response = await fetch(path + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
