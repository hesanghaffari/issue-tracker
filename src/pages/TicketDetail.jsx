import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../services/apiTicket";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

function TicketDetail() {
  const { ticketId } = useParams();

  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicketById(ticketId),
  });
  console.log(ticket);
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load ticket details.</p>;
  if (!ticket) return <Empty resourceName="Ticket" />;

  return (
    <div>
      <h2>{ticket.requestTitle}</h2>
      <p>
        <strong>Company:</strong> {ticket.company}
      </p>
      <p>
        <strong>License Code:</strong> {ticket.licenseCode}
      </p>
      <p>
        <strong>Problem Type:</strong> {ticket.problemType}
      </p>
      {/* Add more details as required */}
    </div>
  );
}

export default TicketDetail;
