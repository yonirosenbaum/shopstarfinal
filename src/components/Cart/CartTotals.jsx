import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const cartTotals = (props) => {

    let currencyKeys = Object.keys(props.currency);
    let currencyName = props.currency[currencyKeys[1]];
    let subtotal = props.subtotal;
    let gstPercentage = props.gst > 0 ? props.gst/100 : 0;
    let gst = subtotal > 0 ? (subtotal * gstPercentage) : 0;
    let totalCost = subtotal > 0 ? (subtotal + gst) : 0;
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6 col-sm-4  offset-sm-5 text-left shop-cart-amounts">
                    Subtotal
                </div>
                <div className="col-6 col-sm-3 text-right shop-cart-amounts">
                    <span style={{textTransform:'lowercase'}}>{currencyName}</span>{subtotal.toFixed(2).toString()}
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-6 col-sm-4 offset-sm-5 text-left shop-cart-amounts">
                    GST
                </div>
                <div className="col-6 col-sm-3 text-right shop-cart-amounts">
                    <span style={{textTransform:'lowercase'}}>{currencyName}</span>{gst.toFixed(2).toString()}
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-6 col-sm-4 offset-sm-5 text-left">
                    <h4 className={'shop-cart-total'}>Total</h4>
                </div>
                <div className="col-6 col-sm-3 text-right">
                    <h4 className={'shop-cart-total'}>
                       <span style={{textTransform:'capitalize'}}>{currencyName}</span>{totalCost.toFixed(2).toString()}
                    </h4>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-12 col-lg-8 offset-lg-4 text-right">
                    <button onClick={props.clearCart} className="btn shop-btn-outline">Clear cart</button>
                    <Link to={'/'} className="btn shop-btn-outline">Continue
                        shopping</Link>
                    <Link className="btn btn-lg shop-btn-secondary checkout" to={'/checkout'}>
                        Checkout
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
};

cartTotals.propTypes = {
    subtotal: PropTypes.number.isRequired,
    clearCart: PropTypes.func.isRequired,
    gst: PropTypes.number,
    currency: PropTypes.object.isRequired
};

cartTotals.defaultProps = {
    shippingPrice: 0,
};

export default cartTotals;