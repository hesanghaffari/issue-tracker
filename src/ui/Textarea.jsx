import styles from "./Textarea.module.css";
import { forwardRef } from "react";

const Textarea = forwardRef((props, ref) => {
  return <textarea ref={ref} className={styles.textarea} {...props} />;
});

Textarea.displayName = "Textarea";

export default Textarea;
