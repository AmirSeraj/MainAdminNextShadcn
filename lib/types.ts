import { FormSchema } from "@/schemas";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export interface UserProps {
  name: string;
  email: string;
  profile: string;
}

export interface SingleArticleProps {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  summary?: string;
  min_read?: number;
  short_link?: string;
  status?: string;
  created_at?: string;
  photo?: string;
  author?: UserProps;
}

export interface ArticleProps {
  data: SingleArticleProps[];
  last_page?: number;
  current_page?: number;
}

export interface ArticleCreateFormProps {
  title: string;
  summary: string;
  content: string;
  image: FileList | string;
  tags: [];
}

export interface FormContainerProps {
  form: UseFormReturn<ArticleCreateFormProps>;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  loading: boolean;
  selectedImage?: Blob | MediaSource | File | null;
  setSelectedImage?: React.Dispatch<
    React.SetStateAction<File | null | Blob | MediaSource>
  >;
}
