import React from "react";
import PropTypes from "prop-types";

const warning = (props) => {
  return (
    <div
      className={`alert ${props.alertType} alert-dismissible fade show`}
      role="alert"
    >
      {props.children}
      <button className="close" onClick={props.closeAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

warning.propTypes = {
  closeAlert: PropTypes.func.isRequired,
  alertType: PropTypes.string.isRequired,
};

export default warning;
