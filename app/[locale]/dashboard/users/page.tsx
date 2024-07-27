import UsersList from "@/components/Users/UsersList";
import React, { Suspense } from "react";
import UsersSkeleton from "@/components/Users/UsersSkeleton";

const UsersPage = ({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: {
    query: string;
    page: string;
  };
}) => {
  return (
    <div className="py-2 px-5">
      <Suspense fallback={<UsersSkeleton />}>
        <UsersList locale={locale} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
