import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import Textarea from "./Textarea";
import DatePickerMom from "./DatePickerMom";
import CustomSortBy from "./CustomSortBy"; 
import { useState } from "react";

function AddMomForm({ onCloseModal, addAdmin, isPending }) {
  const { register, formState, handleSubmit, reset, setValue } = useForm();
  const { errors } = formState;
  const [selectedDate, setSelectedDate] = useState(null); 
  const handleDateChange = (date) => {
    setSelectedDate(date.toString());
  };

  function handleCompanySelect(selectedUserId, selectedCompanyName) {
    setValue("company", selectedCompanyName); 
    setValue("userId", selectedUserId); 
  }

  function onSubmit({
    title,
    description,
    password,
    daart,
    webengage,
    customer,
    company,
    userId,
  }) {
    if (company === "") {
      alert("Please select a valid company");
      return;
    }

    addAdmin(
      {
        title,
        description,
        password,
        daart,
        webengage,
        customer,
        date: selectedDate,
        company,
        userId,
      },
      {
        onSettled: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="موضوع" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          disabled={isPending}
          {...register("title", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow label="دستورکار" error={errors?.description?.message}>
        <Input
          type="text"
          id="description"
          disabled={isPending}
          {...register("description", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow label="تاریخ" error={errors?.date?.message}>
        <DatePickerMom
          type="date"
          id="date"
          disabled={isPending}
          onDateChange={handleDateChange} 
        />
      </FormRow>

      <FormRow label="شرکت" error={errors?.company?.message}>
        <CustomSortBy onCompanySelect={handleCompanySelect} />
      </FormRow>

      <FormRow label="دارت" error={errors?.daart?.message}>
        <Textarea
          type="number"
          id="daart"
          disabled={isPending}
          {...register("daart", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow label="کلاینت" error={errors?.customer?.message}>
        <Textarea
          type="number"
          id="customer"
          disabled={isPending}
          {...register("customer", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow label="وب انگیج" error={errors?.webengage?.message}>
        <Textarea
          type="number"
          id="webengage"
          disabled={isPending}
          {...register("webengage", { required: "این فیلد اجباری است." })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isPending}>ثبت</Button>
      </FormRow>
    </Form>
  );
}

AddMomForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default AddMomForm;
