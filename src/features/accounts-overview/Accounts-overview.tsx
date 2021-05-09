import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/solid";

import styles from "./Accounts-overview.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectErrorState,
  getCurrencies,
  selectCurrencies,
  selectBalances,
} from "./accountsSlice";
import ErrorMessage from "../error-message/ErrorMessage";
import { getCurrencySymbol } from "../utils/currency-util";

function AccountsOverview() {
  const balances = useAppSelector(selectBalances);
  const currencies = useAppSelector(selectCurrencies);
  const errorState = useAppSelector(selectErrorState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!Object.keys(currencies).length) {
      dispatch(getCurrencies());
    }
  }, [dispatch, currencies]);

  const _renderBalances = () => {
    return Object.entries(balances).map(([key, values]) => {
      const { currency, balance } = values;
      const symbol = getCurrencySymbol(currency);
      return (
        <div key={key} className={styles.accountItem}>
          <div className={styles.accountRow}>
            <h4>
              {symbol && (
                <span className={styles.accountRowSymbol}>{symbol}</span>
              )}
              {Math.round(balance) === balance ? balance : balance.toFixed(2)}
            </h4>
          </div>
          <p className={styles.accountRowText}>{currencies[currency]}</p>
        </div>
      );
    });
  };
  return (
    <div className={styles.overview}>
      <h2>Accounts</h2>
      {errorState !== "OK" && <ErrorMessage message={errorState} />}
      {_renderBalances()}
      <div className={styles.actions}>
        <Link to="/exchange" className={styles.button}>
          Check best exchange rates
          <span className={styles.buttonIcon}>
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default AccountsOverview;
