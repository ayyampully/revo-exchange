export interface RateData {
  [key: string]: number;
}
export enum Types {
  SELL = "SELL",
  BUY = "BUY",
}
export enum Fields {
  TO = "TO",
  FROM = "FROM",
}
export interface SetCurrencyPayload {
  currency: string;
  fieldType: Fields;
}
export interface SetCurrencyValuePayload {
  value: number;
  fieldType: Fields;
}
export interface ExchangeState {
  exchangeType: Types;
  userInput: Fields;
  fromCurrency: string;
  toCurrency: string;
  fromValue: number;
  toValue: number;
  selectedRate: number;
  rate: RateData;
  errorState: string;
}
