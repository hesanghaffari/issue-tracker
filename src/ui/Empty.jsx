import PropTypes from "prop-types";

function Empty({ resourceName }) {
  return <p>شما در این بخش {resourceName} ندارید</p>;
}
Empty.propTypes = {
  resourceName: PropTypes.string.isRequired,
};
export default Empty;
