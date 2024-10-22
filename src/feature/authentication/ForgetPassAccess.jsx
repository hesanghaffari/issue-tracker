import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdatePass } from "./useUpdatePass";
import SpinnerMini from "../../ui/SpinnerMini";
import { useParams } from "react-router-dom";
import styles from "./ForgetPassAccess.module.css";
import Heading from "../../ui/Heading.jsx";

function ForgetPassAccess() {
  const { updatepass, isPending } = useUpdatePass();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { token } = useParams();
  function onSubmit({ password }) {
    updatepass(
      { password, token },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <main className={styles.main}>
      <Heading as="h1">تغییر رمزعبور</Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="رمزعبور(حداقل 8 کاراکتر)"
          error={errors?.password?.message}
        >
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            disabled={isPending}
            showtoggle={true}
            onToggle={() => setShowPassword(!showPassword)}
            {...register("password", {
              required: "این فیلد اجباری است.",
              minLength: {
                value: 8,
                message: "رمزعبور باید حداقل 8 کاراکتر باشد.",
              },
            })}
          />
        </FormRow>

        <FormRow label="تکرار رمزعبور" error={errors?.passwordConfirm?.message}>
          <Input
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordConfirm"
            disabled={isPending}
            showtoggle={true}
            onToggle={() => setShowPasswordConfirm(!showPasswordConfirm)}
            {...register("passwordConfirm", {
              required: "این فیلد اجباری است.",
              validate: (value) =>
                value === getValues().password || "رمزعبور یکسان نیست.",
            })}
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            disabled={isPending}
            onClick={reset}
          >
            شروع مجدد{" "}
          </Button>
          <Button disabled={isPending}>
            {!isPending ? " ثبت" : <SpinnerMini />}
          </Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default ForgetPassAccess;
