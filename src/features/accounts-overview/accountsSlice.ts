import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Types } from "../exchange/types";
import { fetchCurrencies } from "./accountsAPI";

export interface Balance {
  currency: string;
  balance: number;
}
export interface AccountsState {
  firstName: string;
  lastName: string;
  initials: string;
  balances: {
    [key: string]: Balance;
  };
  currencies: {
    [key: string]: string;
  };
  errorState: string;
}

interface UpdateBalance {
  fromCurrency: string;
  fromValue: number;
  toCurrency: string;
  toValue: number;
  exchangeType: Types;
}

const initialState: AccountsState = {
  firstName: "Rohith", // hardcoding user values just for demo
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

export const getCurrencies = createAsyncThunk(
  "account/getCurrencies",
  async () => await fetchCurrencies()
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<UpdateBalance>) => {
      const {
        fromCurrency,
        fromValue,
        toCurrency,
        toValue,
        exchangeType,
      } = action.payload;

      if (exchangeType === Types.SELL) {
        state.balances[fromCurrency].balance -= fromValue;
        if (state.balances[toCurrency]) {
          state.balances[toCurrency].balance += toValue;
        } else {
          state.balances[toCurrency] = {
            currency: toCurrency,
            balance: toValue,
          };
        }
      } else {
        state.balances[toCurrency].balance -= toValue;
        if (state.balances[fromCurrency]) {
          state.balances[fromCurrency].balance += fromValue;
        } else {
          state.balances[fromCurrency] = {
            currency: fromCurrency,
            balance: fromValue,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.fulfilled, (state, action) => {
        // only using few currencies for demo purpose
        const { AED, GBP, JPY, USD, EUR, INR, CHF } = action.payload;
        state.currencies = { AED, CHF, EUR, GBP, INR, JPY, USD };
        state.errorState = "OK";
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.errorState = action.error.message || "Some error occured";
      });
  },
});

export const { updateBalance } = accountsSlice.actions;

export const selectBalances = (state: RootState) => state.accounts.balances;
export const selectCurrencies = (state: RootState) => state.accounts.currencies;
export const selectErrorState = (state: RootState) => state.accounts.errorState;

export default accountsSlice.reducer;
