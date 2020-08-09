import React from "react";
import Nav from "../Nav/Nav";
import NavList from "./NavList";
import PropTypes from "prop-types";

const mainMenu = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <span className="navbar-brand">
        <a
          className="text-white bg-danger font-italic rounded p-2"
          style={{ textDecoration: "none" }}
          href="/"
        >
          ShopStar
        </a>
      </span>
      <button className="navbar-toggler" onClick={props.toggleSideBar}>
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse">
        <Nav menuClasses="navbar-nav ml-auto mt-2 mt-lg-0">
          <NavList cartCount={props.cartItemNumber} />
        </Nav>
      </div>
    </nav>
  );
};

mainMenu.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
  cartItemNumber: PropTypes.number.isRequired,
};

export default mainMenu;
