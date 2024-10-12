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
import { updateMom } from "../../../services/apiAuth"; // Import the update API call
import { getMomadminById } from "../../../services/apiTicket"; // Import the API call for fetching the Mom details

function EditMomForm({ momId, onCloseModal, isPending, onSuccess }) {
  // Removed useParams and used momId prop instead
  const { register, formState, handleSubmit, reset, setValue } = useForm();
  const { errors } = formState;
  const [selectedDate, setSelectedDate] = useState(null); // Use state for date
  const [loading, setLoading] = useState(false); // For indicating loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch Mom details and pre-fill the form
  useEffect(() => {
    async function fetchMomDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMomadminById(momId);
        if (data) {
          // Prefill form with Mom data
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("daart", data.daart);
          setValue("webengage", data.webengage);
          setValue("customer", data.customer);
          setValue("company", data.company);
          setValue("userId", data.userId);
          setSelectedDate(data.date); // Ensure correct date format for DatePickerMom
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

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toString() : null); // Safeguard against null dates
  };

  // Handle company selection
  const handleCompanySelect = (selectedUserId, selectedCompanyName) => {
    setValue("company", selectedCompanyName); // Set selected company name
    setValue("userId", selectedUserId); // Set selected userId
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    const updatedMom = {
      ...formData,
      date: selectedDate, // Include selected date
    };

    try {
      await updateMom(momId, updatedMom); // Update Mom details
      reset(); // Reset form after successful submission
      onCloseModal(); // Close the modal
      if (onSuccess) onSuccess(); // Trigger the onSuccess callback if provided
    } catch (updateError) {
      setError("Error updating the Mom. Please try again."); // Handle update error
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p className="error">{error}</p>} {/* Show errors */}
      {!loading && (
        <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <FormRow label="موضوع" error={errors?.title?.message}>
            <Input
              type="text"
              id="title"
              disabled={isPending}
              {...register("title", { required: "این فیلد اجباری است." })}
            />
          </FormRow>

          {/* Description */}
          <FormRow label="دستورکار" error={errors?.description?.message}>
            <Input
              type="text"
              id="description"
              disabled={isPending}
              {...register("description", { required: "این فیلد اجباری است." })}
            />
          </FormRow>

          {/* Date */}
          <FormRow label="تاریخ" error={errors?.date?.message}>
            <DatePickerMom
              selectedDate={selectedDate}
              onDateChange={handleDateChange} // Handle date change
            />
          </FormRow>

          {/* Company */}
          <FormRow label="شرکت" error={errors?.company?.message}>
            <CustomSortBy onCompanySelect={handleCompanySelect} />
          </FormRow>

          {/* Daart */}
          <FormRow label="دارت" error={errors?.daart?.message}>
            <Textarea
              type="number"
              id="daart"
              disabled={isPending}
              {...register("daart", { required: "این فیلد اجباری است." })}
            />
          </FormRow>

          {/* Customer */}
          <FormRow label="کلاینت" error={errors?.customer?.message}>
            <Textarea
              type="number"
              id="customer"
              disabled={isPending}
              {...register("customer", { required: "این فیلد اجباری است." })}
            />
          </FormRow>

          {/* WebEngage */}
          <FormRow label="وب انگیج" error={errors?.webengage?.message}>
            <Textarea
              type="number"
              id="webengage"
              disabled={isPending}
              {...register("webengage", { required: "این فیلد اجباری است." })}
            />
          </FormRow>

          {/* Submit Button */}
          <FormRow>
            <Button disabled={isPending}>ویرایش</Button>
          </FormRow>
        </Form>
      )}
    </>
  );
}

EditMomForm.propTypes = {
  momId: PropTypes.string.isRequired, // Ensure momId is passed as a prop
  onCloseModal: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  onSuccess: PropTypes.func, // Success callback to trigger data refresh
};

export default EditMomForm;
