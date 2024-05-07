"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AddUserSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { addUser } from "@/lib/actions/users/addUser";
import CardWrapper from "./CardWrapper";

const AddUser = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | false>("");
  const [success, setSuccess] = useState<string | false>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddUserSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      addUser(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      title={t("add_new_user")}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
      success={success}
    />
  );
};

export default AddUser;
