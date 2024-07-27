"use server";

import { getSession } from "../getSession";

/***PATH */
const path = process.env.NEXT_PUBLIC_APP_URL_API + "/user/edit/";

/**fetch user */
export const EditUser = async (values: {
  values: {
    email: string;
    name: string;
    status: string;
    id?: number;
  };
}) => {
  try {
    const session = await getSession();
    //@ts-ignore
    const response = await fetch(path + values?.id, {
      method: "POST",
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
