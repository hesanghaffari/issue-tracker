import styles from "./LoginAdmin.module.css";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginFormAdmin from "../feature/authentication/LoginFormAdmin";

function Login() {
  return (
    <main className={styles.loginAdminLayout}>
      <Logo />
      <Heading as="h4"> ورود ادمین، برو عشق کن!</Heading>
      <LoginFormAdmin />
    </main>
  );
}

export default Login;
