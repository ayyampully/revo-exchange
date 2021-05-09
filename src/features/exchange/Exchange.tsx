import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Exchange.module.css";
import CurrencyInput from "../currency-input/CurrencyInput";

import {
  selectUserField,
  selectRate,
  selectFromCurrency,
  selectToCurrency,
  selectFromValue,
  selectToValue,
  selectExchangeType,
  clearValues,
  setExchangeType,
  getRates,
  setValue,
  setUserField,
  selectErrorState,
} from "./exchangeSlice";
import { Fields, Types } from "./types";

import {
  selectBalances,
  selectCurrencies,
  updateBalance,
  getCurrencies,
} from "../accounts-overview/accountsSlice";
import ErrorMessage from "../error-message/ErrorMessage";

function Exchange() {
  const rate = useAppSelector(selectRate);
  const fromCurrency = useAppSelector(selectFromCurrency);
  const toCurrency = useAppSelector(selectToCurrency);
  const userField = useAppSelector(selectUserField);
  const fromValue = useAppSelector(selectFromValue);
  const toValue = useAppSelector(selectToValue);
  const balances = useAppSelector(selectBalances);
  const currencies = useAppSelector(selectCurrencies);
  const errorState = useAppSelector(selectErrorState);

  const exchangeType = useAppSelector(selectExchangeType);

  const dispatch = useAppDispatch();

  const [fromDisplayValue, setFromDisplayValue] = useState("");
  const [toDisplayValue, setToDisplayValue] = useState("");

  const [fromErrorState, setFromErrorState] = useState(false);
  const [toErrorState, setToErrorState] = useState(false);

  const from = balances[fromCurrency];
  const to = balances[toCurrency];

  useEffect(() => {
    // if currencies loaded from accounts page no need to reload
    if (!Object.keys(currencies).length) {
      dispatch(getCurrencies());
    }
    dispatch(getRates(fromCurrency));
    // todo: redux saga
    const interval = setInterval(() => {
      dispatch(getRates(fromCurrency));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, fromCurrency, currencies]);

  useEffect(() => {
    if (exchangeType === Types.SELL) {
      setToErrorState(false);
      if (userField === Fields.FROM) {
        setToDisplayValue(formatDisplayValue(toValue));
        if (!from && fromValue) {
          setFromErrorState(true);
        }
      } else if (userField === Fields.TO) {
        setFromDisplayValue(formatDisplayValue(fromValue));
        if (fromValue > from?.balance) {
          setFromErrorState(true);
        } else {
          setFromErrorState(false);
        }
      }
    }
    if (exchangeType === Types.BUY) {
      setFromErrorState(false);
      if (userField === Fields.FROM) {
        setToDisplayValue(formatDisplayValue(toValue));
        if (toValue > to?.balance) {
          setToErrorState(true);
        } else {
          setToErrorState(false);
        }
      } else if (userField === Fields.TO) {
        setFromDisplayValue(formatDisplayValue(fromValue));
        if (!to && toValue) {
          setToErrorState(true);
        }
      }
    }
  }, [fromValue, from, toValue, to, exchangeType, userField]);

  const formatDisplayValue = (value: string | number) => {
    if (!value) return "";
    return `${value}`;
  };

  /**
   * handling from and to changes here to allow input only display values
   * active user input is handled here other value is updated in useEffect
   */
  const handleFromChange = async (value: string) => {
    const inputValue = Math.abs(Number(value));

    if (!from || (inputValue > from.balance && exchangeType === Types.SELL)) {
      setFromErrorState(true);
    } else {
      setFromErrorState(false);
    }
    setFromDisplayValue(formatDisplayValue(value));
    await dispatch(setValue({ value: inputValue, fieldType: Fields.FROM }));
    await dispatch(setUserField(Fields.FROM));
  };

  const handleToChange = async (value: string) => {
    const inputValue = Math.abs(Number(value));
    if (to && inputValue > to.balance && exchangeType === Types.BUY) {
      setToErrorState(true);
    } else {
      setToErrorState(false);
    }
    setToDisplayValue(formatDisplayValue(value));
    await dispatch(setValue({ value: inputValue, fieldType: Fields.TO }));
    await dispatch(setUserField(Fields.TO));
  };

  const handleExchangeClick = async () => {
    if (fromErrorState || toErrorState) return;
    await dispatch(
      updateBalance({
        fromCurrency,
        fromValue,
        toCurrency,
        toValue,
        exchangeType,
      })
    );
    setFromDisplayValue("");
    setToDisplayValue("");
    await dispatch(clearValues());
  };

  /**
   * Updating exchange type will swicth operation type
   */
  const handleSwitchClick = async () => {
    let type = Types.SELL;
    if (exchangeType === Types.SELL) {
      type = Types.BUY;
    }
    await dispatch(setExchangeType(type));
  };

  /**
   * Adding from and to currency here to remove it from modal
   */
  const ignoreCurrency = [fromCurrency, toCurrency];

  const disableExchangeButton =
    fromErrorState || toErrorState || (!fromValue && !toValue) || !rate;

  return (
    <div className={styles.exchange}>
      <h2>
        {exchangeType} {fromCurrency}
      </h2>
      {errorState !== "OK" && <ErrorMessage message={errorState} />}
      <p className={styles.marketOrder}>
        Market order: 1 {fromCurrency} = {rate} {toCurrency}
      </p>
      <div className={styles.itemsWrapper}>
        <CurrencyInput
          currency={fromCurrency}
          balance={from?.balance || 0}
          fieldType={Fields.FROM}
          value={fromDisplayValue}
          errorState={fromErrorState}
          onChange={handleFromChange}
          ignoreCurrency={ignoreCurrency}
        />
        <div className={styles.switchButtonWrapper}>
          <button
            onClick={handleSwitchClick}
            className={
              exchangeType === Types.SELL
                ? styles.switchButtonDown
                : styles.switchButtonUp
            }
          >
            {exchangeType === Types.SELL ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </button>
        </div>
        <CurrencyInput
          currency={toCurrency}
          balance={to?.balance || 0}
          fieldType={Fields.TO}
          errorState={toErrorState}
          value={toDisplayValue}
          onChange={handleToChange}
          ignoreCurrency={ignoreCurrency}
        />
      </div>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={handleExchangeClick}
          disabled={disableExchangeButton}
        >
          {Types.SELL === exchangeType
            ? `Sell ${fromCurrency} to buy ${toCurrency}`
            : `Buy ${fromCurrency} using ${toCurrency}`}
          <span>
            <SwitchHorizontalIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Exchange;
