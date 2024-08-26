import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTicketAdminById,
  assignTicketToUser,
} from "../../services/apiTicket";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useParams } from "react-router-dom";
import styles from "./TicketDetailAdmin.module.css";
import moment from "moment-jalaali";
import Button from "../../ui/Button";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function TicketDetailAdmin() {
  const { ticketId } = useParams();
  const queryClient = useQueryClient();

  // Fetch the ticket details
  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => getTicketAdminById(ticketId),
  });

  // Mutation to assign the ticket
  const assignTicketMutation = useMutation({
    mutationFn: ({ ticketId, email }) => {
      return assignTicketToUser(ticketId, email); // Return the result
    },
    onSuccess: () => {
      // Invalidate the ticket query to refresh the data
      queryClient.invalidateQueries(["tickets", ticketId]); // Fix the query key
      toast.success("گردن گرفتیش...");
    },
    onError: (error) => {
      toast.error(error.message); // Display the error message
    },
  });

  // Handle button click to assign the ticket
  const handleAssignTicket = () => {
    const email = Cookies.get("userEmail");
    if (!email) {
      alert("User email not found in cookies.");
      return;
    }
    assignTicketMutation.mutate({ ticketId, email });
  };

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
        <div>
          <Button
            onClick={handleAssignTicket}
            disabled={assignTicketMutation.isLoading}
          >
            {assignTicketMutation.isLoading ? "در حال انجام..." : "گردن میگیرم"}
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
    </div>
  );
}

export default TicketDetailAdmin;
