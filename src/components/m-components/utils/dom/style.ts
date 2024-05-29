import { isNumber, isString } from "lodash-unified"
import { isStringNumber } from "../vue/types";

export const addUnit = (value: string | number, unit = "px") : string => {
  if(!value) return "";
  if(isNumber(value) || isStringNumber(value)) {
    return `${value}${unit}`;
  } else if (isString(value)) {
    return value
  }
  return "";
}