import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
  setInputValue: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input: FC<InputProps> = ({
  inputValue,
  setInputValue,
  ref,
  type = "text",
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      type={type}
      {...(ref && { ref })}
      {...props}
    />
  );
};

export default Input;
