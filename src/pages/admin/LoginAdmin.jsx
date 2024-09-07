import styles from "./LoginAdmin.module.css";
import Logo from "../../ui/Logo";
import LoginFormAdmin from "../../feature/adminPanel/authentication/LoginFormAdmin";
import Heading from "../../ui/Heading";

function Login() {
  return (
    <main className={styles.loginAdminLayout}>
      <Logo />
      <Heading as="h4"> ورود ادمین</Heading>

      <LoginFormAdmin />
    </main>
  );
}

export default Login;
