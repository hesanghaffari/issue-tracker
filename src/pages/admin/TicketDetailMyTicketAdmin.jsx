import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTicketAdminById,
  submitReply,
  getRepliesByTicketId,
} from "../../services/apiTicket";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./TicketDetailAdmin.module.css";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import moment from "moment-jalaali";

function TicketDetailAdmin() {
  const { ticketId } = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => getTicketAdminById(ticketId),
  });

  const { isLoading: isRepliesLoading, data: replies } = useQuery({
    queryKey: ["replies", ticketId],
    queryFn: () => getRepliesByTicketId(ticketId),
  });

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: (newReply) => submitReply(ticketId, newReply),
    onSuccess: () => {
      queryClient.invalidateQueries(["replies", ticketId]);
      reset();
    },
  });

  const onSubmit = (data) => {
    const userName = Cookies.get("fullname");
    mutation.mutate({
      message: data.reply,
      user: userName,
    });
  };

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
            {ticket.attachmentFiles.map((file, index) => (
              <div key={index} className={styles.attachmentItem}>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.attachmentLink}
                >
                  <img
                    src={file}
                    alt={index + 1}
                    className={styles.attachmentImage}
                  />
                </a>
              </div>
            ))}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            {...register("reply")}
            placeholder="هر چی میخوای بنویس برام ..."
          />
          <Button type="submit" disabled={isLoading}>
            ثبت
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetailAdmin;
