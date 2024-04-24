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
import { Badge } from "@/components/ui/badge";
import moment from "jalali-moment";
import CustomButton from "../NextUi/CustomButton";
import Link from "next/link";
import { CustomPagination } from "../NextUi/CustomPagination";
import styles from "./styles.module.css";
import clsx from "clsx";
import { getArticles } from "@/lib/actions/articles/getArticles";
import Image from "next/image";

const i18Namespaces = ["blog", "common"];

const ArticlesList = async ({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { t } = await initTranslations(locale, i18Namespaces);
  interface Article {
    index: number;
    id: number;
    author: string;
    title: string;
    image: string;
    content: string;
    summary: string;
    min_read: number;
    short_link: string;
    created_at: string;
    confirmation_status: string;
    author_id: number;
    last_page: number;
    current_page: number;
  }
  const articles: { data?: Article[] } = await getArticles(
    parseInt(searchParams?.page)
  );
  const current_page =
    parseInt(searchParams?.page) || parseInt(articles?.current_page);

  return (
    <div className="flex flex-col">
      <h1 className="pb-5 pt-3 font-bold text-2xl relative">
        {t("blogs_list")}
      </h1>

      <CustomButton
        color="success"
        className="w-[150px] text-white mb-5"
        size="md"
        radius="none"
        variant="shadow"
      >
        <Link href={"/dashboard/articles/add"}>{t("add_new_article")}</Link>
      </CustomButton>

      <div className={clsx(styles.container, "px-2")}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">
                {t("common:id")}
              </TableHead>
              <TableHead className="text-center">{t("blog_image")}</TableHead>
              <TableHead className="text-center">{t("blog_title")}</TableHead>
              <TableHead className="text-center">{t("min_read")}</TableHead>
              <TableHead className="text-center">{t("author")}</TableHead>
              <TableHead className="text-center">{t("status")}</TableHead>
              <TableHead className="text-center">{t("created_at")}</TableHead>
              <TableHead className="text-center">
                {t("common:actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.data?.map((article: Article, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="flex justify-center">
                  {article?.image ? (
                    <Image
                      src={article.image}
                      width={60}
                      height={60}
                      className="rounded-md shadow-md"
                      alt="articl img"
                    />
                  ) : (
                    <Image
                      width={60}
                      height={60}
                      className="rounded-md shadow-md"
                      alt="articl img"
                      src={"/images/image-not-found.png"}
                    />
                  )}
                </TableCell>
                <TableCell className="text-center">{article?.title}</TableCell>
                <TableCell className="text-center">
                  {article?.min_read}
                </TableCell>
                <TableCell className="text-center">
                  {article?.author}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      article?.confirmation_status === "pending"
                        ? "bg-orange-500"
                        : article?.confirmation_status === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {article?.confirmation_status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {moment(article?.created_at)
                    .locale(locale)
                    .format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/dashboard/artticles/${article?.id}`}>
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
        {articles?.last_page > 1 && (
          <CustomPagination
            totalPage={articles?.last_page}
            current_page={current_page}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
