import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  return (
    <div className="">
      {/* sidebar */}
      <div>{/* <Sidebar /> */}</div>

      {/* content */}
      <div>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
