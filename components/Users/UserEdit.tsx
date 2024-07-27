"use client";
import { UserInfo } from "@/lib/actions/users/getUserById";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/schemas";
import { EditUser } from "@/lib/actions/users/editUser";

const UserEdit = () => {
  const router = usePathname();
  const editId = router.split("/").pop() ?? "";
  const [user, setUser] = useState<[] | any>([]);
  const [error, setError] = useState<string | false>("");
  const [success, setSuccess] = useState<string | false>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await UserInfo(parseInt(editId));
      setUser(res);
    };
    getUserInfo();
  }, [editId]);

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      status: user?.status,
    },
  });

  const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
    setError("");
    setSuccess("");

    //@ts-ignore
    startTransition(() => {
      EditUser({ values }).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      //@ts-ignore
      title={t("add_new_user")}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
      success={success}
    />
  );
};

export default UserEdit;
