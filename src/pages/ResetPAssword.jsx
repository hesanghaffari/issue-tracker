import { usePass } from "./usePass.js";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function ResetPassword() {
  const { pass, isPending } = usePass();

  function handleSubmit(e) {
    e.preventDefault();
    pass();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "ورود به داشبورد" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPassword;
