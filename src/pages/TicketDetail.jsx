import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTicketById,
  submitReply,
  getRepliesByTicketId,
} from "../services/apiTicket";
import { toast } from "react-hot-toast";
import { useState } from "react";

import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./TicketDetail.module.css";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import moment from "moment-jalaali";

function TicketDetail() {
  const { ticketId } = useParams();
  const queryClient = useQueryClient();
  const characterLimit = 1000;
  const [fileError, setFileError] = useState("");

  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicketById(ticketId),
  });

  const { isLoading: isRepliesLoading, data: replies } = useQuery({
    queryKey: ["replies", ticketId],
    queryFn: () => getRepliesByTicketId(ticketId),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState,
    setError,
    clearErrors,
  } = useForm();
  const { errors } = formState;

  const { mutate, isPending: isSubmiting } = useMutation({
    mutationFn: (newReply) => submitReply(ticketId, newReply),
    onSuccess: () => {
      queryClient.invalidateQueries(["replies", ticketId]);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const userRole = Cookies.get("userRole");
    const userName = Cookies.get("fullname");
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

    formData.append("message", data.reply);
    formData.append("user", userName);
    formData.append("role", userRole);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    mutate(formData);
  }
  const replyValue = watch("reply") || "";
  const isReplyTooLong = replyValue.length > characterLimit;

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load ticket details.</p>;
  if (!ticket) return <Empty resourceName="Ticket" />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{ticket.requestTitle}</h2>
          <p className={styles.ticketNumber}>
            شماره تیکت #{ticket.ticketNumber}
          </p>
        </div>
        <div className={styles.userInfo}>
          <strong>{ticket.fullName}</strong>
          <p className={styles.email}>{ticket.email}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <strong>شرکت:</strong>
          <span>{ticket.company}</span>
        </div>
        <div className={styles.detailRow}>
          <strong>لایسنس کد:</strong>
          <span>{ticket.licenseCode}</span>
        </div>
        <div className={styles.detailRow}>
          <strong>نوع تیکت:</strong>
          <span>{ticket.problemType}</span>
        </div>
        <div className={styles.detailRow}>
          <strong>تاریخ ثبت تیکت:</strong>
          <span>
            {moment(ticket.createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}
          </span>
        </div>
        <div className={styles.detailRow}>
          <strong>مدت زمان ارور:</strong>
          <span>{ticket.errorTime}</span>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <h3>توضیحات ایشو</h3>
        <p className={styles.description}>{ticket.request}</p>
      </div>
      {ticket.attachmentFiles.length > 0 && (
        <div className={styles.attachments}>
          <h3>پیوست ها</h3>
          <div className={styles.attachmentList}>
            {ticket.attachmentFiles.map((file, index) => {
              const fileExtension = file.split(".").pop().toLowerCase();

              const imageFormats = ["jpg", "jpeg", "png", "gif"];
              const videoFormats = ["mp4", "webm", "ogg"];

              const fileName = file.split("/").pop();

              return (
                <div key={index} className={styles.attachmentItem}>
                  {imageFormats.includes(fileExtension) ? (
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.attachmentLink}
                    >
                      <img
                        src={file}
                        alt={`Attachment ${index + 1}`}
                        className={styles.attachmentImage}
                      />
                    </a>
                  ) : videoFormats.includes(fileExtension) ? (
                    <video controls className={styles.attachmentVideo}>
                      <source src={file} type={`video/${fileExtension}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.attachmentLink}
                    >
                      {fileName}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.repliesSection}>
        {isRepliesLoading ? (
          <Spinner />
        ) : (
          <div>
            {replies.length > 0 ? (
              replies.map((reply) => {
                const replyRole = reply.role; // Assuming `role` is a property in the reply object
                const isAdminOrSuperAdmin =
                  replyRole === "admin" || replyRole === "superadmin";

                // Determine if the message is from the current user

                // Use the appropriate class for alignment (Left or Right)

                // Use conditional styling for background color based on role
                const roleClassName = isAdminOrSuperAdmin
                  ? styles.replyRight
                  : styles.replyLeft;

                return (
                  <div
                    key={reply._id}
                    className={`${styles.reply} ${roleClassName}`}
                  >
                    <strong>{reply.user}</strong>
                    <p>{reply.message}</p>
                    <small>
                      {moment(reply.timestamp).format("jYYYY/jMM/jDD HH:mm:ss")}
                    </small>

                    {reply.attachmentFiles?.length > 0 && (
                      <div className={styles.replyAttachments}>
                        {reply.attachmentFiles.map((file, index) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.attachmentLink}
                          >
                            {`پیوست ${index + 1}`}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={styles.noReplies}>پاسخی موجود نیست</div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.noline}>
            <FormRow
              label="توضیحات"
              error={errors?.reply?.message}
              className={styles.noline}
            >
              <Textarea
                id="reply"
                {...register("reply", {
                  maxLength: characterLimit,
                  required: "این فیلد اجباری است.",
                })}
                placeholder="اینجا یادداشت کنید ..."
                disabled={ticket.endDate || isSubmiting}
              />
            </FormRow>
            <FormRow error={fileError || errors?.image?.message}>
              <div className={styles.fileUploadWrapper}>
                <label htmlFor="image" className={styles.fileUploadLabel}>
                  <i className="fa fa-paperclip"></i>
                  <span>آپلود فایل</span>
                </label>
                <input
                  type="file"
                  id="image"
                  multiple
                  accept="*/*"
                  {...register("image")}
                  className={styles.fileInputHidden}
                  disabled={isSubmiting || ticket.endDate}
                />
              </div>
              {watch("image") && watch("image").length > 0 && (
                <div className={styles.fileSelectedInfo}>
                  {watch("image").length} فایل انتخاب شده
                </div>
              )}
            </FormRow>

            <span className={styles.countertext}>
              {replyValue.length}/{characterLimit}
            </span>
            {isReplyTooLong && (
              <p className={styles.errorMessage}>
                پیام شما از ۱۰۰۰ کاراکتر بیشتر نمی‌تواند باشد.
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmiting || ticket.endDate || isReplyTooLong}
          >
            {isSubmiting ? "در حال ارسال..." : "ارسال"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetail;
