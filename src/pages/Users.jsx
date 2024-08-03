import styles from "./Users.module.css";
import SignupForm from "../feature/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <main className={styles.UsersLayout}>
      <Heading as="h1">ثبت نام</Heading>
      <SignupForm />
    </main>
  );
}

export default NewUsers;
