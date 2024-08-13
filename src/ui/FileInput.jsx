import styles from "./FileInput.module.css";
import { forwardRef } from "react";

const FileInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="file"
      className={styles.fileInput}
      multiple
      {...props}
    />
  );
});
FileInput.displayName = "FileInput";

export default FileInput;
