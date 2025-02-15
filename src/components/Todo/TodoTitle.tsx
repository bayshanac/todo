import { FC } from "react";

interface TodoTitleProps {
  title: string;
  description: string;
}

const TodoTitle: FC<TodoTitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-1.5 mb-6 bg-gray-700 rounded-md p-4">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default TodoTitle;
