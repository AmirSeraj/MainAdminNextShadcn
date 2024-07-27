import initTranslations from "@/app/i18n";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "jalali-moment";
import CustomButton from "../NextUi/CustomButton";
import Link from "next/link";
import { getUsers } from "@/lib/actions/users/getUsers";
import { CustomPagination } from "../NextUi/CustomPagination";
import styles from "./styles.module.css";
import clsx from "clsx";

const i18Namespaces = ["users", "common"];

const UsersList = async ({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams: {
    query: string;
    page: string;
  };
}) => {
  const { t } = await initTranslations(locale, i18Namespaces);
  interface User {
    id: number;
    index: number;
    name: string;
    profile: string;
    email: string;
    created_at: string;
    status: string;
    current_page: number;
    last_page: number;
  }
  // interface UserList {
  //   users: User[];
  //   current_page: number;
  //   last_page: number;
  // }
  const users: { data: User[] } = await getUsers(parseInt(searchParams?.page));
  //@ts-ignore
  const current_page = parseInt(searchParams?.page) || parseInt(users?.current_page);

  return (
    <div className="flex flex-col">
      <h1 className="pb-5 pt-3 font-bold text-2xl relative">
        {t("users_list")}
      </h1>

      <CustomButton
        color="success"
        className="w-[120px] text-white mb-5"
        size="md"
        radius="none"
        variant="shadow"
      >
        <Link href={"/dashboard/users/add"}>{t("add_new_user")}</Link>
      </CustomButton>

      <div className={clsx(styles.container, "px-2")}>
        <Table>
          {/* <TableCaption>
          <CustomPagination totalPage={users?.total} />
        </TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">
                {t("common:id")}
              </TableHead>
              <TableHead className="text-center">{t("profile")}</TableHead>
              <TableHead className="text-center">{t("name")}</TableHead>
              <TableHead className="text-center">{t("email")}</TableHead>
              <TableHead className="text-center">{t("status")}</TableHead>
              <TableHead className="text-center">{t("created_at")}</TableHead>
              <TableHead className="text-center">
                {t("common:actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user: User, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Avatar>
                    {user?.profile ? (
                      <AvatarImage src={user?.profile} />
                    ) : (
                      <AvatarImage src="/images/user.jfif" />
                    )}
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-center">{user?.name}</TableCell>
                <TableCell className="text-center">{user?.email}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      user?.status === "pending"
                        ? "bg-orange-500"
                        : user?.status === "success | active"
                        ? "bg-green-500"
                        : user?.status === "ban"
                        ? "bg-black"
                        : "bg-red-500"
                    }
                  >
                    {user?.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {moment(user?.created_at).locale(locale).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/dashboard/users/${user?.id}`}>
                    <Badge className="bg-green-500">edit</Badge>
                  </Link>
                  <Badge className="bg-red-500 mx-1 cursor-pointer">
                    delete
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-5 items-center" dir="ltr">
        {
          //@ts-ignore
          users?.last_page > 1 && (
            <CustomPagination
              //@ts-ignore
              totalPage={users?.last_page}
              current_page={current_page}
            />
          )
        }
      </div>
    </div>
  );
};

export default UsersList;
