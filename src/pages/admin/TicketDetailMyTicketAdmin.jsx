import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTicketAdminById,
  submitReply,
  getRepliesByTicketId,
  finishTicket,
} from "../../services/apiTicket";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./TicketDetailAdmin.module.css";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import moment from "moment-jalaali";
import { toast } from "react-hot-toast";

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

  // Mutation for finishing the ticket
  const finishTicketMutation = useMutation({
    mutationFn: (ticketId) => finishTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets", ticketId]);
      toast.success("تیکت با موفقیت به پایان رسید.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFinishTicket = () => {
    finishTicketMutation.mutate(ticketId);
  };

  const onSubmit = (data) => {
    const userRole = Cookies.get("userRole");

    const userName = Cookies.get("fullname");
    mutation.mutate({
      message: data.reply,
      user: userName,
      role: userRole,
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load ticket details.</p>;
  if (!ticket) return <Empty resourceName="Ticket" />;

  const userName = Cookies.get("fullname");

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
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            onClick={handleFinishTicket}
            disabled={ticket.endDate || finishTicketMutation.isLoading}
            variation="danger"
            size="small"
          >
            {ticket.endDate
              ? "بسته شده"
              : finishTicketMutation.isLoading
              ? "در حال انجام..."
              : "بستن تیکت"}
          </Button>
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
          <strong>تاریخ ثبت :</strong>
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

        {/* Disable reply form if ticket is closed */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            {...register("reply")}
            placeholder="اینجا یادداشت کنید ..."
            disabled={ticket.endDate} // Disable textarea if endDate is present
          />
          <Button type="submit" disabled={isLoading || ticket.endDate}>
            ثبت
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetailAdmin;
