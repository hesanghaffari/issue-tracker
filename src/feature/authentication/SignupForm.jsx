import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
const phonePattern = /^09\d{9}$/;

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // State variables to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  function onSubmit({
    fullname,
    email,
    password,
    company,
    licenseCode,
    phone,
  }) {
    signup(
      { fullname, email, password, company, licenseCode, phone },
      {
        onSettled: () => reset(),
      }
    );
  }

  // const emailPattern = new RegExp(
  //   `^[a-zA-Z0-9._%+-]+@((?!${commonDomains.join("|")}).)*$`
  // );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام و نام خانوادگی" error={errors?.fullname?.message}>
        <Input
          type="text"
          id="fullname"
          disabled={isPending}
          {...register("fullname", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow label="نام سازمان" error={errors?.company?.message}>
        <Input
          type="text"
          id="company"
          disabled={isPending}
          {...register("company", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="لایسنس کد" error={errors?.licenseCode?.message}>
        <Input
          type="text"
          id="licenseCode"
          disabled={isPending}
          {...register("licenseCode", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="ایمیل" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "این فیلد اجباری است.",
            pattern: {
              // emailPattern
              // /لطفا از ایمیل سازمانی استفاده کنید.
              value: /\S+@\S+\.\S+/,
              message: "لطفا از ایمیل معتبر استفاده کنید.",
            },
          })}
        />
      </FormRow>

      <FormRow label="شماره تماس" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isPending}
          {...register("phone", {
            pattern: {
              value: phonePattern,
              message: "شماره تماس باید با 09 شروع شده و 11 رقم باشد.",
            },
          })}
        />
      </FormRow>

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
        <Button disabled={isPending}>
          {!isPending ? " ثبت نام" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
