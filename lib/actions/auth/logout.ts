'use server'
import { redirect } from "next/navigation";
import { getSession } from "../getSession";


/**logout */
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
