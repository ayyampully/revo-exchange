const currencyMap = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
} as { [index: string]: string };
export const getCurrencySymbol = (currency: string): string => {
  return currencyMap[currency] || "";
};
