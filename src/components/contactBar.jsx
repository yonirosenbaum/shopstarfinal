import React from "react";
import Currency from "./Currency";

const contactBar = () => {
  return (
    <div className="container shop-left-column py-2">
      <div>
        <h5 style={{ color: "#93b6ee" }}>Contact Us</h5>
        <p>
          If you have any questions contact us at:
          <br />
          <br /> +(61) 9999 9999
          <br /> or
          <br /> shoppingassist@shopst.co
        </p>
      </div>
      <hr />
      <div>
        <Currency showLabel />
      </div>
    </div>
  );
};

export default contactBar;
