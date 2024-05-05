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
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import BackButton from "./BackButton";
import Loading from "../loading/Loading_1/page";
import { FormSchema } from "./FormSchema";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { BsPaperclip } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface FormProps {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  title: string;
  single_image: FileList | string;
}

const FormContainer = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  showPassword,
  setShowPassword,
  loading,
  showConfirmPassword,
  setShowConfirmPassword,
  selectedImage,
  setSelectedImage,
}: {
  form: UseFormReturn<FormProps, any, undefined>;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: Blob | MediaSource | undefined;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<File | null | Blob | MediaSource>
  >;
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
                    placeholder="Inset name"
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
                    standard
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
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showConfirmPassword)}
                      className="absolute right-7 bottom-2 cursor-pointer"
                    >
                      {showPassword ? (
                        <IoEye size={22} />
                      ) : (
                        <IoEyeOff size={22} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-7 bottom-2 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <IoEye size={22} />
                      ) : (
                        <IoEyeOff size={22} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="title"
                    type="text"
                    standard
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-4 sm:p-4 p-2 rounded border border-neutral-200 flex-col items-center md:flex-row md:justify-between md:items-center">
            <div className="flex md:flex-1 h-fit md:justify-between md:flex-row">
              {selectedImage ? (
                <div className="relative">
                  <div
                    className="absolute -right-2 -top-2 z-20 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                  >
                    <IoIosCloseCircleOutline size={20} />
                  </div>
                  <Image
                    width={200}
                    height={200}
                    src={URL.createObjectURL(selectedImage)}
                    alt="selected"
                  />
                </div>
              ) : (
                <div className="inline-flex items-center justify-between">
                  <BsImages size={70} />
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="single_image"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Image&nbsp;</FormLabel>
                <FormControl>
                  <Button size="lg" type="button">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                    <label
                      htmlFor="fileInput"
                      className="bg-blue-500 hover:bg-blue-600 text-neutral-90 rounded-md cursor-pointer inline-flex items-center py-0.5 px-1"
                    >
                      <BsPaperclip />
                      <span className="whitespace-nowrap">
                        choose your image
                      </span>
                    </label>
                  </Button>
                </FormControl>
                <FormMessage />
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

export default FormContainer;
