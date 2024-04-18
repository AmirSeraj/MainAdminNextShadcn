import React from "react";
import { CardWrapper } from "./CardWrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerTitle="Sign in Admin"
      headerLabel="Welcome back!"
      backButtonHref="/register"
      backButtonLabel="Don`t have an account? SignUp"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
