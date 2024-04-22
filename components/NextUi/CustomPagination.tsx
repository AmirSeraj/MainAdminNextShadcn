// npm install @nextui-org/pagination

import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";

interface PaginationCompProps {
  totalPage: number;
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
  size,
  color,
  variant,
  showControls,
  isCompact,
  showShadow,
  onChange,
}: PaginationCompProps) => {
  return (
    <Pagination
      isCompact={isCompact}
      total={totalPage}
      initialPage={1}
      size={size}
      color={color}
      variant={variant}
      showControls={showControls}
      showShadow={showShadow}
      onChange={onChange}
    />
  );
};
