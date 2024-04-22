"use server";

import { getSession } from "../getSession";

/**PATH */
const sanctum_path = process.env.NEXT_APP_URL + "sanctum/csrf-cookie";
const path = process.env.NEXT_APP_URL + "api/manager/users?page=";
/**PATH */

/**get users */
export const getUsers = async ({ page }: { page: number }) => {
  const session = await getSession();
  const token = session.token;

  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
    });

    if (csrf_response.ok) {
      try {
        const res = await fetch(path + page, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        return response;
      } catch (error) {
        console.log("error2", error);
        return {
          error: "Something Wrong, try again!",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: "Something Wrong, try again!",
      success: false,
    };
  }
};
