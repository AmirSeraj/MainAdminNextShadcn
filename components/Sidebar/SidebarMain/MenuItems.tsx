import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdArticle,
  MdGroups,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";

const MenuItems = (t) => {
  return [
    {
      title: t("pages"),
      list: [
        {
          title: t("dashboard"),
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: t("users"),
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: t("articles"),
          path: "/dashboard/articles",
          icon: <MdArticle />,
        },
      ],
    },
    {
      title: t("analytics"),
      list: [
        {
          title: t("teams"),
          path: "/dashboard/teams",
          icon: <MdGroups />,
        },
      ],
    },
    {
      title: t("user"),
      list: [
        {
          title: t("profile"),
          path: "/dashboard/profile",
          icon: <ImProfile />,
        },
      ],
    },
  ];
};

export default MenuItems;
