import UsersList from "@/components/Users/UsersList";
import React from "react";

const UsersPage = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <div className="py-2 px-5">
      <UsersList locale={locale} />
    </div>
  );
};

export default UsersPage;
