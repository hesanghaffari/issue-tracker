import { useSearchParams } from "react-router-dom";
import { useAdminList } from "./useAdminList";

import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import AdminRow from "./AdminRow";
import Empty from "../../../ui/Empty";
import Pagination from "../../../ui/Pagination";

function ListAdminTable() {
  const { admins, isLoading } = useAdminList();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (isLoading) return <Spinner />;
  if (!admins?.admins.length) return <Empty resourceName="ادمینی" />;

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>نام</div>
          <div>ایمیل</div>
          <div>نقش</div>
        </Table.Header>

        <Table.Body
          data={admins}
          render={(admin, index) => (
            <AdminRow
              admins={admin}
              key={admin._id}
              index={index}
              currentPage={currentPage}
            />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={admins.totaladmins || admins.totalAdmins} />
      </Table.Footer>
    </>
  );
}

export default ListAdminTable;
