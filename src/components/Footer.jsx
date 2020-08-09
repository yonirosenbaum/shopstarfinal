import React from "react";

const dt = new Date();

const footer = () => {
  return (
    <React.Fragment>
      <div
        className=" shop-footer text-center py-3"
        style={{ backgroundColor: "#6f0000", fontWeight: 200 }}
      >
        Shopstar Inc &copy; <span> {dt.getFullYear()} </span>
      </div>
    </React.Fragment>
  );
};

export default footer;
