import { useSearchParams } from "react-router-dom";
import { useChildList } from "./useChildList";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ChildRow from "./ChildRow";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function ListChildTable() {
  const { childs, isLoading } = useChildList();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (isLoading) return <Spinner />;
  if (!childs?.children.length) return <Empty resourceName="یوزری" />;

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
          data={childs}
          render={(child, index) => (
            <ChildRow
              admins={child}
              key={child._id}
              index={index}
              currentPage={currentPage}
            />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={childs.totalChildren || childs.totalChildren} />
      </Table.Footer>
    </>
  );
}

export default ListChildTable;
