import styles from "./ForgetPass.module.css";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Forget from "../feature/authentication/Forget";

function ForgetPass() {
  return (
    <main className={styles.ForgetPassLayout}>
      <Logo />
      <Heading as="h4">فراموشی رمز عبور</Heading>
      <Heading as="h5">
        برای بازیابی کلمه عبور آدرس ایمیل خود را وارد کنید.
      </Heading>
      <Forget />
    </main>
  );
}

export default ForgetPass;
