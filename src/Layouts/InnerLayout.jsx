import React, { Component } from "react";
import ContactBar from "../components/contactBar";

class SecondaryLayout extends Component {
  render() {
    return (
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 col-lg-3 shop-hide">
            <ContactBar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="row">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryLayout;
