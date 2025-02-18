import { FC } from "react";

import { cn } from "@utils/cn";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton: FC<RadioButtonProps> = ({ id, label, ...props }) => {
  return (
    <div className="flex gap-2 items-start relative">
      <div className="grid place-items-center mt-1 absolute left-0 pointer-events-none">
        <input
          type="radio"
          id={id}
          name={props.name}
          className="col-start-1 row-start-1
        appearance-none shrink-0
        w-4 h-4 border-2 border-blue-500 rounded-full
        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400"
          checked={props.checked}
          {...props}
        />
        <div
          className={cn(
            "col-start-1 row-start-1 w-2 h-2 rounded-full bg-blue-500",
            props.checked && "opacity-100",
            !props.checked && "opacity-0"
          )}
        />
      </div>
      <label htmlFor={id} className="text-start pl-6">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
