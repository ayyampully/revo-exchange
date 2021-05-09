import styles from "./ErrorMessage.module.css";
interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}
function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className={styles.errorMessageWrapper}>
      <span className={styles.errorMessage}>{message}. Please try again.</span>
      {onClose && <span onClick={onClose}>x</span>}
    </div>
  );
}

export default ErrorMessage;
