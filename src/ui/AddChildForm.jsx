import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import { useState } from "react";
const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com"];

function AddChildForm({ onCloseModal, addAdmin, isPending }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  function onSubmit({ fullname, email, password, company, licenseCode }) {
    addAdmin(
      { fullname, email, password, company, licenseCode },
      {
        onSettled: () => {
          reset(); // Reset the form
          onCloseModal(); // Close the modal after submission
        },
      }
    );
  }
  const emailPattern = new RegExp(
    `^[a-zA-Z0-9._%+-]+@((?!${commonDomains.join("|")}).)*$`
  );
  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام و نام خانوادگی" error={errors?.fullname?.message}>
        <Input
          type="text"
          id="fullname"
          disabled={isPending}
          {...register("fullname", { required: "این فیلد اجباری است." })}
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
              value: emailPattern,
              message: "لطفا از ایمیل سازمانی استفاده کنید.",
            },
          })}
        />
      </FormRow>
      <FormRow label="شرکت" error={errors?.company?.message}>
        <Input
          type="text"
          id="company"
          disabled={isPending}
          {...register("company", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="لایسنس‌کد" error={errors?.licenseCode?.message}>
        <Input
          type="text"
          id="licenseCode"
          disabled={isPending}
          {...register("licenseCode", {
            required: "این فیلد اجباری است.",
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
        <Button disabled={isPending}>ثبت</Button>
      </FormRow>
    </Form>
  );
}

AddChildForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default AddChildForm;
