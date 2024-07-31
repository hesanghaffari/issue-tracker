import styles from "./Login.module.css";
import LoginForm from "../feature/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

function Login() {
  return (
    <main className={styles.loginLayout}>
      <Logo />
      <Heading as="h4">ورود یا ثبت نام</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
