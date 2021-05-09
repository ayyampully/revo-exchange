import { getRate } from "./__mock__";
import { RateData } from "./types";
import { BASE_URL } from "../utils/constants";

export async function fetchRate(
  base = "USD",
  mock = process.env.REACT_APP_ENABLE_MOCK
) {
  // free account only allow base as USD :(
  if (mock) {
    return new Promise<RateData>((resolve) => {
      setTimeout(() => resolve(getRate(base)), 200);
    });
  }

  const response = await fetch(
    `${BASE_URL}/latest.json?app_id=${process.env.REACT_APP_API_ID}&symbols=AED,GBP,JPY,USD,EUR,INR,CHF&base=USD`
  );
  const data = await response.json();

  return data?.rates;
}
