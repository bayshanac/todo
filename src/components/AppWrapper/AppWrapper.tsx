import { FC, ReactNode } from "react";
import { cn } from "../../utils";

type AppWrapperSize = "sm" | "lg";
interface AppWrapperProps {
  children: ReactNode;
  className?: string;
  size?: AppWrapperSize;
}

const AppWrapper: FC<AppWrapperProps> = ({
  children,
  size = "lg",
  className,
}) => {
  return (
    <main className="container-wrapper flex flex-col items-center justify-start bg-white min-h-screen">
      <section className="container flex flex-col items-center">
        <div
          className={cn(
            "bg-gray-100 rounded-md border border-gray-200 shadow-md shadow-black/5 w-full min-h-screen md:min-h-auto p-6 md:p-8 md:mt-6",
            {
              "md:w-2xl": size === "lg",
              "md:w-lg": size === "sm",
            },
            className
          )}
        >
          {children}
        </div>
      </section>
    </main>
  );
};

export default AppWrapper;
