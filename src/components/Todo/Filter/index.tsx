import { useAtom } from "jotai";

import filterAtom from "../../../atoms/filterAtom";
import { Filter as FilterType, FilterEnum } from "../../../types/filter.types";
import RadioButtonGroup, {
  RadioButtonGroupOption,
} from "../../RadioButtonGroup";

const options: RadioButtonGroupOption[] = Object.values(FilterEnum).map(
  (value) => ({
    id: value,
    label: value,
  })
);

const Filter = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return (
    <RadioButtonGroup
      options={options}
      value={filter}
      name="filter"
      onChange={(value) => setFilter(value as FilterType)}
      className="mb-4 pl-4"
    />
  );
};

export default Filter;
