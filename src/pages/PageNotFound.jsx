import styles from "./PageNotFound.module.css";
import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className={styles.styledPageNotFound}>
      <div className={styles.box}>
        <Heading as="h1">صفحه مورد نظر شما یافت نشد. 😢</Heading>
        <Button onClick={moveBack} size="large">
          بازگشت &larr;
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
