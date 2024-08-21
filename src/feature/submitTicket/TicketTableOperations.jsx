import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function TicketTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "", label: "همه" },
          { value: "ثبت شده", label: "ثبت شده" },
          { value: "در حال بررسی", label: "در حال بررسی" },
          { value: "حل شده", label: "حل شده" },
        ]}
      />

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
      <SortBy
        paramName="company"
        options={[
          { value: "", label: "انتخاب کنید" },
          { value: "فنی", label: "فنی" },
          { value: "استفاده از داشبورد", label: "استفاده از داشبورد" },
          { value: "طراحی جرنی", label: "طراحی جرنی" },
          { value: "آنالیز و گزارش", label: "آنالیز و گزارش" },
          { value: "مالی", label: "مالی" },
        ]}
      />
    </TableOperations>
  );
}

export default TicketTableOperations;
