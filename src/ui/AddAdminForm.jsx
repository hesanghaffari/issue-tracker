import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import { useAddAdmin } from "../feature/adminPanel/ListUsers/useAddAdmin";
import { useState } from "react";

function AddAdminForm({ onCloseModal }) {
  const { addAdmin, isPending } = useAddAdmin();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  function onSubmit({ fullname, email, password }) {
    addAdmin(
      { fullname, email, password },
      {
        onSettled: () => {
          reset(); // Reset the form
          onCloseModal(); // Close the modal after submission
        },
      }
    );
  }

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
              value: /\S+@\S+\.\S+/,
              message: "لطفا یک ایمیل معتبر وارد کنید.",
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
          showtoggle={true} // Enable the eye icon
          onToggle={() => setShowPassword(!showPassword)} // Toggle the visibility
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
          showtoggle={true} // Enable the eye icon for confirmation
          onToggle={() => setShowPasswordConfirm(!showPasswordConfirm)} // Toggle the visibility for confirmation
          {...register("passwordConfirm", {
            required: "این فیلد اجباری است.",
            validate: (value) =>
              value === getValues().password || "رمزعبور یکسان نیست.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isPending}>ثبت نام</Button>
      </FormRow>
    </Form>
  );
}

// Add prop type validation for onCloseModal
AddAdminForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default AddAdminForm;
