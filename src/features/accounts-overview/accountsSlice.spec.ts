import { Types } from "../exchange/types";
import accountsReducer, { updateBalance } from "./accountsSlice";

describe("Accounts reducer", () => {
  const initialState = {
    firstName: "Rohith",
    lastName: "Ayyampully",
    initials: "RA",
    balances: {
      EUR: {
        currency: "EUR",
        balance: 100,
      },
      USD: {
        currency: "USD",
        balance: 100,
      },
    },
    currencies: {},
    errorState: "OK",
  };
  it("should handle initial state", () => {
    expect(accountsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle updateBalance", () => {
    const state1 = accountsReducer(
      initialState,
      updateBalance({
        fromCurrency: "USD",
        fromValue: 10,
        toCurrency: "EUR",
        toValue: 14,
        exchangeType: Types.SELL,
      })
    );
    expect(state1.balances["USD"].balance).toEqual(90);
    expect(state1.balances["EUR"].balance).toEqual(114);

    const actual = accountsReducer(
      state1,
      updateBalance({
        fromCurrency: "JPY",
        fromValue: 1000,
        toCurrency: "EUR",
        toValue: 7.5,
        exchangeType: Types.BUY,
      })
    );
    expect(actual.balances["USD"].balance).toEqual(90);
    expect(actual.balances["EUR"].balance).toEqual(106.5);
    expect(actual.balances["JPY"].balance).toEqual(1000);
  });
});
