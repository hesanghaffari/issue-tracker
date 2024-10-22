import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import { useEditForm } from "../feature/adminPanel/authentication/useEditForm";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
const phonePattern = /^09\d{9}$/;

function ProfileAdmin() {
  const fullname = Cookies.get("fullname") || "";
  const phone = Cookies.get("phone") || "";
  const { editprofile, isLoading } = useEditForm();
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
        onSettled: () => {
          const updatedFullname = Cookies.get("fullname") || fullname;
          const updatedPhone = Cookies.get("phone") || phone;

          reset({
            fullname: updatedFullname,
            phone: updatedPhone,
          });
        },
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
            disabled={isLoading}
            {...register("fullname", { required: "این فیلد اجباری است." })}
          />
        </FormRow>
        <FormRow label="شماره تماس" error={errors?.phone?.message}>
          <Input
            type="text"
            id="phone"
            disabled={isLoading}
            {...register("phone", {
              pattern: {
                value: phonePattern,
                message: "شماره تماس باید با 09 شروع شده و 11 رقم باشد.",
              },
            })}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isLoading}>ویرایش</Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default ProfileAdmin;
