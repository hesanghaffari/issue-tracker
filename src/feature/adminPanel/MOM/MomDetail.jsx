import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMomadminById } from "../../../services/apiTicket";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import { useParams } from "react-router-dom";
import styles from "./DetailMom.module.css";
import moment from "moment-jalaali";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import EditMomForm from "./EditMomForm";

function DetailMom() {
  const { momId } = useParams();
  const queryClient = useQueryClient(); // Use queryClient to invalidate queries
  const {
    isLoading,
    data: mom,
    error,
  } = useQuery({
    queryKey: ["moms", momId],
    queryFn: () => getMomadminById(momId),
  });

  const handleEditSuccess = () => {
    queryClient.invalidateQueries(["moms", momId]); // Invalidate and refresh mom details
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load mom details.</p>;
  if (!mom) return <Empty resourceName="Mom" />;

  return (
    <div className={styles.container}>
      <div>
        <Modal>
          <Modal.Open opens="EditMomForm">
            <Button>ویرایش صورت جلسه</Button>
          </Modal.Open>

          <Modal.Window name="EditMomForm">
            <EditMomForm
              momId={momId}
              onCloseModal={() => close()}
              onSuccess={handleEditSuccess}
            />
          </Modal.Window>
        </Modal>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>{mom.title || "Mom Details"}</h2>
        <p className={styles.description}>{mom.description}</p>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h3>WebEngage Side</h3>
          <p>{mom.webengage}</p>
        </div>

        <div className={styles.section}>
          <h3>Customer Side</h3>
          <p>{mom.customer}</p>
        </div>

        <div className={styles.section}>
          <h3>Daart Side</h3>
          <p>{mom.daart}</p>
        </div>
      </div>

      <div className={styles.timestamp}>
        <strong>تاریخ ثبت :</strong>
        <span>{moment(mom.timestamp).format("jYYYY/jMM/jDD HH:mm:ss")}</span>
      </div>
    </div>
  );
}

export default DetailMom;
