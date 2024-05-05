"use server";

import { AddUserSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import { getSession } from "../getSession";

/**PATH */
const sanctum_path =
  process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "sanctum/csrf-cookie";
const add_user_path = process.env.NEXT_PUBLIC_APP_URL_API + "manager/users";
/**PATH */

/**add user */
export const addUser: (values: z.infer<typeof AddUserSchema>) => Promise<{
  error: string | false;
  success: string | false;
}> = async (values: z.infer<typeof RegisterSchema>) => {
  ///data validation
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials!", success: false };
  }

  /**session */
  const session = await getSession();

  //destructuring data
  const { name, password, email } = validatedFields.data;

  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
    });

    if (csrf_response.ok) {
      try {
        /**register user */
        const res = await fetch(add_user_path, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
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
