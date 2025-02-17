import { FC } from "react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col p-6 mb-6 rounded-md bg-gray-700">
      <h1 className="text-3xl leading-8 font-semibold text-white">{title}</h1>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default Header;
