"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { getSession } from "@/lib/actions/getSession";
import { redirect } from "next/navigation";
import { FormSchema } from "./FormSchema";

/**PATH */
const sanctum_path = process.env.NEXT_APP_URL + "sanctum/csrf-cookie";
const login_path = process.env.NEXT_APP_URL + "api/auth/login";
/**PATH */

/**login */
export const submitForm: (values: z.infer<typeof FormSchema>) => Promise<{
  error: string | false;
  success: string | false;
  // isLoading: false;
}> = async (values: z.infer<typeof LoginSchema>) => {
  ///data validation
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials!", success: false };
  }

  /**session */
  const session = await getSession();

  //destructuring data
  const { password, email } = validatedFields.data;

  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
    });

    if (csrf_response.ok) {
      try {
        /**login user */
        const res = await fetch(login_path, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const response = await res.json();
        console.log("ress", response);

        if (response.status === "error") {
          return {
            error: response.message,
            success: false,
          }
        }

        if (response.status === "success") {
          session.token = response.token;
          session.isLoggedIn = true;
          await session.save();
        }

        if (session.isLoggedIn) {
          await LoggedInUser(session.token);
        }
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
  if (session.isLoggedIn) {
    redirect("/dashboard");
  }
};
