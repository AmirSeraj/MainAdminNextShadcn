"use client";
// npm install @nextui-org/pagination

import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationCompProps {
  totalPage: number;
  current_page: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "flat" | "bordered" | "faded" | "light";
  showControls?: boolean;
  isCompact?: boolean;
  showShadow?: boolean;
  // Callback to go to the next page.
  onNext?: () => void;
  // Callback to go to the previous page.
  onPrevious?: () => void;
  // Callback to go to the page.
  setPage?: (page: number) => void;
  onChange?: (page: number) => void;
}

export const CustomPagination = ({
  totalPage,
  current_page,
  size,
  color,
  variant,
  showControls,
  isCompact,
  showShadow,
}: PaginationCompProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const handlePageChange = (page: number) => {
    console.log("page", page);
    replace(`${pathname}?page=${page}`);
  };

  return (
    <Pagination
      isCompact={isCompact}
      total={totalPage}
      initialPage={1}
      page={current_page}
      size={size}
      color={color}
      variant={variant}
      showControls={showControls}
      showShadow={showShadow}
      onChange={handlePageChange}
    />
  );
};
