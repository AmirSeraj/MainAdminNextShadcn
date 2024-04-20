import { MdDashboard, MdSupervisedUserCircle, MdArticle, MdGroups } from "react-icons/md";
import { ImProfile } from "react-icons/im";

export const MenuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Articles",
        path: "/dashboard/articles",
        icon: <MdArticle />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdGroups />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <ImProfile />,
      },
    ],
  },
];
