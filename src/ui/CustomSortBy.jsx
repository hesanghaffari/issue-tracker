import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import { useUsersList } from "../feature/adminPanel/MOM/useUsersList";

function CustomSortBy({ onCompanySelect }) {
  const { usersData, isLoading } = useUsersList();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (usersData && usersData.users) {
      const companyOptions = usersData.users
        .filter((user) => user.role === "user")
        .map((user) => ({ value: user._id, label: user.company }));

      setCompanies([{ value: "", label: "انتخاب کنید" }, ...companyOptions]);
    }
  }, [usersData]);

  function handleChange(e) {
    const selectedUserId = e.target.value;
    const selectedCompany =
      companies.find((company) => company.value === selectedUserId)?.label ||
      "";
    onCompanySelect(selectedUserId, selectedCompany);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Select options={companies} type="white" onChange={handleChange} />;
}

CustomSortBy.propTypes = {
  onCompanySelect: PropTypes.func.isRequired,
};

export default CustomSortBy;
