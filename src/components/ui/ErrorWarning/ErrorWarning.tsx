import { FC } from "react";

interface ErrorWarningProps {
  message: string;
}

const ErrorWarning: FC<ErrorWarningProps> = ({ message }) => {
  return (
    <div className="px-4 py-2 bg-red-500 text-sm text-white rounded">
      {message}
    </div>
  );
};

export default ErrorWarning;
