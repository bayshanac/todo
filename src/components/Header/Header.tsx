import { FC } from "react";
import { LuLogOut } from "react-icons/lu";

import useAuth from "@hooks/useAuth";
import { Button } from "@components/ui";
import { cn } from "@utils/cn";

interface HeaderProps {
  title: string;
  description?: string;
}

const Header: FC<HeaderProps> = ({ title, description }) => {
  const { logout, isLoggedIn } = useAuth();
  return (
    <div
      className={cn("grid gap-4 p-6 mb-6 rounded-md bg-gray-700", {
        "grid-cols-2": isLoggedIn,
      })}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl leading-8 font-semibold text-white">{title}</h1>
        {description ? (
          <p className="text-gray-300 text-sm hidden sm:block">{description}</p>
        ) : null}
      </div>
      {isLoggedIn ? (
        <div className="grid content-center">
          <Button
            icon={<LuLogOut />}
            onClick={logout}
            variant="default"
            className="max-w-fit text-md py-2 px-4 self-start ml-auto"
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
