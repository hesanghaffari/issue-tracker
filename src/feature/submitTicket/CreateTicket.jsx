import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import FormRow from "../../ui/FormRow";
import ResponsiveFormRowGroup from "../../ui/ResponsiveFormRowGroup";
import { ticket } from "../../services/apiTicket";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CreateTicket.module.css";

function CreateTicket() {
  const { register, handleSubmit, reset, formState, setError, clearErrors } =
    useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: ticket,
    onSuccess: () => {
      toast.success("تیکت شما با موفقیت ثبت شد.");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      reset();
      setFileError("");
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const files = data.image;
    let totalSize = 0;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
      }

      if (totalSize > 20 * 1024 * 1024) {
        setFileError("مجموع حجم فایل‌ها نمی‌تواند بیشتر از ۲۰ مگابایت باشد.");
        setError("image", {
          type: "manual",
          message: "مجموع حجم فایل‌ها بیشتر از ۲۰ مگابایت است.",
        });
        return;
      } else {
        clearErrors("image");
        setFileError("");
      }
    }

    const formData = new FormData();

    formData.append("fullName", data.name);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("licenseCode", data.license);
    formData.append("problemType", data.typeissue);
    formData.append("request", data.description);
    formData.append("requestTitle", data.title);
    formData.append("errorTime", data.errorTime);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    mutate(formData);
  }

  function onError() {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} maxWidth="2000px">
      <ResponsiveFormRowGroup>
        <FormRow
          label="نام و نام‌خانوادگی"
          error={errors?.name?.message}
          className={styles.customRow}
        >
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
      </ResponsiveFormRowGroup>

      <ResponsiveFormRowGroup>
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
      </ResponsiveFormRowGroup>

      <FormRow label="نوع تیکت" error={errors?.typeissue?.message}>
        <Select
          options={[
            { value: "", label: "انتخاب کنید" },
            { value: "فنی", label: "فنی" },
            { value: "استفاده از داشبورد", label: "استفاده از داشبورد" },
            { value: "طراحی جرنی", label: "طراحی جرنی" },
            { value: "آنالیز و گزارش", label: "آنالیز و گزارش" },
            { value: "مالی", label: "مالی" },
          ]}
          type="white"
          disabled={isCreating}
          {...register("typeissue", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>
      <FormRow
        label="چند وقت است که با این خطا مواجه هستید؟"
        error={errors?.errortime?.message}
      >
        <Select
          options={[
            { value: "", label: "انتخاب کنید" },
            { value: "زیر یک هفته", label: "زیر یک هفته" },
            { value: "1 الی 2 هفته", label: "1 الی 2 هفته" },
            { value: "2 الی 3 هفته", label: "2 الی 3 هفته" },
            { value: "3 الی 4 هفته", label: "3 الی 4 هفته" },
          ]}
          type="white"
          disabled={isCreating}
          {...register("errortime", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>
      <FormRow label="موضوع تیکت" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          disabled={isCreating}
          {...register("title", {
            required: "این فیلد اجباری است.",
          })}
        />
      </FormRow>

      <FormRow
        label="توضیحات تیکت"
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

      <FormRow label="آپلود فایل" error={fileError || errors?.image?.message}>
        <FileInput
          id="image"
          accept="*/*"
          disabled={isCreating}
          {...register("image")}
        />
      </FormRow>

      <FormRow className={styles.buttonRow}>
        <Button variation="secondary" type="reset">
          لغو
        </Button>
        <Button disabled={isCreating}>ثبت</Button>
      </FormRow>
    </Form>
  );
}

export default CreateTicket;
