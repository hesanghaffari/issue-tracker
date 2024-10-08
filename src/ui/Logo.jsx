import styles from "./Logo.module.css";

function Logo() {
  const src = "/logomaynd.svg";

  return (
    <div className={styles.logo}>
      <img className={styles.img} src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
