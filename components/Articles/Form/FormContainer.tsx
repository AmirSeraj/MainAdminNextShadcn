import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading/Loading_1/page";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { BsPaperclip } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { FormContainerProps } from "@/lib/types";

const FormContainer = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  loading,
  selectedImage,
  setSelectedImage,
}: FormContainerProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Inset title"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    standard
                    placeholder="Type your summary..."
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
            name="image"
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

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frameworks</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={OPTIONS}
                    placeholder="Select frameworks you like..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          {loading ? <Loading /> : "Create Blog"}
        </Button>
      </form>
    </Form>
  );
};

export default FormContainer;
