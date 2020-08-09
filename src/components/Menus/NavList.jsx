import React from "react";
import NavItem from "../NavItem/NavItem";
import PropTypes from "prop-types";

const navList = (props) => {
  return (
    <React.Fragment>
      <NavItem linkTo={"/"}>Home</NavItem>
      <NavItem linkTo={"/mens"}>Men</NavItem>
      <NavItem linkTo={"/womens"}>Women</NavItem>
      <NavItem linkTo={"/kids"}>Kids</NavItem>
      <NavItem linkTo={"/sale"}>Sale</NavItem>
      <NavItem linkTo={"/cart"}>
        Cart <span className="badge badge-light">{props.cartCount}</span>
      </NavItem>
    </React.Fragment>
  );
};

navList.propTypes = {
  cartCount: PropTypes.number,
};

export default navList;
