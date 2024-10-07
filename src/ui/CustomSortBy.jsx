import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select"; // Assuming you have a Select component
import { useUsersList } from "../feature/adminPanel/MOM/useUsersList"; // Your custom hook

function CustomSortBy({ onCompanySelect }) {
  const { usersData, isLoading } = useUsersList();
  const [companies, setCompanies] = useState([]);

  // Extract company names from users with the role of 'user'
  useEffect(() => {
    if (usersData && usersData.users) {
      const companyOptions = usersData.users
        .filter((user) => user.role === "user")
        .map((user) => ({ value: user._id, label: user.company }));

      // Add the default "انتخاب کنید" option at the beginning
      setCompanies([{ value: "", label: "انتخاب کنید" }, ...companyOptions]);
    }
  }, [usersData]);

  function handleChange(e) {
    const selectedUserId = e.target.value;
    onCompanySelect(selectedUserId); // Pass the selected user _id back to the form
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
