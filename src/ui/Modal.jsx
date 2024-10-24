import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import styles from "./Modal.module.css";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const close = () => {
    setOpenName("");
    setIsValid(true);
    setErrorMessage("");
  };

  const open = setOpenName;

  const validate = (input) => {
    if (input.trim() === "") {
      setIsValid(false);
      setErrorMessage("This field cannot be empty.");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };

  return (
    <ModalContext.Provider
      value={{ openName, close, open, validate, isValid, errorMessage }}
    >
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Open.propTypes = {
  children: PropTypes.node.isRequired,
  opens: PropTypes.string.isRequired,
};

function Window({ children, name }) {
  const { openName, close, validate, isValid, errorMessage } =
    useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  const handleInputChange = (e) => {
    validate(e.target.value);
  };

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={`${styles.styledModal} ${!isValid ? styles.error : ""}`}
        ref={ref}
      >
        <button className={styles.button} onClick={close}>
          <HiXMark />
        </button>

        <div>
          {cloneElement(children, {
            onCloseModal: close,
            onInputChange: handleInputChange,
          })}
          {!isValid && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
}

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
