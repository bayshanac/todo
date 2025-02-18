import { FC } from "react";

import { RadioButtonGroupOption } from "@models/radioButton.types";
import { cn } from "@utils/cn";

import RadioButton from "./RadioButton/RadioButton";

interface RadioButtonGroupProps {
  options: RadioButtonGroupOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  options,
  name,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex gap-6", className)}>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          label={option.label}
          checked={value === option.id}
          onChange={() => onChange(option.id)}
          name={name}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
