import { useMutation } from "@tanstack/react-query";
import { exportTicketsExcel } from "../../../services/apiTicket";
import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import Search from "../../../ui/Search";
import ShamsiDatePicker from "../../../ui/ShamsiDatePicker";
import Button from "../../../ui/Button";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import styles from "./TicketTableOperations.module.css";

function TicketTableOperations({ showExcelButton = true }) {
  // Mutation to download the Excel file
  const downloadExcelMutation = useMutation({
    mutationFn: exportTicketsExcel,
    onSuccess: () => {
      toast.success("اکسل تیکت‌ها با موفقیت دانلود شد.");
    },
    onError: () => {
      toast.error("خطایی در دانلود فایل رخ داد.");
    },
  });

  const handleDownloadExcel = () => {
    downloadExcelMutation.mutate();
  };

  return (
    <>
      <Search />
      <TableOperations>
        <Filter
          filterField="status"
          options={[
            { value: "", label: "همه" },
            { value: "ثبت شده", label: "ثبت شده" },
            { value: "در حال بررسی", label: "در حال بررسی" },
            { value: "در انتظار پاسخ", label: "در انتظار پاسخ" },
            { value: "حل شده", label: "حل شده" },
            { value: "در انتظار وب انگیج", label: "در انتظار وب انگیج" },
          ]}
        />
        <SortBy
          paramName="problemType"
          options={[
            { value: "", label: "نوع تیکت" },
            { value: "فنی", label: "فنی" },
            { value: "استفاده از داشبورد", label: "استفاده از داشبورد" },
            { value: "طراحی جرنی", label: "طراحی جرنی" },
            { value: "آنالیز و گزارش", label: "آنالیز و گزارش" },
            { value: "مالی", label: "مالی" },
          ]}
        />
        <ShamsiDatePicker paramName="date" />
        {showExcelButton && (
          <Button
            onClick={handleDownloadExcel}
            disabled={downloadExcelMutation.isLoading}
            className={styles.exel} // Using custom style from module.css
          >
            {downloadExcelMutation.isLoading ? "در حال دانلود..." : "اکسل"}
          </Button>
        )}
      </TableOperations>
    </>
  );
}

TicketTableOperations.propTypes = {
  showExcelButton: PropTypes.bool,
};

export default TicketTableOperations;
