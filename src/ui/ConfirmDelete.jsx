import PropTypes from "prop-types";
import styles from "./ConfirmDelete.module.css";
import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className={styles.container}>
      <Heading as="h3">حذف {resourceName}</Heading>
      <p className={styles.text}>
        آیا مطمئن هستید که می خواهید این {resourceName} را برای همیشه حذف کنید؟
        این عمل قابل لغو نیست.
      </p>

      <div className={styles.buttons}>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          لغو
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          حذف
        </Button>
      </div>
    </div>
  );
}

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default ConfirmDelete;
