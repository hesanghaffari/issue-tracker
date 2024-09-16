import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTicketById,
  submitReply,
  getRepliesByTicketId,
} from "../services/apiTicket";

import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./TicketDetail.module.css";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow"; // Import FormRow
import moment from "moment-jalaali";

function TicketDetail() {
  const { ticketId } = useParams();
  const queryClient = useQueryClient();
  const characterLimit = 1000; // Define character limit

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

  const { register, handleSubmit, watch, reset, formState } = useForm();
  const { errors } = formState;

  const mutation = useMutation({
    mutationFn: (newReply) => submitReply(ticketId, newReply),
    onSuccess: () => {
      queryClient.invalidateQueries(["replies", ticketId]);
      reset(); // Reset the form after submission
    },
  });

  const onSubmit = (data) => {
    const userRole = Cookies.get("userRole");
    const userName = Cookies.get("fullname");
    mutation.mutate({
      message: data.reply,
      user: userName,
      role: userRole,
    });
  };

  const replyValue = watch("reply") || ""; // Watch the reply input
  const isReplyTooLong = replyValue.length > characterLimit; // Check if it exceeds the limit

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load ticket details.</p>;
  if (!ticket) return <Empty resourceName="Ticket" />;

  const userName = Cookies.get("fullname"); // Get the logged-in user's name

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

              // Define file type categories
              const imageFormats = ["jpg", "jpeg", "png", "gif"];
              const videoFormats = ["mp4", "webm", "ogg"];

              // Extract the file name from the URL
              const fileName = file.split("/").pop();

              return (
                <div key={index} className={styles.attachmentItem}>
                  {imageFormats.includes(fileExtension) ? (
                    // Show image preview
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
                    // Show video preview
                    <video controls className={styles.attachmentVideo}>
                      <source src={file} type={`video/${fileExtension}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    // Show file name as a link for other formats
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
                const isUserReply = reply.user === userName;
                const replyClassName = isUserReply
                  ? styles.replyRight
                  : styles.replyLeft;

                return (
                  <div
                    key={reply._id}
                    className={`${styles.reply} ${replyClassName}`}
                  >
                    <strong>{reply.user}</strong>
                    <p>{reply.message}</p>
                    <small>
                      {moment(reply.timestamp).format("jYYYY/jMM/jDD HH:mm:ss")}
                    </small>
                  </div>
                );
              })
            ) : (
              <div className={styles.noReplies}>پاسخی موجود نیست </div>
            )}
          </div>
        )}

        {/* Disable reply form if ticket is closed (has endDate) */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.noline}>
            <FormRow
              label="توضیحات"
              error={errors?.reply?.message}
              className={styles.noline}
            >
              <Textarea
                id="reply"
                {...register("reply", { maxLength: characterLimit })}
                placeholder="اینجا یادداشت کنید ..."
                disabled={ticket.endDate}
              />
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
            disabled={isLoading || ticket.endDate || isReplyTooLong}
          >
            ثبت
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetail;
