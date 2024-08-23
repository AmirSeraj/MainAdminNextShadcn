This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Creating form(sign-in, sign-up form) with react-hook-form && Zod

resources: https://ui.shadcn.com/docs/components/form

## Installations

```
npx shadcn-ui@latest init
npx shadcn-ui@latest add form
npx shadcn-ui@latest add button
npm i @radix-ui/react-icons
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add input
```

## folder structure (in next.js 14 App router):

```
app/(auth)/login/page.tsx
app/(auth)/register/page.tsx
components/auth/RegisterForm.tsx
components/auth/Social.tsx
components/auth/BackButton.tsx
components/auth/CardWrapper.tsx
```

## in register page:

```
import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'
const RegisterPage = () => {
return (
<RegisterForm />
)
}

export default RegisterPage
```

## Social.tsx: components/auth/Social.tsx

```
"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
```

## Header.tsx : components/auth/Header.tsx

```
import { Poppins } from "next/font/google";
import clsx from "clsx";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  title: string;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={clsx("text-3xl font-semibold drop-shadow-xl", font)}>🔐 {title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
```

## index.ts : schemas/index.ts

```
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});
```

## BackButton.tsx : components/auth/BackButton.tsx

```
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
  className: string;
}

const BackButton = ({ label, href, className }: BackButtonProps) => {
  return (
    <Button
      className="font-normal w-full no-underline"
      variant={"link"}
      size={"sm"}
      asChild
    >
      <Link href={href} className={className}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
```

## CardWrapper.tsx : components/auth/CardWrapper.tsx

```
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "@/components/auth/BackButton";
import Social from "@/components/auth/Social";
import { Header } from "@/components/auth/Header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          className=""
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
```

## CardWrapper.tsx : components/Form/form-error.tsx

```
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
    </div>
  );
};
```

## form-success.tsx : components/Form/form-success.tsx

```
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

```

## RegisterFormServerSide.tsx : components/auth/RegisterFormServerSide.tsx

```
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

interface FormRegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const RegisterFormServerSide = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  form: UseFormReturn<FormRegisterProps, any, undefined>;
  onSubmit: (values: z.infer<typeof RegisterSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John Doe"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-7 bottom-2 cursor-pointer"
                >
                  {showPassword ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-7 bottom-2 cursor-pointer"
                >
                  {showConfirmPassword ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                </span>
              </FormItem>
            )}
          />
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          Create an account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterFormServerSide;
```

## RegisterForm.tsx : components/auth/RegisterForm.tsx

```
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
```

## LoginPage.tsx : app/(auth)/login/page.tsx

```
import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage

```

## LoginForm.tsx : components/auth/LoginForm.tsx

```
"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormServerSide from "./LoginFormServerSide";
import { login } from "@/lib/actions/auth/login";

const LoginForm = () => {
  const [error, setError] = useState<string | false | undefined>("");
  const [success, setSuccess] = useState<string | false | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        setLoading(false);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Sign in Admin"
      headerLabel="Welcome back!"
      backButtonHref="/register"
      backButtonLabel="Don`t have an account? SignUp"
      showSocial
    >
      <LoginFormServerSide
        onSubmit={onSubmit}
        error={error}
        success={success}
        isPending={isPending}
        form={form}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
      />
    </CardWrapper>
  );
};

export default LoginForm;

```

## LoginFormServerSide.tsx : components/auth/LoginFormServerSide.tsx

```
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import BackButton from "./BackButton";
import Loading from "../loading/Loading_1/page";

interface FormLoginProps {
  email: string;
  password: string;
}

const LoginFormServerSide = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  showPassword,
  setShowPassword,
  loading,
}: {
  form: UseFormReturn<FormLoginProps, any, undefined>;
  onSubmit: (values: z.infer<typeof LoginSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-7 bottom-2 cursor-pointer"
                >
                  {showPassword ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                </span>
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <BackButton
              label={"Forget Password?"}
              href={"/forgetPassword"}
              className="!px-0 !justify-start"
            />
          </div>
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          {loading ? <Loading /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginFormServerSide;

```

## ServerActions.tsx : lib/actions/auth/login.ts

```
"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { getSession } from "../getSession";
import { LoggedInUser } from "./loggedInUser";
import { redirect } from "next/navigation";

/**PATH */
const sanctum_path = process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "/sanctum/csrf-cookie";
const login_path = process.env.NEXT_PUBLIC_APP_URL_API + "/auth/login";
/**PATH */

/**login */
//@ts-ignore
export const login: (values: z.infer<typeof LoginSchema>) => Promise<{
  error: string | false;
  success: string | false;
  // isLoading: false;
}> = async (values: z.infer<typeof LoginSchema>) => {
  ///data validation
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials!", success: false };
  }

  /**session */
  const session = await getSession();

  //destructuring data
  const { password, email } = validatedFields.data;

  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
    });

    if (csrf_response.ok) {
      try {
        /**login user */
        const res = await fetch(login_path, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const response = await res.json();
        console.log("ress", response);

        if (response.status === "error") {
          return {
            error: response.message,
            success: false,
          }
        }

        if (response.status === "success") {
          session.token = response.token;
          session.isLoggedIn = true;
          await session.save();
        }

        if (session.isLoggedIn) {
          await LoggedInUser(session.token);
        }
      } catch (error) {
        console.log("error2", error);
        return {
          error: "Something Wrong, try again!",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: "Something Wrong, try again!",
      success: false,
    };
  }
  if (session.isLoggedIn) {
    redirect("/dashboard");
  }
};
```
# -------------------------------------------------------------------------------------------------------------
# Add persian fonts to Next project

## In the main directory create a folder lib/IranSans.js or utils/IranSans.js and paste the bellow code in the file

```
import localFont from "next/font/local";

export const IranSans = localFont({
  src: [
    {
      path: "../public/fonts/IranSans/IRANSansWeb(FaNum)_UltraLight.woff",
      // path: "",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IRANSansWeb(FaNum)_Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IRANSansWeb(FaNum).woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IRANSansWeb(FaNum)_Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IRANSansWeb(FaNum)_Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

```

## Put fonts folder in public folder

## in layout file add font to project

```
// import { Noto_Sans_Arabic } from "next/font/google";
import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import clsx from "clsx";
import Header from "./components/Header/header";
import { IranSans } from "@/utils/IranSans";

export const metadata = {
  title: "فروشگاه من",
  description: "Store",
  icons: {
    icon: "/favicon.ico",
  },
};

// const arabic = Noto_Sans_Arabic({
//   subsets: ["arabic"],
//   variable: "--font-sans-arabic",
//   weight: ["400", "700"],
//   style: ["normal"],
//   display: "swap",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={clsx(
          IranSans.className,
          "min-h-screen h-screen w-full bg-[#fff]"
        )}
      >
        <NextUIProvider>
          <Header />
          <main>{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}

```
