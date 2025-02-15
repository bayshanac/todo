import { FC } from "react";

import { cn } from "../../utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  className?: string;
  variant?: "default" | "danger" | "submit" | "delete";
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  variant = "default",
  type = "button",
  ...props
}) => {
  return (
    <button
      className={cn(
        "focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed",
        {
          "p-4 text-2xl bg-green-600 text-white rounded-lg hover:bg-green-800 focus:outline-none":
            variant === "submit",
          "p-4 text-2xl bg-red-500 text-white hover:bg-red-800 rounded-lg focus:outline-none":
            variant === "delete",
          "p-1 text-xl text-red-500 hover:text-red-800 disabled:text-gray-400":
            variant === "danger",
          "p-1 text-xl text-yellow-500 hover:text-yellow-800 disabled:text-gray-400":
            variant === "default",
        },
        className
      )}
      type={type}
      {...(onClick && { onClick })}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
