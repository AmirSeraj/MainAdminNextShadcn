import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { AddUserSchema } from "@/schemas";
import { Input } from "../ui/input";
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

interface FormAddProps {
  email: string;
  password: string;
  name: string;
}

const CardWrapper = ({
  title,
  form,
  onSubmit,
  isPending,
  error,
  success,
  status
}: {
  title: string;
  form: UseFormReturn<FormAddProps, any, undefined>;
  onSubmit: (values: z.infer<typeof AddUserSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  status?: boolean 
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-center">
      <div className="flex md:w-1/2 w-full flex-col gap-2 sm:p-5 p-2 items-center border rounded-lg my-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-5">{title}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:w-[70%] w-full">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
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
                    <FormLabel>{t("email")}</FormLabel>
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
              {status && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="text"
                        standard
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button type="submit" disabled={isPending}>
              {t("submit")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CardWrapper;
