import { XIcon } from "@heroicons/react/solid";
import styles from "./CurrencyModal.module.css";

interface CurrencyModalProps {
  currencies: {
    [key: string]: string;
  };
  ignoreCurrency?: Array<string>;
  onChange: (key: string) => void;
  onClose: () => void;
}
function CurrencyModal({
  currencies,
  ignoreCurrency = [],
  onChange,
  onClose,
}: CurrencyModalProps) {
  let filteredList = Object.entries(currencies);

  if (ignoreCurrency.length) {
    filteredList = filteredList.filter(
      ([key]) => !ignoreCurrency.includes(key)
    );
  }
  const listItem = filteredList.map(([key, value]) => (
    <li
      key={key}
      onKeyPress={() => {
        onChange(key);
      }}
      data-testid={key}
      role="button"
      aria-label={value}
      tabIndex={1}
      onClick={() => {
        onChange(key);
      }}
    >
      <p className={styles.acronym}>{key}</p>
      <p>{value}</p>
    </li>
  ));
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.options}>
        <div className={styles.header}>
          <h2>Choose source</h2>
          <span
            className={styles.close}
            onClick={onClose}
            onKeyPress={onClose}
            tabIndex={1}
            role="button"
            aria-label="close"
          >
            <XIcon />
          </span>
        </div>
        <ul>{listItem}</ul>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}

export default CurrencyModal;
