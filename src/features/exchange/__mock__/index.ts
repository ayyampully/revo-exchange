import data from "./default.json";
import { RateData } from "../types";

export const getRate = (base: string): RateData => {
  const length = data.length;
  const randIdx = Math.floor(Math.random() * length);
  return data[randIdx].rates;
};
