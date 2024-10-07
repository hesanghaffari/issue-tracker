import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Search from "../../ui/Search";
import ShamsiDatePicker from "../../ui/ShamsiDatePicker";

function TicketTableOperations() {
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
      </TableOperations>
    </>
  );
}

export default TicketTableOperations;
