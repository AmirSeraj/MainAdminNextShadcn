"use server";

import { getSession } from "../getSession";

/**PATH */
const sanctum_path =
  process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "/sanctum/csrf-cookie";
const path = process.env.NEXT_PUBLIC_APP_URL_API + "/manager/users?page=";
/**PATH */

interface User {
  index: number;
  id: number;
  name: string;
  profile: string;
  email: string;
  created_at: string;
  status: string;
}

interface UsersResponse {
  data: User[];
  current_page: number;
  last_page: number;
  // Add other properties if needed
}

/**get users */
export const getUsers = async (page?: number) => {
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
