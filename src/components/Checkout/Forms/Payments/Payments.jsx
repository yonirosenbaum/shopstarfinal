import React from 'react';
import PropTypes from 'prop-types';

const payments = props => {

    return (
        <ul className={'shop-payment-methods'}>
            <li>
                <label>
                    <input
                        type="radio"
                        value="creditCard"
                        checked={props.paymentMethod === "creditCard"}
                        onChange={props.paymentOptionChanged}
                    />
                    Credit Card
                </label>
            </li>

            <li>
                <label>
                    <input
                        type="radio"
                        value="onDelivery"
                        checked={props.paymentMethod === "onDelivery"}
                        onChange={props.paymentOptionChanged}
                    />
                    Pay on Delivery
                </label>
            </li>
        </ul>
    )
};

payments.propTypes = {
    paymentOptionChanged: PropTypes.func.isRequired,
    paymentMethod: PropTypes.string.isRequired
};

export default payments;