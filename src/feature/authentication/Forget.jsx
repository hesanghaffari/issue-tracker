import { useState } from "react";
import { usePass } from "./usePass.js";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function Forget() {
  const [email, setEmail] = useState("");
  const { pass, isPending } = usePass();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    pass(
      { email },
      {
        onSettled: () => {
          setEmail("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="ایمیل">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "دریافت ایمیل" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default Forget;
