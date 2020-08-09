import React from 'react';

const contentWrapper = (props) => {
    return (
        <div className={"page-wrapper"}>
            {props.children}
        </div>
    )
}

export default contentWrapper;
