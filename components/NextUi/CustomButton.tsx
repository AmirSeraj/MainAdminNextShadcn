import { Button } from "@nextui-org/button";
import { MouseEventHandler } from "react";

interface CustomButtonProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg" | undefined;
  radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  isLoading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  isDisabled,
  size,
  radius,
  color,
  variant,
  isLoading,
  className,
  type,
  name,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      name={name}
      type={type}
      color={color}
      size={size}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
      isLoading={isLoading}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
