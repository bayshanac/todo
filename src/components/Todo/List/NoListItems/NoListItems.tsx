import { FC } from "react";
import { PiMagnifyingGlassMinusBold } from "react-icons/pi";

import { cn } from "../../../../utils";

interface NoListItemsProps {
  className?: string;
}

const NoListItems: FC<NoListItemsProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PiMagnifyingGlassMinusBold className="text-gray-500" size={24} />
      <p className="text-gray-500">No todos</p>
    </div>
  );
};

export default NoListItems;
