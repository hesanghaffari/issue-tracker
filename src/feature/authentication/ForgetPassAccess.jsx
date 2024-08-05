import { usePass } from "./usePass.js";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function Forget() {
  const { pass, isPending } = usePass();

  function handleSubmit(e) {
    e.preventDefault();
    pass();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "دریافت ایمیل" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default Forget;
