import initTranslations from "@/app/i18n";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/lib/actions";
import moment from "jalali-moment";
import CustomButton from "../NextUi/CustomButton";
import Link from "next/link";

const i18Namespaces = ["users"];

const UsersList = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18Namespaces);

  interface User {
    index: number;
    name: string;
    profile: string;
    email: string;
    created_at: string;
    status: string;
  }

  const users: { data?: User[] } = await getUsers();
  console.log("users", users);

  return (
    <div className="flex flex-col">
      <h1 className="py-10 font-bold text-2xl relative">{t("users_list")}</h1>

      <CustomButton
        color="success"
        className="w-[120px] text-white mb-5"
        size="md"
        radius="none"
        variant="shadow"
      >
        <Link href={"/dashboard/users/add"}>{t("add_user")}</Link>
      </CustomButton>

      <Table>
        <TableCaption>deefre rfrfg</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">{t("id")}</TableHead>
            <TableHead className="text-center">{t("profile")}</TableHead>
            <TableHead className="text-center">{t("name")}</TableHead>
            <TableHead className="text-center">{t("email")}</TableHead>
            <TableHead className="text-center">{t("status")}</TableHead>
            <TableHead className="text-center">{t("created_at")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data?.map((user: User, index: number) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
