import React from 'react';
import PropTypes from 'prop-types';

const CartTotals = (props) => {

    let currencyKeys = Object.keys(props.currency);
    let currencyName = props.currency[currencyKeys[1]];

    return (
        <React.Fragment>
            <li className="list-group-item ">
                <div className={'d-flex justify-content-between shop-checkout-prices'}>
                    Sub Total
                    <span> <span style={{textTransform:'lowercase'}}>{currencyName}</span>{props.productTotals.toString()}</span>
                </div>
                <div className={'d-flex justify-content-between py-1 shop-checkout-prices'}>
                    GST
                    <span><span style={{textTransform:'lowercase'}}>{currencyName}</span>{props.gst.toString()}</span>
                </div>
                <div className={'d-flex justify-content-between shop-checkout-prices'}>
                    Shipping amount
                    <span><span style={{textTransform:'lowercase'}}>{currencyName}</span>{props.shippingPrice.toString()}</span>
                </div>
            </li>

            <li className="list-group-item d-flex justify-content-between shop-checkout-total">
                <span>Total</span>
                <span className={'shop-total'}><span style={{textTransform:'capitalize'}}>{currencyName}</span>{props.shoppingTotal.toString()}</span>
            </li>
        </React.Fragment>
    )
};

CartTotals.propTypes = {
    productTotals: PropTypes.string.isRequired,
    gst: PropTypes.string.isRequired,
    shippingPrice: PropTypes.string.isRequired,
    shoppingTotal: PropTypes.string.isRequired,
    currency: PropTypes.object.isRequired
};

export default CartTotals;
