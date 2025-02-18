import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  setInputValue?: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input: FC<InputProps> = ({
  value,
  setInputValue,
  ref,
  label,
  type = "text",
  name,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue?.(e.target.value);
  };

  return (
    <>
      {label ? (
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      ) : null}
      <input
        value={value}
        onChange={handleChange}
        className="w-full min-h-14 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        name={name}
        {...(ref && { ref })}
        {...props}
      />
    </>
  );
};

export default Input;
