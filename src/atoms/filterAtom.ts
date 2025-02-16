import { atom } from "jotai";
import { FilterEnum, Filter } from "../types/filter.types";

const filterAtom = atom<Filter>(FilterEnum.ALL);

export default filterAtom;
