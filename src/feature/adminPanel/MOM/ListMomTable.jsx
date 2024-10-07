import { useSearchParams } from "react-router-dom";
import { useMomList } from "./useMomList";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import ChildRow from "./MomRow";
import Empty from "../../../ui/Empty";
import Pagination from "../../../ui/Pagination";

function ListChildTable() {
  const { moms, isLoading } = useMomList();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (isLoading) return <Spinner />;
  if (!moms?.moms.length) return <Empty resourceName="صورت جلسه" />;

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>تاریخ</div>
          <div>موضوع</div>
          <div>شرکت</div>
        </Table.Header>

        <Table.Body
          data={moms}
          render={(mom, index) => (
            <ChildRow
              admins={mom}
              key={mom._id}
              index={index}
              currentPage={currentPage}
            />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={moms.totalMoms || moms.totalMoms} />
      </Table.Footer>
    </>
  );
}

export default ListChildTable;
