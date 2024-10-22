import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/Textarea";
import DatePickerMom from "../../../ui/DatePickerMom";
import CustomSortBy from "../../../ui/CustomSortBy";
import { useEffect, useState } from "react";
import { updateMom } from "../../../services/apiAuth";
import { getMomadminById } from "../../../services/apiTicket";

function EditMomForm({ momId, onCloseModal, isPending, onSuccess }) {
  const { register, formState, handleSubmit, reset, setValue } = useForm();
  const { errors } = formState;
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMomDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMomadminById(momId);
        if (data) {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("daart", data.daart);
          setValue("webengage", data.webengage);
          setValue("customer", data.customer);
          setValue("company", data.company);
          setValue("userId", data.userId);
          setSelectedDate(data.date);
        }
      } catch (fetchError) {
        setError("Error fetching Mom details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (momId) {
      fetchMomDetails();
    }
  }, [momId, setValue]);

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toString() : null);
  };

  const handleCompanySelect = (selectedUserId, selectedCompanyName) => {
    setValue("company", selectedCompanyName);
    setValue("userId", selectedUserId);
  };

  const onSubmit = async (formData) => {
    const updatedMom = {
      ...formData,
      date: selectedDate,
    };

    try {
      await updateMom(momId, updatedMom);
      reset();
      onCloseModal();
      if (onSuccess) onSuccess();
    } catch (updateError) {
      setError("Error updating the Mom. Please try again.");
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && (
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
              selectedDate={selectedDate}
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
            <Button disabled={isPending}>ویرایش</Button>
          </FormRow>
        </Form>
      )}
    </>
  );
}

EditMomForm.propTypes = {
  momId: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  onSuccess: PropTypes.func,
};

export default EditMomForm;
