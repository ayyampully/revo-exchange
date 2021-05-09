import { BASE_URL } from "../utils/constants";

export async function fetchCurrencies() {
  const response = await fetch(`${BASE_URL}/currencies.json`);
  return response.json();
}
