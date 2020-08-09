import React from 'react';
import PropTypes from 'prop-types';

const contactWrapper = (props) => {
    return (
        <div
            className={`side-menu-wrapper ${props.showSideBar ? 'show' : 'hide'}`}
            onClick={props.toggleSideMenu}>
            {props.children}
        </div>
    )
};

contactWrapper.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
};

export default contactWrapper;
