import { atom } from "jotai";
import { Filter, FILTER_VALUES } from "@models/filter.types";

const filterAtom = atom<Filter>(FILTER_VALUES.ALL);

export default filterAtom;
