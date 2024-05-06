"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitForm } from "./action";
import FormContainer from "./FormContainer";

const CompleteForm = () => {
  const [error, setError] = useState<string | false | undefined>("");
  const [success, setSuccess] = useState<string | false | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | File | null>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      min_read: 0,
      photo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    startTransition(() => {
      submitForm(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        setLoading(false);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Create a new Article"
      headerLabel="Create a blog"
      backButtonHref="/dashboard/articles"
      backButtonLabel="Back to Articles List"
    >
      <FormContainer
        onSubmit={onSubmit}
        error={error}
        success={success}
        isPending={isPending}
        form={form}
        loading={loading}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </CardWrapper>
  );
};

export default CompleteForm;
