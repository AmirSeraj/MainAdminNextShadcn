"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import RegisterFormServerSide from "./RegisterFormServerSide";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/lib/actions/auth/register";

const RegisterForm = () => {
  const [error, setError] = useState<string | false>("");
  const [success, setSuccess] = useState<string | false>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Sign Up"
      headerLabel="Create a new account!"
      backButtonHref="/login"
      backButtonLabel="Already have an account? Sign In"
      showSocial
    >
      <RegisterFormServerSide
        onSubmit={onSubmit}
        error={error}
        success={success}
        isPending={isPending}
        form={form}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    </CardWrapper>
  );
};

export default RegisterForm;
