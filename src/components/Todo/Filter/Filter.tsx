import { useAtom } from "jotai";

import filterAtom from "@atoms/filterAtom";
import { Filter as FilterType, FILTER_VALUES } from "@models/filter.types";
import RadioButtonGroup, {
  RadioButtonGroupOption,
} from "@components/ui/RadioButtonGroup/RadioButtonGroup";

const FILTER_OPTIONS: RadioButtonGroupOption[] = Object.values(
  FILTER_VALUES
).map((value) => ({
  id: value,
  label: value,
}));

const Filter = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return (
    <RadioButtonGroup
      options={FILTER_OPTIONS}
      value={filter}
      name="filter"
      onChange={(value) => setFilter(value as FilterType)}
      className="mb-4 pl-4"
    />
  );
};

export default Filter;
