import { useState, useEffect } from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { NavLink } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending } = useLogin();

  useEffect(() => {}, [isPending]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
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
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label="رمزعبور">
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          showtoggle={true}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "تایید و ادامه" : <SpinnerMini />}
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <NavLink to="/Users">
          <span>هنوز ثبت نام نکرده‌اید؟</span>
        </NavLink>
      </FormRowVertical>

      <FormRowVertical>
        <NavLink to="/forgetpass">
          <span>رمز عبورتان را فراموش کرده‌اید؟</span>
        </NavLink>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
