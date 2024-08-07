import styles from "./Textarea.module.css";

function Textarea(props) {
  return <textarea className={styles.textarea} {...props} />;
}

export default Textarea;
