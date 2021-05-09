import { ChevronDownIcon } from "@heroicons/react/solid";
import styles from "./Select.module.css";

interface SelectProps {
  label: string;
  onClick: () => void;
}
function Select({ label, onClick }: SelectProps) {
  return (
    <div className={styles.select}>
      <div
        className={styles.value}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={1}
      >
        <label>{label}</label>
        <span className={styles.icon}>
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
}

export default Select;
