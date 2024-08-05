import { useState, useEffect } from "react";
import { useLoginAdmin } from "./useLoginAdmin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginFormAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin, isPending } = useLoginAdmin();
  useEffect(() => {
    console.log("LoginForm isPending:", isPending);
  }, [isPending]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    loginAdmin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
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
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label="رمزعبور">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "تایید و ادامه" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginFormAdmin;
