import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useVerifyEmail } from "./useVerifyEmail";
import styles from "./VerifyEmailForm.module.css";
import Heading from "../../ui/Heading";
import { useResend } from "./useResend.js";
import Cookies from "js-cookie";

function VerifyEmailForm() {
  const { verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { resend, isPending: isSendingOtp } = useResend();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  function onSubmit({ otp }) {
    verifyEmail(
      { otp },
      {
        onSettled: () => reset(),
      }
    );
  }

  function handleResendOtp() {
    const email = Cookies.get("userEmail");

    setTimer(180);
    setCanResend(false);
    if (!email) return;
    resend({ email });
  }

  return (
    <main className={styles.loginLayout}>
      <Heading as="h4">تایید ایمیل</Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="کد تایید" error={errors?.otp?.message}>
          <Input
            type="text"
            id="otp"
            disabled={isVerifying}
            {...register("otp", {
              required: "این فیلد اجباری است.",
              minLength: {
                value: 6,
                message: "کد تایید باید حداقل 6 کاراکتر باشد.",
              },
            })}
          />
        </FormRow>
        <div className={styles.resendContainer}>
          {canResend ? (
            <a
              onClick={handleResendOtp}
              className={styles.sendAgain}
              disabled={isSendingOtp}
            >
              دریافت مجدد کد{" "}
            </a>
          ) : (
            <p>{formatTime(timer)} مانده تا دریافت مجدد کد</p>
          )}
        </div>
        <FormRow>
          <Button disabled={isVerifying}>تایید</Button>
        </FormRow>
      </Form>
    </main>
  );
}

export default VerifyEmailForm;
