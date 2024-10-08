import PropTypes from "prop-types";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function ChildRow({ admins, index, currentPage }) {
  const { company, title, _id, date } = admins;
  const navigate = useNavigate();

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  const handleDetailClick = () => {
    navigate(`/momuser/${_id}`);
  };
  // Handle delete button click

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{date}</div>
      <div>{title}</div>
      <div>{company}</div>

      <div>
        <Button size="small" variation="secondary" onClick={handleDetailClick}>
          مشاهده
        </Button>
      </div>
    </Table.Row>
  );
}

ChildRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  admins: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChildRow;
