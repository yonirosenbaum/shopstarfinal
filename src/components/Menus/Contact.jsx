import React from "react";
import Nav from "../Nav/Nav";
import NavList from "./NavList";
import PropTypes from "prop-types";
import mainMenu from "./MainMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const contact = (props) => {
  return (
    <React.Fragment>
      <Nav menuClasses="nav flex-column">
        <NavList cartCount={props.cartItemNumber} />
      </Nav>
      {/*<Backdrop showBackDrop={props.showBackDrop}/>*/}
    </React.Fragment>
  );
};

mainMenu.propTypes = {
  cartItemNumber: PropTypes.number.isRequired,
};

export default contact;
