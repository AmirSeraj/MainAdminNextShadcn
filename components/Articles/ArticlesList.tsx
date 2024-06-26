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
import { SingleArticleProps } from "@/lib/types";

const i18Namespaces = ["blog", "common"];

const ArticlesList = async ({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams?: {
    query?: string;
    page?: number;
  };
}) => {
  const { t } = await initTranslations(locale, i18Namespaces);

  const page = searchParams?.page ?? 1;

  const { current_page, data, last_page } = await getArticles(page);
  console.log('data',data);
  

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
            {data?.map((article: SingleArticleProps, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="flex justify-center">
                  {article?.photo ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_APP_URL_SANCTUM + article.photo}
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
                  {article?.min_read} {t("common:minute")}
                </TableCell>
                <TableCell className="text-center">{article?.author?.name}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      article?.status === "pending"
                        ? "bg-orange-500"
                        : article?.status === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {article?.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {moment(article?.created_at)
                    .locale(locale)
                    .format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="text-center gap-1">
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
        {last_page > 1 && (
          <CustomPagination
            totalPage={last_page}
            current_page={current_page}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
