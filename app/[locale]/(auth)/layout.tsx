import { getSession } from "@/lib/actions";
import styles from "./auth.module.css";
import { redirect } from "next/navigation";
import clsx from "clsx";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/dashboard");
  }
  return (
    <div
      className={clsx(
        styles.container,
        "2xl:py-[80px] xl:py-[50px] lg:py-[30px] py-[15px] px-[15px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-400 from-0% to-blue-800 to-70%"
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
