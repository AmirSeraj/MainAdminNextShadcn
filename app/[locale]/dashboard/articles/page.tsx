import React, { Suspense } from "react";
import UsersSkeleton from "@/components/Users/UsersSkeleton";
import ArticlesList from "@/components/Articles/ArticlesList";

const ArticlePage = ({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  return (
    <div className="py-2 px-5">
      <Suspense fallback={<UsersSkeleton />}>
        <ArticlesList locale={locale} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ArticlePage;
