import { getCurrencySymbol } from "./currency-util";

describe("Currency utility", () => {
  it("should return correct values", () => {
    expect(getCurrencySymbol("")).toEqual("");
    expect(getCurrencySymbol("INR")).toEqual("");
    expect(getCurrencySymbol("USD")).toEqual("$");
    expect(getCurrencySymbol("EUR")).toEqual("€");
    expect(getCurrencySymbol("GBP")).toEqual("£");
    expect(getCurrencySymbol("JPY")).toEqual("¥");
  });
});
