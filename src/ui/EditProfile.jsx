import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import { useEditForm } from "../feature/adminPanel/authentication/useEditForm";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import js-cookie
const phonePattern = /^09\d{9}$/; // Phone must start with 09 and be 11 digits

function ProfileAdmin() {
  const fullname = Cookies.get("fullname") || ""; // Default to empty string if not found
  const phone = Cookies.get("phone") || ""; // Default to empty string if not found
  const { editprofile, isPending } = useEditForm();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      fullname: fullname,
      phone: phone,
    },
  });
  const { errors } = formState;

  function onSubmit({ fullname, phone }) {
    editprofile(
      { fullname, phone },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <main>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="نام و نام خانوادگی" error={errors?.fullname?.message}>
          <Input
            type="text"
            id="fullname"
            disabled={isPending}
            {...register("fullname", { required: "این فیلد اجباری است." })}
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
        <FormRow>
          <Button disabled={isPending}>ویرایش</Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default ProfileAdmin;