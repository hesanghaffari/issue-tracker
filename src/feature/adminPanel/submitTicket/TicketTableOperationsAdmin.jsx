import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import Search from "../../../ui/Search";
import ShamsiDatePicker from "../../../ui/ShamsiDatePicker";
import styles from "./TicketTableOperations.module.css";

function TicketTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "", label: "همه" },
          { value: "ثبت شده", label: "ثبت شده" },
          { value: "در حال بررسی", label: "در حال بررسی" },
          { value: "در انتظار پاسخ", label: "در انتظار پاسخ" },

          { value: "حل شده", label: "حل شده" },
        ]}
      />
      <div className={styles.other}>
        <SortBy
          paramName="problemType"
          options={[
            { value: "", label: "انتخاب کنید" },
            { value: "فنی", label: "فنی" },
            { value: "استفاده از داشبورد", label: "استفاده از داشبورد" },
            { value: "طراحی جرنی", label: "طراحی جرنی" },
            { value: "آنالیز و گزارش", label: "آنالیز و گزارش" },
            { value: "مالی", label: "مالی" },
          ]}
        />
        <div>
          <label>تاریخ شروع:</label>
          <ShamsiDatePicker paramName="startDate" />
        </div>
        <div>
          <label>تاریخ پایان:</label>
          <ShamsiDatePicker paramName="endDate" />
        </div>
        <Search />
      </div>
    </TableOperations>
  );
}

export default TicketTableOperations;
