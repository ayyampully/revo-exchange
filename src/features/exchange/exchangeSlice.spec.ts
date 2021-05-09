import exchangeReducer, { setCurrency, setValue } from "./exchangeSlice";
import { ExchangeState, Fields, Types } from "./types";

describe("Exchange reducer", () => {
  const initialState: ExchangeState = {
    exchangeType: Types.SELL,
    userField: Fields.FROM,
    fromCurrency: "USD",
    toCurrency: "EUR",
    fromValue: 0,
    toValue: 0,
    rate: {
      EUR: 0.8,
      INR: 72.5,
    },
    selectedRate: 0.8,
    errorState: "OK",
  };
  it("should handle initial state", () => {
    expect(exchangeReducer(undefined, { type: "unknown" })).toEqual({
      ...initialState,
      selectedRate: 0,
      rate: {
        EUR: 0.8,
      },
    });
  });

  it("should handle setCurrency", () => {
    const state1 = exchangeReducer(
      initialState,
      setValue({
        value: 15,
        fieldType: Fields.FROM,
      })
    );
    expect(state1.toValue).toEqual(12);
    const actual = exchangeReducer(
      state1,
      setCurrency({
        currency: "INR",
        fieldType: Fields.TO,
      })
    );
    expect(actual.toCurrency).toEqual("INR");
    expect(actual.toValue).toEqual(1087.5);
  });
});
