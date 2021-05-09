import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/solid";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.logo}>
          <img
            src="https://assets.revolut.com/media/developer-portal/logo.svg"
            alt="Revolut"
          />
          <span>Exchange</span>
        </Link>
      </h1>
      <button className={styles.accountButton}>
        <span className={styles.accountButtonContents}>
          <span className={styles.accountButtonLabel}>RA</span>
          <span className={styles.accountButtonIcon}>
            <CameraIcon />
          </span>
        </span>
      </button>
    </header>
  );
}

export default Header;
