'use server'

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { getSession } from "../getSession";

/**PATH */
const sanctum_path = process.env.NEXT_APP_URL + "sanctum/csrf-cookie";
const register_path = process.env.NEXT_APP_URL + "api/auth/register";
/**PATH */

/**register user */
export const register: (values: z.infer<typeof RegisterSchema>) => Promise<{
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
  const { name, password, confirmPassword, email } = validatedFields.data;

  /** returning error */
  if (password !== confirmPassword) {
    return {
      error: "Password and ConfirmPassword do not match!",
      success: false,
    };
  }

  try {
    //CSRF Token
    const csrf_response = await fetch(
      // process.env.NEXT_APP_URL + "sanctum/csrf-cookie",
      sanctum_path,
      {
        method: "GET",
        credentials: "include", //Include credentials for cross-origin requests
      }
    );

    if (csrf_response.ok) {
      try {
        /**register user */
        const res = await fetch(
          // process.env.NEXT_APP_URL + "api/auth/register",
          register_path,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: name,
            }),
          }
        );
        const response = await res.json();
        session.token = response.token;
        // session.isLoggedIn = true;
        // todo: when user register an email sent. question:user can not login? yes? if not this is not true:
        //session.isLoggedIn = true; Email sent but not redirect to any where? yes?
        await session.save();
        return {
          success: "Activation E-mail sent, check your E-mail!",
          error: false,
        };
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
