import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchRate } from "./exchangeAPI";
import {
  ExchangeState,
  Types,
  Fields,
  SetCurrencyPayload,
  SetCurrencyValuePayload,
} from "./types";

const BASE = "USD";
const initialState: ExchangeState = {
  exchangeType: Types.SELL,
  userField: Fields.FROM,
  fromCurrency: BASE,
  toCurrency: "EUR",
  fromValue: 0,
  toValue: 0,
  rate: {
    EUR: 0.8,
  },
  selectedRate: 0,
  errorState: "OK",
};

export const getRates = createAsyncThunk(
  "exchange/getRates",
  async (base?: string) => await fetchRate(base)
);

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<SetCurrencyPayload>) => {
      const { fieldType, currency } = action.payload;

      if (state.userField === Fields.FROM) {
        if (fieldType === Fields.FROM) {
          state.fromCurrency = currency;
          state.toValue = state.fromValue * state.selectedRate;
        } else {
          state.toCurrency = currency;
          if (state.fromCurrency === BASE)
            state.selectedRate = state.rate[currency];
          state.toValue = state.fromValue * state.selectedRate;
        }
      } else {
        if (fieldType === Fields.FROM) {
          state.fromCurrency = currency;
          state.fromValue = state.toValue / state.selectedRate;
        } else {
          state.toCurrency = currency;
          if (state.fromCurrency === BASE)
            state.selectedRate = state.rate[currency];
          state.fromValue = state.toValue / state.selectedRate;
        }
      }
    },
    setValue: (state, action: PayloadAction<SetCurrencyValuePayload>) => {
      const { fieldType, value } = action.payload;
      if (fieldType === Fields.FROM) {
        state.fromValue = value;
        state.toValue = value * state.selectedRate;
      } else {
        state.toValue = value;
        state.fromValue = value / state.selectedRate;
      }
    },
    setUserField: (state, action: PayloadAction<Fields>) => {
      state.userField = action.payload;
    },
    setExchangeType: (state, action: PayloadAction<Types>) => {
      state.exchangeType = action.payload;
    },
    clearValues: (state) => {
      state.fromValue = 0;
      state.toValue = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRates.fulfilled, (state, action) => {
        state.rate = action.payload;
        const currency = state.fromCurrency;
        if (currency !== BASE) {
          // only needed with test api
          // need to convert based on usd rates
          // new currency rate to base
          const fromRate = state.rate[currency];
          const toCurrency = state.toCurrency;
          const toRate = state.rate[toCurrency];

          // one new base to 1 USD
          const fromCurrencyToUSDRate = 1 / fromRate;
          const toCurrencyToUSDRate = 1 / toRate;

          state.selectedRate = fromCurrencyToUSDRate / toCurrencyToUSDRate;
        } else {
          state.selectedRate = action.payload[state.toCurrency];
        }

        if (state.toValue) {
          if (state.userField === Fields.FROM) {
            state.toValue = state.fromValue * state.selectedRate;
          } else {
            state.fromValue = state.toValue / state.selectedRate;
          }
        }
      })
      .addCase(getRates.rejected, (state, action) => {
        state.errorState = action.error.message || "Some error occured";
      });
  },
});

export const {
  setCurrency,
  setValue,
  setUserField,
  setExchangeType,
  clearValues,
} = exchangeSlice.actions;

export const selectRate = (state: RootState) => state.exchange.selectedRate;
export const selectFromCurrency = (state: RootState) =>
  state.exchange.fromCurrency;
export const selectToCurrency = (state: RootState) => state.exchange.toCurrency;
export const selectFromValue = (state: RootState) => state.exchange.fromValue;
export const selectToValue = (state: RootState) => state.exchange.toValue;
export const selectExchangeType = (state: RootState) =>
  state.exchange.exchangeType;
export const selectUserField = (state: RootState) => state.exchange.userField;
export const selectErrorState = (state: RootState) => state.exchange.errorState;
export default exchangeSlice.reducer;
