import React from 'react';
import PropTypes from 'prop-types';

const nav = (props) => {
    return (
        <ul className={props.menuClasses}>
            {props.children}
        </ul>
    )
};

nav.propTypes = {
    menuClasses: PropTypes.string.isRequired
};

export default nav;
