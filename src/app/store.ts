import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts-overview/accountsSlice";
import exchangeReducer from "../features/exchange/exchangeSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    exchange: exchangeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
