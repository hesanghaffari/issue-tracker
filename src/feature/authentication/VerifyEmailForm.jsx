import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useVerifyEmail } from "./useVerifyEmail";
import styles from "./VerifyEmailForm.module.css";
import Heading from "../../ui/Heading";
function VerifyEmailForm() {
  const { verifyEmail, isPending } = useVerifyEmail();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ otp }) {
    verifyEmail(
      { otp },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <main className={styles.loginLayout}>
      <Heading as="h4">تایید ایمیل</Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="کد تایید" error={errors?.otp?.message}>
          <Input
            type="text"
            id="otp"
            disabled={isPending}
            {...register("otp", {
              required: "این فیلد اجباری است.",
              minLength: {
                value: 6,
                message: "کد تایید باید حداقل 6 کاراکتر باشد.",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Button disabled={isPending}>تایید</Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default VerifyEmailForm;
