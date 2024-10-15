import { useSearchParams } from "react-router-dom";
import { useUsersList } from "./useUsersList";

import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import UsersRow from "./UsersRowList";
import Empty from "../../../ui/Empty";
import Pagination from "../../../ui/Pagination";

function ListUsersTable() {
  const { users, isLoading } = useUsersList();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (isLoading) return <Spinner />;
  if (!users?.users.length) return <Empty resourceName="یوزری" />;

  return (
    <>
      <Table columns="0.1fr 0.7fr 2.2fr 1fr 0.4fr 1fr 0.8fr 1fr 0.5fr">
        <Table.Header>
          <div>#</div>
          <div>تاریخ ایجاد</div>
          <div>ایمیل</div>
          <div>نام</div>
          <div>نقش</div>
          <div>شرکت</div>
          <div>وضعیت حساب</div>
          <div>وضعیت تایید</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user, index) => (
            <UsersRow
              users={user}
              key={user._id}
              index={index}
              currentPage={currentPage}
            />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={users.totalTickets || users.totalUsers} />
      </Table.Footer>
    </>
  );
}

export default ListUsersTable;
