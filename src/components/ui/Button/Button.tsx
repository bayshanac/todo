import { FC } from "react";
import { cn } from "../../../utils";
import { cva, type VariantProps } from "class-variance-authority";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const buttonVariants = cva(
  "flex gap-2 items-center justify-center cursor-pointer rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "text-white bg-emerald-600 hover:bg-emerald-800 disabled:bg-gray-300",
        transparent: "text-gray-500 hover:text-gray-800 disabled:text-gray-300",
        delete: "text-white bg-red-500 hover:bg-red-800 disabled:bg-gray-300",
      },
      size: {
        default: "p-1 text-xl",
        lg: "p-3 text-2xl min-w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  variant = "default",
  size = "default",
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...(onClick && { onClick })}
      {...props}
    >
      {icon}
      {children ?? null}
    </button>
  );
};

export default IconButton;
