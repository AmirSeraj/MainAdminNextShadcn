"use server";

import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./authConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";

/******* URL PATH *******/
const sanctum_path = process.env.NEXT_APP_URL + "sanctum/csrf-cookie";
const login_path = process.env.NEXT_APP_URL + "api/auth/login";
const register_path = process.env.NEXT_APP_URL + "api/auth/register";
const fetchUserByToken_path = process.env.NEXT_APP_URL + "api/user";
/******* PATH *******/

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

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
        //session.isLoggedIn = true; Emial sent but not redirect to any where? yes?
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

export const fetchLoggedInUser = async (token: string | undefined) => {
  try {
    const session = await getSession();
    const response = await fetch(fetchUserByToken_path, {
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

export const login: (values: z.infer<typeof LoginSchema>) => Promise<{
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

        if (response.status === "success") {
          session.token = response.token;
          session.isLoggedIn = true;
          await session.save();
        }

        if (session.isLoggedIn) {
          await fetchLoggedInUser(session.token);
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

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
