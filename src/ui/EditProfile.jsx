import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import { useEditForm } from "../feature/adminPanel/authentication/useEditForm";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import js-cookie

function ProfileAdmin() {
  const fullname = Cookies.get("fullname") || ""; // Default to empty string if not found
  const { editprofile, isPending } = useEditForm();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      fullname: fullname,
    },
  });
  const { errors } = formState;

  function onSubmit({ fullname }) {
    editprofile(
      { fullname },
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

        <FormRow>
          <Button disabled={isPending}>ویرایش</Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default ProfileAdmin;
