import React from "react";
import PropTypes from "prop-types";
import FormInputs from "../../Input/formInputs";

const customerForm = (props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 mb-3">
          <FormInputs
            label={"First Name"}
            type={"text"}
            placeholder={"First Name"}
            identifier={props.customerInfo.firstName}
            changed={(event) => props.inputChanged(event, "firstName")}
          />
        </div>

        <div className="col-md-6 mb-3">
          <FormInputs
            label={"Second Name"}
            type={"text"}
            placeholder={"Second Name"}
            identifier={props.customerInfo.secondName}
            changed={(event) => props.inputChanged(event, "secondName")}
          />
        </div>
      </div>

      <div className="mb-3">
        <FormInputs
          label={"Email"}
          type={"email"}
          placeholder={"you@example.com"}
          identifier={props.customerInfo.email}
          changed={(event) => props.inputChanged(event, "email")}
        />
      </div>
    </React.Fragment>
  );
};

customerForm.propTypes = {
  inputChanged: PropTypes.func.isRequired,
  customerInfo: PropTypes.object.isRequired,
};

export default customerForm;
