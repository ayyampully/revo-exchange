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
  /**
   * rate - exchange rate
   */
  exchangeType: Types;
  /**
   * userField - user entered field - tracking it update when rate updates
   */
  userField: Fields;
  /**
   * fromCurrency - three letter currency code
   */
  fromCurrency: string;
  /**
   * toCurrency - three letter currency code
   */
  toCurrency: string;
  /**
   * fromValue - parsed number from from input
   */
  fromValue: number;
  /**
   * toValue - parsed number from to input
   */
  toValue: number;
  /**
   * selectedRate - exchange rate from RateData based on user selection
   */
  selectedRate: number;
  /**
   * rate - exchange rate from https://openexchangerates.org/
   */
  rate: RateData;
  /**
   * errorState - string containing api error message
   */
  errorState: string;
}
