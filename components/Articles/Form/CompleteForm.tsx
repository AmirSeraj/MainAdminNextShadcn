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
      photo: undefined,
      status : 'success | pending | reject'
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
      headerTitle="Submit Form"
      headerLabel="Create a blog & user"
      backButtonHref="/register"
      backButtonLabel="Don`t have an account? SignUp"
      showSocial
    >
      <FormContainer
        onSubmit={onSubmit}
        error={error}
        success={success}
        isPending={isPending}
        form={form}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    </CardWrapper>
  );
};

export default CompleteForm;
