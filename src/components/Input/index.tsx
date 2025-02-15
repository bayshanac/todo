import { FC } from "react";

interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input: FC<InputProps> = ({
  inputValue,
  setInputValue,
  placeholder,
  ref,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...(placeholder && { placeholder })}
      {...(ref && { ref })}
    />
  );
};

export default Input;
