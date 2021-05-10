import { useState } from "react";
import Select from "../select/Select";
import CurrencyModal from "../currency-modal/CurrencyModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setCurrency } from "../exchange/exchangeSlice";
import { selectCurrencies } from "../accounts-overview/accountsSlice";
import styles from "./CurrencyInput.module.css";
import { Fields, Types } from "../exchange/types";

interface CurrencyInputProps {
  fieldType: Fields;
  currency: string;
  balance: number;
  value: string;
  ignoreCurrency?: Array<string>;
  onChange: (value: string) => Promise<void>;
  errorState: boolean;
  exchangeType: Types;
}
function CurrencyInput({
  fieldType,
  currency,
  balance,
  value,
  onChange,
  ignoreCurrency,
  errorState,
  exchangeType,
}: CurrencyInputProps) {
  const currencies = useAppSelector(selectCurrencies);

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value;
    if (!val) {
      onChange("");
      return;
    }
    if (/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(val)) {
      onChange(val);
    }
  };

  const handleSelectClick = () => {
    setShowModal(true);
  };

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrency({ currency, fieldType }));
    setShowModal(false);
  };

  const isDisabled =
    ((exchangeType === Types.SELL && fieldType === Fields.FROM) ||
      (exchangeType === Types.BUY && fieldType === Fields.TO)) &&
    !balance;

  return (
    <div className={styles.item}>
      <div className={styles.leftCol}>
        <Select label={currency} onClick={handleSelectClick} />
        <span className={styles.balance}>Balance: {balance}</span>
      </div>
      <div className={styles.rightCol}>
        <div>
          <input
            type="text"
            placeholder="0"
            aria-label={fieldType}
            onChange={isDisabled ? () => {} : handleOnChange}
            value={value}
            disabled={isDisabled}
          />
        </div>
        {errorState && (
          <span className={styles.errorLabel}>Exceeds balance</span>
        )}
      </div>
      {showModal && (
        <CurrencyModal
          currencies={currencies}
          ignoreCurrency={ignoreCurrency}
          onChange={handleCurrencyChange}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default CurrencyInput;
