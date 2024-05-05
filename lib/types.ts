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
  author_id?: number;
  article_image?: string;
}

export interface ArticleProps {
  data: SingleArticleProps[];
  last_page?: number;
  current_page?: number;
}
