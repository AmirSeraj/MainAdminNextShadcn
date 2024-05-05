"use server";

import { getSession } from "../getSession";

/**PATH */
const sanctum_path = process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "sanctum/csrf-cookie";
const path = process.env.NEXT_PUBLIC_APP_URL_API + "manager/articles?page=";
/**PATH */

/**get users */
export const getArticles = async (page: number) => {
  const session = await getSession();
  const token = session.token;

  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
      next: { revalidate: 10 },
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
        console.log('res',response);
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
