import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { ticket } from "../../services/apiTicket";

function CreateTicket() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: ticket,
    onSuccess: () => {
      toast.success("تیکت شما با موفقیت ثبت شد.");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="نام و نام‌خانوادگی" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="ایمیل" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "این فیلد اجباری است.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "لطفا یک ایمیل معتبر وارد کنید.",
            },
          })}
        />
      </FormRow>

      <FormRow label="شرکت" error={errors?.company?.message}>
        <Input
          type="text"
          id="company"
          disabled={isCreating}
          {...register("company", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="لایسنس‌کد" error={errors?.license?.message}>
        <Input
          type="text"
          id="license"
          disabled={isCreating}
          {...register("license", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>
      <FormRow label="نوع تیکت" error={errors?.type?.message}>
        <Select
          options={[
            { value: "technical", label: "فنی" },
            { value: "useability", label: "استفاده از داشبورد" },
            { value: "Customer journey designing", label: "طراحی جرنی" },
            { value: "analyze and report", label: "آنالیز و گزارش" },
            { value: "Payment", label: "مالی" },
          ]}
          type="white"
          id="type"
          disabled={isCreating}
          {...register("type", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>
      <FormRow
        label="توضیحات ایشو"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow label="آپلود فایل">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateTicket;
